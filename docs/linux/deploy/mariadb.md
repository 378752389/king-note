---
title: mariadb环境搭建
---


## mariadb 安装
```shell
yum -y install mariadb mariadb-server

systemctl start mariadb
systemctl enable mariadb

mysql_secure_installation
```

## 主从复制

mariadb 安装后默认的配置文件内容

```shell
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
# Settings user and group are ignored when systemd is used.
# If you need to run mysqld under a different user or group,
# customize your systemd unit file for mariadb according to the
# instructions in http://fedoraproject.org/wiki/Systemd

log-bin=mysql-bin
server-id=1
binlog-format=mixed

[mysqld_safe]
log-error=/var/log/mariadb/mariadb.log
pid-file=/var/run/mariadb/mariadb.pid

#
# include all files from the config directory
#
!includedir /etc/my.cnf.d
```


主节点使用默认值，不需要修改， 从节点的内容修改如下
```shell
# 集群中的节点不能重复
server-id=2
```

登录主库执行如下操作
```shell
# 在主库上创建一个用户名为 slave 的用户，密码为 123, % 表示可以从任意ip地址进行登录
GRANT REPLICATION SLAVE ON *.* TO 'slave'@'%' IDENTIFIED BY '123';

# 全局加读锁
flush tables with read lock;

# 查看主库 状态， 记录下 file 和 position 字段
show master status;

mysqldump -uroot -p123 --databases master_slave_test  > /root/master_slave_test_db.sql

# 释放锁
UNLOCK TABLES;
```

登录从库， 进行如下操作

```shell
# 同步主库数据
source /root/master_slave_test_db.sql
# 配置从库   master_log_file 为主库的 file， master_log_pos 为主库的 position
stop slave;
change master to master_host='192.168.1.210', 
master_user='slave', 
master_password='slaver', 
master_log_file='mysql-bin.000004', 
master_log_pos=388; 
start slave;

# 查看从库状态
show slave status\G:
```

可能存在的问题
```shell
#-----------------------------如果有权限问题-----------------------------------------
# 授权远程用户 root 登录权限（主从都需要执行）
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123' WITH GRANT OPTION;
```
