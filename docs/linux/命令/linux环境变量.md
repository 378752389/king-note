---
title: linux环境变量
date: 2023-07-11
categories:
  - linux
tags:
  - shell
---

Shell变量有局部变量、环境变量之分。局部变量就是指在某个Shell中生效的变量，只在此次登录中有效。环境变量通常又称“全局变量”;系统环境变量对所有系统用户都有效，用户环境变量仅仅对当前的用户有效。

<!-- more -->

## 环境变量存放位置

系统环境变量一般存放下面文件中：

* /etc/profile
    全局配置，不管哪个用户登录（成功）时都会读取该配置文件

* /etc/bashrc
    全局配置，bash启动时都会读取该配置文件

* /etc/environment
    一般不做修改

用户环境变量一般存放下面文件中：

* ~/.profile
    linux是多用户的，该配置只针对当前用户；若bash是以login方式执行时， ~/.bash_profile和~/.bash_login不存在时才读取该配置
  
* ~/.bash_profile
    linux是多用户的，该配置只针对当前用户；若bash是以login方式执行时，读取~/.bash_profile，若它不存,则读取~/.bash_login，若前两者不存在，读取 ~/.profile。

* ~/.bashrc
    linux是多用户的，该配置只针对当前用户；当bash是以non-login形式执行时，读取此文件。


## 修改环境变量

如想将一个路径加入到当前用户的环境变量（例如$PATH）中，可以像下面这样做：

编辑用户环境变量：`sudo vim ~/.bash_profile`

```shell
PATH=$PATH:PATH_1:PATH_2:PATH_3:------:PATH_N 
export PATH
```

立即生效配置（执行一遍.bash_profile文件）
```shell
source ~/.bash_profile
```

## 环境变量配置文件执行顺序

读取顺序：① /etc/profile、② ~/.bash_profile、③ ~/.bashrc、④ /etc/bashrc。

:::tip
① /etc/profile：此文件为系统的每个用户设置环境信息，系统中每个用户登录时都要执行这个脚本，如果系统管理员希望某个设置对所有用户都生效，可以写在这个脚本里，该文件也会从/etc/profile.d目录中的配置文件中搜集shell的设置。
② ~/.bash_profile：每个用户都可使用该文件设置专用于自己的shell信息，当用户登录时，该文件仅执行一次。默认情况下，他设置一些环境变量，执行用户的.bashrc文件。
③ ~/.bashrc：该文件包含专用于自己的shell信息，当登录时以及每次打开新shell时，该文件被读取。
④ /etc/bashrc：为每一个运行bash shell的用户执行此文件，当bash shell被打开时，该文件被读取。
:::