---
title: login和non-login区别
date: 2023-07-17
categories:
  - linux
tags:
  - shell
---

我们使用linux的时候会发现，当我们进入系统一进入 bash ，就有一堆变量可以使用，这些东西都是从哪来的呢？这就要归功于linux系统里面的配置文件了。当我们的系统启动之后，它们就会开始读取我们的配置文件让我们后续可以正常的使用。

<!-- more -->

| shell | 概念 |
| --- | --- |
| login shell | 取得 bash 时需要完整的登陆流程(输入用户名和密码)，就称为 login shell。 |
| non-login shell |取得 bash 时不需要重复登陆的举动。比如我们登陆 Linux 后， 启动终端Terminal，此时那个终端接口并没有需要再次的输入账号与密码，那个 bash 的环境就称为 non-login shell了。又或者你在原本的 bash 环境下再次使用 bash 这个命令，建立了一个bash子进程，同样的也没有输入账号密码， 那第二个 bash (子程序) 也是 non-login shell |

这两种shell 读取的配置文件是不一样的

* 对于 `login shell`, 一般来说会读取一下配置：
1. `/etc/profile`: 系统的整体配置；
2. `~/.bash_profile` 或 `~/.bash_login` 或 `~/.profile`， 属于个人配置，多用户时，我们就可以修改这些配置文件。

:::tip
bash 的 login shell 配置只会读取上面三个文件的其中一个， 而读取的顺序则是依照 `~/.bash_profile` 或 `~/.bash_login` 或 `~/.profile` 的顺序。
:::

![linux中login-shell读取配置文件顺序](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/linux%E4%B8%ADlogin-shell%E7%99%BB%E5%BD%95%E8%AF%BB%E5%8F%96%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E9%A1%BA%E5%BA%8F.png)

* 对于`non-login shell`则只会读取`~/.bashrc`这一个文件

su 命令可以用于进行用户切换，其常用参数包含：
:::tip
-: 代表使用 login-shell 的变量文件读取方式来登陆系统; 若使用者名称没有加上去，则代表切换为 root 的身份
-c：仅进行一次命令,登录时候可执行的命令
-m: 使用目前的环境配置，而不读取新使用者的配置文件
:::


:::warning
`su 用户名`， 是以`non-login-shell`切换用户进行登陆的，而`su - 用户名` 则表示以`login-shell`切换root用户。
:::

验证:

修改`~/.bash_profile`, 末尾添加如下内容：
```shell
echo "~/.bash_profile"
```

修改 `~/.bashrc`, 末尾添加如下内容：
```shell
echo "~/.bashrc"
```

`login shell`进行用户登录
```shell
ssh root:123@192.168.1.128
```

![以login-shell方式进行登录输出](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/login-shell%E6%96%B9%E5%BC%8F%E8%BF%9B%E8%A1%8C%E7%99%BB%E5%BD%95.png)

`non login shell`进行用户登录
```shell
su root
```

![以non-login-shell方式进行登录输出](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/non-login-shell%E6%96%B9%E5%BC%8F%E8%BF%9B%E8%A1%8C%E7%99%BB%E5%BD%95.png)

