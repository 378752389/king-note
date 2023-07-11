---
title: IO流
date: '2023-07-11 08:00:00'
categories:
  - JavaSE
tags:
  - IO流
---

## 1、 Java IO流 体系

![IOStream](/king-note/assets/img/java/IOStream.jpeg)

## 2、 数据源

数据源DataSource，提供数据的原始媒介。常见的数据源有：数据库、文件、其他程序、内存、网络连接、IO设备。

数据源分为：源设备、目标设备。

* 源设备：为程序提供数据，一般对应输入流。

* 目标设备：程序数据的目的地，一般对应输出流。

## 3、 流的概念和分类

### 按流的方向分类：

* 输入流：数据流从数据源到程序（以InputStream、Reader结尾的流）。

* 输出流：数据流从程序到目的地（以OutPutStream、Writer结尾的流）。

### 按处理的数据单元分类：

* 字节流：以字节为单位获取数据，命名上以Stream结尾的流一般是字节流，如FileInputStream、FileOutputStream。
* 字符流：以字符为单位获取数据，命名上以Reader/Writer结尾的流一般是字符流，如FileReader、FileWriter。

### 按处理对象不同分类：

* 节点流：可以直接从数据源或目的地读写数据，如FileInputStream、FileReader、DataInputStream等。
* 处理流：不直接连接到数据源或目的地，是”处理流的流”。通过对其他流的处理提高程序的性能，如BufferedInputStream、BufferedReader等。处理流也叫包装流。


## 4、 Java中IO流类的体系

* InputStream/OutputStream 字节流的抽象类。
* Reader/Writer 字符流的抽象类。
* FileInputStream/FileOutputStream 节点流：以字节为单位直接操作“文件”。
* ByteArrayInputStream/ByteArrayOutputStream 节点流：以字节为单位直接操作“字节数组对象”。
* ObjectInputStream/ObjectOutputStream 处理流：以字节为单位直接操作“对象”。
* DataInputStream/DataOutputStream 处理流：以字节为单位直接操作“基本数据类型与字符串类型”。
* FileReader/FileWriter 节点流：以字符为单位直接操作“文本文件”（注意：只能读写文本文件）。
* BufferedReader/BufferedWriter 处理流：将Reader/Writer对象进行包装，增加缓存功能，提高读写效率。
* BufferedInputStream/BufferedOutputStream 处理流：将InputStream/OutputStream对象进行包装，增加缓存功能，提高读写效率。
* InputStreamReader/OutputStreamWriter 处理流：将字节流对象转化成字符流对象。
* PrintStream 处理流：将OutputStream进行包装，可以方便地输出字符，更加灵活。

## 5、 File类

File类是Java提供的针对磁盘中的文件或目录转换对象的包装类。一个File对象而可以代表一个文件或目录，File对象可以实现获取文件和目录属性等功能，可以实现对文件和目录的创建，删除等功能。

### 针对文件操作的方法

```java
createNewFile()//创建新文件。

delete()//直接从磁盘上删除

exists()//查询磁盘中的文件是否存在

getAbsolutePath()//获取绝对路径

getPath()//获取相对路径

getName()//获取文件名 相当于调用了一个toString方法。

isFile()//判断是否是文件

length()//查看文件中的字节数

isHidden()//测试文件是否被这个抽象路径名是一个隐藏文件。
```

### 针对目录操作的方法

```java
exists()//查询目录是否存在

isDirectory()//判断当前路径是否为目录

mkdir()//创建目录

mkdirs()//递归创建目录

getParentFile()//获取当前目录的父级目录。

list()//返回一个字符串数组，包含目录中的文件和目录的路径名。

listFiles()//返回一个File数组，表示用此抽象路径名表示的目录中的文件。
```

### File类的基本使用

```java
package com.king.io;

import java.io.File;

public class FileDemo {
    public static void main(String[] args) throws Exception {
        //创建 File 对象
        File file = new File("d:/aa.txt");
        System.out.println(file.createNewFile());
        // System.out.println(file.delete());
        // System.out.println(file.exists());
        // System.out.println(file.getName());
        // System.out.println(file.isFile());
        // System.out.println(file.isHidden());

        File file2 = new File("d:/");
        String[] arr = file2.list();
        for (String temp : arr) {
            System.out.println(temp);
        }
        System.out.println("-----------------------");
        File[] arr2 = file2.listFiles();
        for (File temp : arr2) {
            System.out.println(temp);
        }
    }
}
```

## 6、 文件字节流/字节缓冲流

### 字节缓存流实现方式：

* 方式一：通过创建一个指定长度的字节数组作为缓冲区，以此来提高IO流的读写效率。该方式适用于读取较大图片时的缓冲区定义。注意：缓冲区的长度一定是 2 的整数幂。一般情况下1024 长度较为合适。
* 方式二：通过创建一个字节数组作为缓冲区，数组长度是通过输入流对象的available()
  返回当前文件的预估长度来定义的。在读写文件时，是在一次读写操作中完成文件读写操作的。注意：如果文件过大，那么对内存的占用也是比较大的。所以大文件不建议使用该方法。
* 方式三：Java缓冲流本身并不具有IO流的读取与写入功能，只是在别的流（节点流或其他处理流）上加上缓冲功能提高效率，就像是把别的流包装起来一样，因此缓冲流是一种处理流（包装流）。
  当对文件或者其他数据源进行频繁的读写操作时，效率比较低，这时如果使用缓冲流就能够更高效的读写信息。因为缓冲流是先将数据缓存起来，然后当缓存区存满后或者手动刷新时再一次性的读取到程序或写入目的地。
  因此，缓冲流还是很重要的，我们在IO操作时记得加上缓冲流来提升性能。`BufferedInputStream`和`BufferedOutputStream`这两个流是缓冲字节流，通过内部缓存数组来提高操作流的效率。

### 方式三实现文件拷贝

```java
package com.king.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;

public class FileStreamBuffed3Demo {
    public static void main(String[] args) {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        try {
            fis = new FileInputStream("d:/itbz.jpg");
            bis = new BufferedInputStream(fis);
            fos = new FileOutputStream("d:/ff.jpg");
            bos = new BufferedOutputStream(fos);
            //缓冲流中的 byte 数组长度默认是 8192
            int temp = 0;
            while ((temp = bis.read()) != -1) {
                bos.write(temp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //注意：关闭流顺序："后开的先关闭"
                if (bis != null) {
                    bis.close();
                }
                if (fis != null) {
                    fis.close();
                }
                if (bos != null) {
                    bos.close();
                }
                if (fos != null) {
                    fos.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 7、 文件字符流/字符缓冲流

### 字符缓冲流操作：

前面介绍的文件字节流可以处理所有的文件，如果我们处理的是文本文件，也可以使用文件字符流，它以字符为单位进行操作。 字符流写入完成后需要进行flush操作

* BufferedReader是针对字符输入流的缓冲流对象，提供了更方便的按行读取的方法：`readLine()`;在使用字符流读取文本文件时，我们可以使用该方法以行为单位进行读取。
* BufferedWriter是针对字符输出流的缓冲流对象，在字符输出缓冲流中可以使用`newLine()`；方法实现换行处理。

### 通过字符缓冲流为文件中的内容添加行号

```java
package com.king.io;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

public class LineNumberDemo {
    public static void main(String[] args) {
        BufferedReader br = null;
        BufferedWriter bw = null;
        try {
            br = new BufferedReader(new FileReader("d:/sxt2.txt"));
            bw = new BufferedWriter(new FileWriter("d:/sxt3.txt"));
            String temp = "";
            int i = 1;
            while ((temp = br.readLine()) != null) {
                bw.write(i + "," + temp);
                bw.newLine();
                i++;
            }
            bw.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
                if (bw != null) {
                    bw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 8、 转换流

`InputStreamReader/OutputStreamWriter`用来实现将字节流转化成字符流。比如，如下场景：

> System.in是字节流对象，代表键盘的输入，如果我们想按行接收用户的输入时，就必须用到缓冲字符流BufferedReader特有的方法readLine()，但是经过观察会发现在创建BufferedReader的构造方法的参数必须是一个Reader对象，这时候我们的转换流InputStreamReader就派上用场了。而System.out也是字节流对象，代表输出到显示器，按行读取用户的输入后，并且要将读取的一行字符串直接显示到控制台，就需要用到字符流的write(Stringstr)方法，所以我们要使用OutputStreamWriter将字节流转化为字符流。(`还可以解决中文乱码的问题`)

### 通过转换流实现键盘输入屏幕输出

```java
package com.yoostar.coms;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class ConvertStream {
    public static void main(String[] args) {
        BufferedReader br = null;
        BufferedWriter bw = null;
        try {
            br = new BufferedReader(new InputStreamReader(System.in));
            bw = new BufferedWriter(new OutputStreamWriter(System.out));
            while (true) {
                bw.write("请输入：");
                bw.flush();
                String input = br.readLine();
                if ("exit".equals(input)) {
                    break;
                }
                bw.write("你输入的是：" + input);
                bw.newLine();
                bw.flush();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null) {
                    bw.close();
                }
                if (br != null) {
                    br.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 9、 字符输出流

在Java的IO流中专门提供了用于字符输出的流对象PrintWriter。该对象具有自动行刷新缓冲字符输出流，特点是可以按行写出字符串，并且可通过println();方法实现自动换行。

```java
package com.king.io;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

public class LineNumberDemo3 {
    public static void main(String[] args) {
        BufferedReader br = null;
        PrintWriter pw = null;
        try {
            br = new BufferedReader(new InputStreamReader(new FileInputStream("d:/sxt.txt")));
            pw = new PrintWriter("d:/sxt4.txt");
            String temp = "";
            int i = 1;
            while ((temp = br.readLine()) != null) {
                pw.println(i + "," + temp);
                i++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (br != null) {
                    br.close();
                }
                if (pw != null) {
                    pw.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 10、 字节数组流

`ByteArrayInputStream和ByteArrayOutputStream`经常用在需要流和数组之间转化的情况！比如需要把视频，音频写成一个字节数组在进行数据传输

说白了，FileInputStream是把文件当做数据源。ByteArrayInputStream则是把内存中的”字节数组对象”当做数据源。

### 将二进制数据转换成字节数组在写入到新的文件中

```java
package com.xiyan;

import java.io.*;

/**
 * @author: Bright
 * @date: Created in 2022/2/22 0022 14:01
 * @Description:
 */
public class Test {
    public static void main(String[] args) {
        BufferedInputStream bis = null;
        ByteArrayOutputStream bos = null;
        BufferedOutputStream bufferedOutputStream = null;
        try {
            bis = new BufferedInputStream(new FileInputStream("d:\\文档.docx"));
            bos = new ByteArrayOutputStream();
            bufferedOutputStream = new BufferedOutputStream(new FileOutputStream("d:\\ss.docx"));
            int temp;
            while ((temp = bis.read()) != -1) {
                bos.write(temp);
            }
            //写入字节数组
            byte[] bytes = bos.toByteArray();
            //输入到新文件
            bufferedOutputStream.write(bytes);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != bufferedOutputStream) {
                    bufferedOutputStream.close();
                }
                if (null != bos) {
                    bos.close();
                }
                if (null != bis) {
                    bis.close();
                }
            } catch (Exception e) {

            }
        }
    }
}
```

## 11、 数据流

数据流将“基本数据类型与字符串类型”作为数据源，从而允许程序以与机器无关的方式从底层输入输出流中操作Java基本数据类型与字符串类型。`DataInputStream和DataOutputStream`
提供了可以存取与机器无关的所有Java基础类型数据（如：int、double、String等）的方法。

### 数据输出流

```java
package com.king.io;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;

public class DataOutputDemo {
    public static void main(String[] args) {
        DataOutputStream dos = null;
        try {
            dos = new DataOutputStream(new BufferedOutputStream(new FileOutputStream("d:/data.txt")));
            dos.writeChar('a');
            dos.writeInt(10);
            dos.writeDouble(Math.random());
            dos.writeBoolean(true);
            dos.writeUTF("你好尚学堂");
            dos.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (dos != null) {
                    dos.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 数据输入流

```java
package com.yoostar.coms;

import java.io.BufferedInputStream;
import java.io.FileInputStream;

public class DataInputDemo {
    public static void main(String[] args) {
        DataInputStream dis = null;
        try {
            dis = new DataInputStream(new BufferedInputStream(new FileInputStream("d:/data.txt")));
            //直接读取数据，注意：读取的顺序要与写入的顺序一致，否则不能正确读 取数据。 
            System.out.println("char: " + dis.readChar());
            System.out.println("int: " + dis.readInt());
            System.out.println("double: " + dis.readDouble());
            System.out.println("boolean: " + dis.readBoolean());
            System.out.println("String: " + dis.readUTF());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (dis != null) {
                    dis.close();
                }
            } catch (
                    Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 12、 对象流

对象的本质是用来组织和存储数据的，对象本身也是数据。那么，能不能将对象存储到硬盘上的文件中呢？能不能将对象通过网络传输到另一个电脑呢？我们可以通过序列化和反序列化来实现这些需求。

当两个进程远程通信时，彼此可以发送各种类型的数据。
无论是何种类型的数据，都会以二进制序列的形式在网络上传送。比如，我们可以通过http协议发送字符串信息；我们也可以在网络上直接发送Java对象。发送方需要把这个Java对象转换为字节序列，才能在网络上传送；接收方则需要把字节序列再恢复为Java对象才能正常读取。把Java对象转换为字节序列的过程称为 **
对象的序列化** 。把字节序列恢复为Java对象的过程称为 **对象的反序列化** 。

对象序列化的作用有如下两种：

* 持久化： 把对象的字节序列永久地保存到硬盘上，通常存放在一个文件中。
* 网络通信： 在网络上传送对象的字节序列。比如：服务器之间的数据通信、对象传递。

`ObjectOutputStream`代表对象输出流，它的`writeObject(Objectobj)方法可对参数指定的obj对象进行序列化`
，把得到的字节序列写到一个目标输出流中。`ObjectInputStream代表对象输入流，它的readObject()方法从一个源输入流中读取字节序列`
，再把它们反序列化为一个对象，并将其返回。只有实现了`Serializable接口的类的对象才能被序列化`。Serializable接口是一个空接口，只起到标记作用。

我们前边学到的数据流只能实现对基本数据类型和字符串类型的读写，并不能对Java对象进行读写操作（字符串除外），但是在对象流中除了能实现对基本数据类型进行读写操作以外，还可以对Java对象进行读写操作。

### 写出基本数据类型数据

```java
package com.king.io;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class ObjectOutputStreamBasicTypeDemo {
    public static void main(String[] args) {
        ObjectOutputStream oos = null;
        try {
            oos = new ObjectOutputStream(new BufferedOutputStream(new FileOutputStream("d:/sxt5.txt")));
            oos.writeInt(10);
            oos.writeDouble(Math.random());
            oos.writeChar('a');
            oos.writeBoolean(true);
            oos.writeUTF("你好 Oldlu");
            oos.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (oos != null) {
                    oos.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 读取基本数据类型数据

```java
package com.king.io;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class ObjectInputStreamBasicTypeDemo {
    public static void main(String[] args) {
        ObjectInputStream ois = null;
        try {
            ois = new ObjectInputStream(new BufferedInputStream(new FileInputStream("d:/sxt5.txt")));
            //必须要按照写入的顺序读取数据 
            System.out.println("int: " + ois.readInt());
            System.out.println("double: " + ois.readDouble());
            System.out.println("char: " + ois.readChar());
            System.out.println("boolean: " + ois.readBoolean());
            System.out.println("String: " + ois.readUTF());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (ois != null) {
                    ois.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

### 将对象序列化到文件

ObjectOutputStream可以将一个内存中的Java对象通过序列化的方式写入到磁盘的文件中。`被序列化的对象必须要实现Serializable序列化接口，否则会抛出异常`。

#### 创建对象

```java
package com.yoostar.coms;

import java.io.Serializable;

@Data
public class Users implements Serializable {
    private int userid;
    private String username;
    private String userage;

    public Users(int userid, String username, String userage) {
        this.userid = userid;
        this.username = username;
        this.userage = userage;
    }

    public Users() {
    }

}
```

#### 序列化对象

```java
package com.yoostar.coms;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class ObjectOutputStreamObjectTypeDemo {
    public static void main(String[] args) {
        ObjectOutputStream oos = null;
        try {
            oos = new ObjectOutputStream(new FileOutputStream("d:/sxt6.txt"));
            Users users = new Users(1, "Oldlu", "18");
            oos.writeObject(users);
            oos.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (oos != null) {
                    oos.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

#### 将对象反序列化到内存中

```java
package com.yoostar.coms;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class ObjectInputStreamObjectTypeDemo {
    public static void main(String[] args) {
        ObjectInputStream ois = null;
        try {
            ois = new ObjectInputStream(new FileInputStream("d:/sxt6.txt"));
            Users users = (Users) ois.readObject();
            System.out.println(users.getUserid() + "\t" + users.getUsername() + "\t " + users.getUserage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (ois != null) {
                    ois.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 13、 随机访问流

# RandomAccessFile可以实现两个作用：

* 1 .实现对一个文件做读和写的操作。
* 2 .可以访问文件的任意位置。不像其他流只能按照先后顺序读取。

在开发某些客户端软件时，经常用到这个功能强大的可以”任意操作文件内容”的类。比如，软件的使用次数和使用日期，可以通过本类访问文件中保存次数和日期的地方进行比对和修改。 Java很少开发客户端软件，所以在Java开发中这个类用的相对较少。

### 三个核心方法：

* 1 .RandomAccessFile(Stringname, String mode)name用来确定文件； mode取r(读)或rw(可读写)，通过mode可以确定流对文件的访问权限。
* 2 .seek(long a) 用来定位流对象读写文件的位置，a确定读写位置距离文件开头的字节个数。
* 3 .getFilePointer() 获得流的当前读写位置。

```java
package com.king.io;

import java.io.RandomAccessFile;

public class RandomAccessFileDemo {
    public static void main(String[] args) {
        RandomAccessFile raf = null;
        try {
            raf = new RandomAccessFile("d:/sxt7.txt", "rw");
            //将若干数据写入到文件中
            int[] arr = new int[]{10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
            for (int i = 0; i < arr.length; i++) {
                raf.writeInt(arr[i]);
            }
            raf.seek(4);
            System.out.println(raf.readInt());
            //隔一个读一个数据
            for (int i = 0; i < 10; i += 2) {
                raf.seek(i * 4);
                System.out.print(raf.readInt() + "\t");
            }
            System.out.println();
            //在第 8 个字节位置插入一个新的数据 45，替换之前的数据 30
            raf.seek(8);
            raf.writeInt(45);
            for (int i = 0; i < 10; i += 2) {
                raf.seek(i * 4);
                System.out.print(raf.readInt() + "\t");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (raf != null) {
                    raf.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 14、 ApacheIO包

ApacheIOUtils和FileUtils类库为我们提供了更加简单、功能更加强大的文件操作和IO流操作功能。非常值得大家学习和使用。

### 导入依赖

```xml

<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.8.0</version>
</dependency>
```

### FileUtils的使用

FileUtils类中常用方法：

打开FileUtils的api文档，我们抽出一些工作中比较常用的方法，进行总结和讲解。总结如下：

* cleanDirectory：清空目录，但不删除目录。
* contentEquals：比较两个文件的内容是否相同。
* copyDirectory：将一个目录内容拷贝到另一个目录。可以通过FileFilter过滤需要拷贝的文件。
* copyFile：将一个文件拷贝到一个新的地址。
* copyFileToDirectory：将一个文件拷贝到某个目录下。
* copyInputStreamToFile：将一个输入流中的内容拷贝到某个文件。
* deleteDirectory：删除目录。
* deleteQuietly：删除文件。
* listFiles：列出指定目录下的所有文件。
* openInputSteam：打开指定文件的输入流。
* readFileToString：将文件内容作为字符串返回。
* readLines：将文件内容按行返回到一个字符串数组中。
* size：返回文件或目录的大小。
* write：将字符串内容直接写到文件中。
* writeByteArrayToFile:将字节数组内容写到文件中。
* writeLines：将容器中的元素的toString方法返回的内容依次写入文件中。
* writeStringToFile：将字符串内容写到文件中。

#### 3.1 FileUtils的使用一

```java
package com.king.io;

import org.apache.commons.io.FileUtils;

public class FileUtilsDemo1 {
    public static void main(String[] args) throws Exception {
        String content = FileUtils.readFileToString(new File("d:/sxt.txt"), "utf-8");
        System.out.println(content);
    }
}
```

#### 3.2 FileUtils 的使用二

```java
package com.king.io;

import org.apache.commons.io.FileUtils;

public class FileUtilsDemo2 {
    public static void main(String[] args) throws Exception {
        FileUtils.copyDirectory(new File("d:/a"), new File("c:/a"), new FileFilter() {
            //在文件拷贝时的过滤条件
            @Override
            public boolean accept(File pathname) {
                if (pathname.isDirectory() || pathname.getName().endsWith("html")) {
                    return true;
                }
                return false;
            }
        });
    }
}
```

### IOUtils的使用

打开IOUtils的api文档，我们发现它的方法大部分都是重载的。所以，我们理解它的方法并不是难事。因此，对于方法的用法总结如下：

* buffer方法：将传入的流进行包装，变成缓冲流。并可以通过参数指定缓冲大小。
* closeQueitly方法：关闭流。
* contentEquals方法：比较两个流中的内容是否一致。
* copy方法：将输入流中的内容拷贝到输出流中，并可以指定字符编码。
* copyLarge方法：将输入流中的内容拷贝到输出流中，适合大于 2 G内容的拷贝。
* lineIterator方法：返回可以迭代每一行内容的迭代器。
* read方法：将输入流中的部分内容读入到字节数组中。
* readFully方法：将输入流中的所有内容读入到字节数组中。
* readLine方法：读入输入流内容中的一行。
* toBufferedInputStream，toBufferedReader：将输入转为带缓存的输入流。
* toByteArray，toCharArray：将输入流的内容转为字节数组、字符数组。
* toString：将输入流或数组中的内容转化为字符串。
* write方法：向流里面写入内容。
* writeLine方法：向流里面写入一行内容。

```java
package com.king.io;

import java.io.FileInputStream;

public class IOUtilsDemo {
    public static void main(String[] args) throws Exception {
        String content = IOUtils.toString(new FileInputStream("d:/sxt.txt"), "utf-8");
        System.out.println(content);
    }
}
```
