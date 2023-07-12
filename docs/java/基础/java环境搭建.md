---
title: java环境搭建
date: '2023-07-11 15:00:00'
categories:
  - JavaSE
---

```shell

#------------------------------------------sun jdk-----------------------------------------------------------------
# 下载页面地址
# http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

# wget 下载 安装包
wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u141-b15/336fa29ff2bb4ef291e347e091f7f4a7/jdk-8u141-linux-x64.tar.gz"

vim /etc/profile
export JAVA_HOME=/usr/local/src/jdk/jdk1.8
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=$CLASSPATH:.:${JAVA_HOME}/lib:${JAVA_HOME}/jre/lib
export PATH=${JAVA_HOME}/bin:${JAVA_HOME}/jre/bin:$PATH

source  /etc/profile
#------------------------------------------------------------------------------------------------------------------
```

