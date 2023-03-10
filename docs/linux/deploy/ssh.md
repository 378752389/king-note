---
title: ssh私钥搭建
---

#### ssh登录

**概述**

`SSH`的全称为`Secure Shell`，即安全外壳协议。它是一种专为远程登陆会话和网络服务提供安全性的应用层协议。

主要功能是安全的连接到服务器。



**ssh加密原理**

* 口令验证登录
  1. **服务器生成公钥和私钥**
  2. 客户端发起连接请求，服务器将公钥发给客户端
  3. 客户端输入口令（服务器密码），并用服务器发来的公钥加密，发送给服务器
  4. 服务器通过私钥解密，拿到口令（服务器密码）
  5. 如果正确则认证成功

* 密钥验证登录

  1. **客户端生成公钥和私钥**，将公钥提前部署在服务器上

  2. 客户端发起连接请求

  3. 服务器随机生成一个字符串，用本地的公钥加密，发送给客户端

  4. 客户端通过私钥解密，将解密后的字符串发送给服务器

  5. 服务器验证本地字符串和客户端发来的字符串的一致性，如果通过，则认证成功





**使用**

使用密钥的方式登录时， 客户端密钥一般存放在服务器的`~/.ssh/authorized_key`目录中（其中`~`指的是客户端登录服务器时指定的用户名），用户在登录的时候指定使用到的私钥和登录服务器的用户名和ip地址。



```shell
# 密钥的方式登录
ssh -i ./root_key.pem root@54.243.22.210


# 客户端生成公钥和私钥, 将公钥文件上传的服务器上，然后在追加到 authorized_keys 文件中
ssh-keygen -t rsa
cat /root/id_rsa.pub >> /root/.ssh/authorized_keys

# 密码的方式登录
ssh -p 6688 ymtar@128.14.9.130
```



**其他**

authorized_keys： 我们需要本地机器ssh访问远程服务器时为了减少输入密码的步骤，基本上都会在本地机器生成ssh公钥，然后将本地ssh公钥复制到远程服务器的.ssh/authorized_keys中，这样就可以免密登录了。

known_hosts： 第一次连接远程数据库时我们可以发现我们本地的.ssh/目录下多了一个文件known_hosts，里面有我们刚刚连接的服务器的信息（如果以前就存在known_hosts，则会发现多了刚刚连接的服务器的信息）。



**sshpass使用**

```shell
#  使用前提：对于未连接过的主机。而又不输入yes进行确认，需要进行sshd服务的优化
# vim /etc/ssh/ssh_config   
StrictHostKeyChecking no

#-------------------------------可以不设置--------------------------------------
# vim /etc/ssh/sshd_config  
GSSAPIAuthentication no
UseDNS no
#------------------------------------------------------------------------------

systemctl restart sshd
yum -y install sshpass

sshpass -p xxx ssh root@192.168.11.11
```





