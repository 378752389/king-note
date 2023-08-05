---
title: NIO
date: 2023-07-31
categories:
  - JavaSE
tags:
  - 网络编程
---

## NIO编写注意细节

1. 每次处理完事件(key)，都需要手动将其移除，不然下一次 selector 的事件集合中任然包含该事件，而事件源可能们有再次出发，将报错。
2. 对于所有注册的事件(key)，如果不需要在使用，需要进行手动 cancel， 将 channel 和 selector 进行解绑。
3. `read`在NIO模式下，设置为非阻塞读，如果没有数据，返回0，如果连接正常关闭，会返回-1，如果连接异常关闭，会抛出异常，需要对异常进行处理。
4. `write`在NIO模式下，如果写入的数据量比较大，不一定会一次将数据全部写入，此时我们需要获取数据写入量，进行下一次写入。
5. `write`在数据字节长度为0，不会写入数据



## 处理写(write)事件

1. 写事件需要注册才能被出发，通常通过接收(accept)事件或读(read)事件进行注册。
2. **非阻塞模式下，无法保证把 buffer 中所有数据都写入 channel**，因此需要追踪 write 方法的返回值（代表实际写入字节数）
3. 用 selector 监听所有 channel 的可写事件，每个 channel 都需要一个 key 来跟踪 buffer，但这样又会导致占用内存过多，就有两阶段策略
    * 当消息处理器第一次写入消息时，才将 channel 注册到 selector 上
    * selector 检查 channel 上的可写事件，如果所有的数据写完了，就取消 channel 的注册
    * 如果不取消，会每次可写均会触发 write 事件

:::details 服务端代码片段

```java
public class WriteServer {

    public static void main(String[] args) throws IOException {
        ServerSocketChannel ssc = ServerSocketChannel.open();
        ssc.configureBlocking(false);
        ssc.bind(new InetSocketAddress(8080));

        Selector selector = Selector.open();
        ssc.register(selector, SelectionKey.OP_ACCEPT);

        while(true) {
            selector.select();

            Iterator<SelectionKey> iter = selector.selectedKeys().iterator();
            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();
                if (key.isAcceptable()) {
                    SocketChannel sc = ssc.accept();
                    sc.configureBlocking(false);
                    SelectionKey sckey = sc.register(selector, SelectionKey.OP_READ);
                    // 1. 向客户端发送内容
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < 3000000; i++) {
                        sb.append("a");
                    }
                    ByteBuffer buffer = Charset.defaultCharset().encode(sb.toString());
                    int write = sc.write(buffer);
                    // 3. write 表示实际写了多少字节
                    System.out.println("实际写入字节:" + write);
                    // 4. 如果有剩余未读字节，才需要关注写事件
                    if (buffer.hasRemaining()) {
                        // read 1  write 4
                        // 在原有关注事件的基础上，多关注 写事件
                        sckey.interestOps(sckey.interestOps() + SelectionKey.OP_WRITE);
                        // 把 buffer 作为附件加入 sckey
                        sckey.attach(buffer);
                    }
                } else if (key.isWritable()) {
                    ByteBuffer buffer = (ByteBuffer) key.attachment();
                    SocketChannel sc = (SocketChannel) key.channel();
                    int write = sc.write(buffer);
                    System.out.println("实际写入字节:" + write);
                    if (!buffer.hasRemaining()) { // 写完了
                        key.interestOps(key.interestOps() - SelectionKey.OP_WRITE);
                        key.attach(null);
                    }
                }
            }
        }
    }
}
```

:::


:::tip

需要注意的细节点：
1. 注册写事件时，注意是在SocketChannel上，而不是在ServerSocketChannel上
2. 注意写数据时客户端的接收缓存，如果客户端代码只有连接没有消费，那么可能后续的读事件监听不到，应为客户端接收缓存已经满了
3. 缓存数据存放在内存中，注意通过附件保存在绑定事件中，方便下次继续从上次读取的基础上进行。

:::



:::details 客户端代码片段

```java
public class WriteClient {
    public static void main(String[] args) throws IOException {
        Selector selector = Selector.open();
        SocketChannel sc = SocketChannel.open();
        sc.configureBlocking(false);
        sc.register(selector, SelectionKey.OP_CONNECT | SelectionKey.OP_READ);
        sc.connect(new InetSocketAddress("localhost", 8080));
        int count = 0;
        while (true) {
            selector.select();
            Iterator<SelectionKey> iter = selector.selectedKeys().iterator();
            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();
                if (key.isConnectable()) {
                    System.out.println(sc.finishConnect());
                } else if (key.isReadable()) {
                    ByteBuffer buffer = ByteBuffer.allocate(1024 * 1024);
                    count += sc.read(buffer);
                    buffer.clear();
                    System.out.println(count);
                }
            }
        }
    }
}
```

:::


