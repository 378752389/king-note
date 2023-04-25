---
title: maven
permalink: /linux/deploy/maven
---


## 安装

```shell
wget https://dlcdn.apache.org/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz

tar -zxvf apache-maven-3.6.3-bin.tar.gz
```

修改conf/settings.xml文件

在 settings 标签下  添加如下内容

```shell
<localRepository>/root/apache-maven-3.6.3/repo</localRepository>
```

在 mirrors 标签下  添加如下内容

```shell
<mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
       <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
</mirror>
```

添加环境变量

```shell
vim /etc/profile

export MAVEN_HOME=/root/apache-maven-3.6.3
export PATH=$PATH:${MAVEN_HOME}/bin
```

测试是否安装成功

```shell
mvn -v
```