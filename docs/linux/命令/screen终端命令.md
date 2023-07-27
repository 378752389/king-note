---
title: 【screen】终端命令
date: 2023-07-27
categories:
  - linux
tags:
  - linux命令
---

## 其他终端命令

1. `ctrl + z` 暂停进行，然后用 `bg + 序列号` 让程序后台运行；

缺点： ssh终端退出后，程序也就终止了。

2. `nohup 程序命令 > nohup.out 2 &>1 &` 挂起程序；

缺点：需要将标准输出导出文件。

## screen 常用命令

### 新建一个虚拟终端

如果虚拟终端名已存在，则attach到该虚拟终端

```shell
# screen -R [终端名/进程id]
screen -R demo
```

:::warning

使用 `screen + 命令` 也可以在新的虚拟终端中执行命令，不过不推荐使用，如果存在多个虚拟终端，下次需要在attach到当前的虚拟终端，查找则会变动困难，不利于管理

:::

### 分离一个虚拟终端

按住 `ctrl + a`, 然后再按住 `d` 即可分离终端

### 重新回到指定虚拟终端

```shell
# screen -r [终端名/进程id]
screen -r demo
```

### 退出虚拟终端

```shell
# screen -R [终端名/进程id] -X quit
screen -R demo -X quit
```

:::tip

也可以是用快捷键 `ctrl + d` 退出虚拟终端

:::




## screen 使用示例

用screen 开启一个新的虚拟终端

```shell
screen java -jar demo-1.0-SNAPSHOT.jar
```

![screen启动springboot程序](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/screen%E5%90%AF%E5%8A%A8springboot%E7%A8%8B%E5%BA%8F.png)



按住`ctrl + d`， 然后按住`d`分离终端，让终端后台运行, 并查看当前的进程信息

![screen分离程序查看进程信息](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/screen%E5%88%86%E7%A6%BB%E7%A8%8B%E5%BA%8F%E6%9F%A5%E7%9C%8B%E8%BF%9B%E7%A8%8B%E4%BF%A1%E6%81%AF.png)


1. 使用 `screen -ls` 查看到当前系统中存在的一个screen虚拟终端
2. 该虚拟终端的进程号为 `2432`
3. 使用`ps`命令可以查看到一个进程id为 `2432`的一个进程