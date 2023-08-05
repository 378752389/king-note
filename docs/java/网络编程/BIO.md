---
title: BIO
date: 2023-07-28
categories:
  - JavaSE
tags:
  - 网络编程
---


## socket阻塞模型

:::details 服务端代码
```java
@Slf4j
public class BlockServer {

    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket();
        serverSocket.bind(new InetSocketAddress(8087));

        while (true) {
            Socket socket = serverSocket.accept();

            new Thread(() -> {
                try (InputStream is = socket.getInputStream();
                     OutputStream os = socket.getOutputStream();) {
                    os.write("connect success...".getBytes(StandardCharsets.UTF_8));

                    while (true) {
                        // 接收缓存大小， 存在问题: 如果接收的数据量超过32字节，后面的字节将在下次进行读取，而此时由于客户端阻塞，
                        // 导致需要客户端发送下一次数据，客户端才会进行读取socket，导致效果是数据需要下次才能获取到
                        byte[] buf = new byte[32];
                        int n = 0;
                        try {
                            n = is.read(buf);
                            if (n > 0) {
                                String s = new String(buf);
                                System.out.println(s);
                                os.write(s.getBytes(StandardCharsets.UTF_8));
                            } else if (n == -1) {
                                socket.close();
                                break;
                            }
                        } catch (IOException ie) {
                            // 连接异常关闭处理
                            String message = ie.getMessage();
                            System.out.println(message);
                            break;
                        }


                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }).start();

        }
    }
}
```
:::


:::details 客户端代码

```java
@Slf4j
public class BlockClient {

    public static void main(String[] args) throws IOException {
        Socket socket = new Socket();
        socket.connect(new InetSocketAddress(8087));
        InputStream is = socket.getInputStream();
        OutputStream os = socket.getOutputStream();
        byte[] buf = new byte[32];
        int read = is.read(buf);
        System.out.println(new String(buf));

        while (true) {
            buf = new byte[32];
            Scanner scanner = new Scanner(System.in);
            String s = scanner.nextLine();
            //  如果读取的数据为0， 是不会发送数据的
            if (s.equals("")) {
                continue;
            }
            os.write(s.getBytes(StandardCharsets.UTF_8));
            int num = is.read(buf);
            System.out.println(new String(buf));
        }
    }
}
```

:::


:::tip

上述面程序是一个最基本的用BIO实现ECHO功能的例子，但该例子存在如下几个问题：
1. 接收缓冲大小的问题: 正常情况如果客户端发送的字节不超过32个字节没有问题，但当字节超过32个，服务器缓冲一次最多只能处理32字节，因此服务端ECHO只包括最前面的32个字节，
后面返回字节需要服务端读取下次客户端输入后才会返回，每次返回也是32个字节，因此客户端数据返回进行了脱节，每次收到的数据是之前ECHO返回的数据，这些 数据其实是缓冲在接收缓冲区的。

![BIO的ECHO程序客户端发送超缓冲字节](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/BIO%E7%9A%84ECHO%E7%A8%8B%E5%BA%8F%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E8%B6%85%E7%BC%93%E5%86%B2%E5%AD%97%E8%8A%82.png)

![BIO的ECHO程序服务端接收超缓冲字节](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/BIO%E7%9A%84ECHO%E7%A8%8B%E5%BA%8F%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%8E%A5%E6%94%B6%E8%B6%85%E7%BC%93%E5%86%B2%E5%AD%97%E8%8A%82.png)

服务端正常收数据没有问题，但客户端发送 second，收到的数据却是 first

2. 该程序存在非常多的限制，读的时候阻塞，不能写，写的时候阻塞，不能读；客户端和服务端程序交互性比较差，除非改为读写分2个线程进行。
3. Server数据不能一次全部读取，然后ECHO返回，当最后一次读取ECHO然后组装为String，如果长度刚好的数组长度，则需要进行下一次读，此时会阻塞线程，倒是ECHO数据返回不了，
同时客户端阻塞等待Server返回数据，导致出现活锁（读写阻塞的线程在Java中表现为RUNNABLE状态）

:::


## channel阻塞模型

:::details 服务端代码

```java
@Slf4j
public class BlockServer {

    public static void main(String[] args) throws IOException {
        ServerSocketChannel ssc = ServerSocketChannel.open();
        ssc.bind(new InetSocketAddress(8087));
        while (true) {
            SocketChannel sc = ssc.accept();
            new Thread(() -> {
                ByteBuffer bf = ByteBuffer.allocate(1024);
                while (true) {
                    try {
                        int count = sc.read(bf);
                        if (count == -1) {
                            //正常连接关闭处理
                            sc.close();
                            break;
                        } else if (count > 0) {
                            // 读处理
                            bf.flip();
                            log.info(StandardCharsets.UTF_8.decode(bf).toString());
                            bf.clear();
                        }
                    }  catch (IOException e) {
                        // 异常关闭处理
                        String message = e.getMessage();
                        log.info(message);
                        try {
                            sc.close();
                        } catch (IOException ie) {
                            ie.printStackTrace();
                        }
                        break;
                    }
                }
            }).start();
        }
    }
}
```

:::


:::details 客户端代码

```java
@Slf4j
public class BlockClient {

    public static void main(String[] args) throws IOException {
        SocketChannel sc = SocketChannel.open();
        sc.connect(new InetSocketAddress(8087));
        sc.write(StandardCharsets.UTF_8.encode("hello, world!"));
        sc.close();
    }
}
```

:::


:::tip

channelBIO模型不是重点，但是也是一种新思路，供参考，其同样具有socketBIO模型的问题。

:::