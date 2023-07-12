---
title: Netty
date: 2023-07-11
categories:
  - 网络
tags:
  - netty
---
## channel生命周期

* registered： channel 和 eventloop 已经绑定完成
* actived： channel 连接建立成功
* inactived ： channel 连接断开
* unregisted： channel 和 eventloop 已经断开





## 连接假死

原因

* 网络设备故障（网卡、机房等）但应用程序没有感知到
* 公网网络不稳定，客户端一直丢包，服务端收不到消息，就这么耗着
* 应用程序线程阻塞，无法进行读写

问题

* 假死连接占用的资源不能释放
* 向假死的连接发送数据，得到的反馈是发送超时

解决方案

* 服务端进行读idle监控，超过一定时间（5s）没有收到消息就进行连接断开
* 客户端进行定时心跳发送，如果有有一定时间没有发送数据（3s)，客户端就自动发送一个心跳包

> 服务端的读空间时间要大于客户端的写空闲时间





## 参数调优

`CONNECT_TIMEOUT_MILLIS`

* 属于SocketChannel参数
* 客户端建立连接时，如果在指定毫秒内无法连接，抛出异常  `ConnectTimeoutException`
* SO_TIMEOUT 主要用于阻塞IO中，阻塞IO中 accept、read都是无限等待的， 可以通过它修改超时时间



`SO_BACKLOG`

ServerSocketChannel 参数

* 在linux2.2之前， backlog包括了半连接队列和全连接队列的大小， 在2.2之后， 通过下面2个参数控制
  * sync queue：半连接队列， 大小通过 /proc/sys/net/ipv4/tcp_max_syn_backlog指定， 逻辑上没有最大限制
  * accept queue： 全连接队列， 大小通过 /proc/sys/net/core/somaxconn指定，使用listen函数， 内核会根据传入的backlog参数与系统参数，取二者最小值，队列值满将发送一个 拒绝连接的错误信息到 client



tcp连接建立流程

1. 首先服务端调用 bind 绑定本地端口号， 然后开始监听 listen 客户端的连接
2. client发送 调用 connect 时间 发送连接请求， 请求中将TCP包的 SYN=1 ， client 状态为 SYN_SEND
3. 服务端收到连接请求后， 将发送 应答包， 将应答包的 SYN=1， ACK=1， server 状态为 SYN_RECV， 并将连接请求放入半连接队列中
4. client 收到服务端应答包后， 将发送数据和 ACK=1， client 状态为 ESTABLISHED
5. server 收到客户端的确认包后， server状态为ESTABLISHED， 并将半连接队列请求 转移到 全连接队列中
6. 服务端调用 accept 接收请求





`ulimit -n`   

操作系统参数， 操作系统可以允许一个进程打开的最大 fp(文件描述符) 数量



`TCP_NODELAY`

SocketChannel 参数

默认开启了nagle算法， 数据量达到一定数量在发送



`SO_SNDBUF && SO_RECVBUF`

调整滑动窗口的大小，现在操作系统可以自动调整， 不需要手动调整；





`ALLOCATOR`

* 用来分配ByteBuf,  ctx.alloc()



`RECVBUF_ALLOCATOR`

* 用来控制 netty 接收缓冲区 大小

