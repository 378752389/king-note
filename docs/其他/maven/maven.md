---
title: maven
date: 2023-07-08
categories:
  - 其他
tags:
  - maven
---

## package、install、deploy 三者之间区别

* package命令完成了项目编译、单元测试、打包功能，但没有把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库
* install命令完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库，但没有布署到远程maven私服仓库
* deploy命令完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库

## maven中snapshot和正式版本区别

如果在项目的配置文件中（pom文件）指定的版本号带有‘-SNAPSHOT’后缀时，打包出来的就是一个快照版本；

区别： 正式版本： 如果项目依赖某个库的正式版本， 项目构建的时候构建工具会先在本地仓库中查找是否已经有这个版本库的依赖， 如果不存在，则会去远程仓库中拉取，以后再次构建时都不会去访问远程仓库； **问题是：**
当依赖的某个库发布了新的版本，且版本号同名，那么我们项目将不能获取新发布的依赖，而且如果某个依赖经常发布新版本， 我们需要依赖最新的版本， 则需要不断的修改版本号；

snapshot版本： 如果项目依赖某个库的snapshot版本，每次构建项目时都会优先去远程仓库中查看是否有最新的snapshot.jar,如果有则下载使用，即使本地仓库已有最新版本；

## repository

1. repositories中的repository

​ 表示从什么库地址可以下载项目依赖的库文件

2. distributionManagement中的repository

​ 表示的是项目打包成库文件后要上传到什么库地址

3. pluginRepositories中的repository

​ pluginRepositories中的repository是以pluginRepository表示的，它表示插件从什么库地址下载。

## javaweb打包

war模式：将WEB工程以包的形式上传到服务器 ； war exploded模式：将WEB工程以当前文件夹的位置关系上传到服务器；

（1）war模式这种可以称之为是发布模式，看名字也知道，这是先打成war包，再发布；

（2）war exploded模式是直接把文件夹、jsp页面 、classes等等移到Tomcat 部署文件夹里面，进行加载部署。因此这种方式支持热部署，一般在开发的时候也是用这种方式。

## 依赖范围

maven 在编译、测试和运行项目时会使用不同的 classpath（编译classpath、测试 classpath、运行 classpath）。依赖范围就是用来控制依赖和这三种 classpath 的关系。maven
中有以下几种依赖范围：compile：默认值，使用该依赖范围的 maven 依赖，在编译、测试和运行时都需要使用该依赖test：只对测试 classpath 有效，在编译主代码和运行项目时无法使用此类依赖。如 JUnit
只在编译测试代码和运行测试的时候才需要此类依赖provided：已提供依赖范围。对于编译和测试 classpath 有效，但在运行时无效。如 servlet-api，编译和测试时需要该依赖，但在运行项目时，由于容器已经提供此依赖，故不需要
maven重复引入runtime：运行时依赖范围。对于测试和运行 classpath 有效，但在编译主代码时无效。如 JDBC 驱动实现，项目主代码的编译只需要 JDK 提供的 JDBC接口，只有在测试和运行时才需要实现 JDBC
接口的具体实现system：系统依赖范围import：导入依赖范围 import 导入依赖管理

* compile：默认值，使用该依赖范围的 maven 依赖，在编译、测试和运行时都需要使用该依赖
* test：只对测试 classpath 有效，在编译主代码和运行项目时无法使用此类依赖。如 JUnit 只在编译测试代码和运行测试的时候才需要此类依赖
* provided：已提供依赖范围。对于编译和测试 classpath 有效，但在运行时无效。如 servlet-api，编译和测试时需要该依赖，但在运行项目时，由于容器已经提供此依赖，故不需要 maven重复引入
* provided：已提供依赖范围。对于编译和测试 classpath 有效，但在运行时无效。如 servlet-api，编译和测试时需要该依赖，但在运行项目时，由于容器已经提供此依赖，故不需要 maven重复引入
* system：系统依赖范围， 导入本地jar包
* import：导入依赖范围，只在<dependencyManagement>内定义的<dependency>中支持import这一scope。 它表示，在当前这个pom文件的<dependencyManagement>
  内定义的<dependency>会被**替换**成一些系列的<dependency>。

system打包示例

在依赖中添加如下内容

```xml

<dependency>
    <groupId>com.mytest</groupId>
    <artifactId>test</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>${pom.basedir}/lib/test-1.0.jar</systemPath>
</dependency>
```

在打包插件中包含依赖路径

```xml

<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <!--设置为true，以便把本地的system的jar也包括进来-->
        <includeSystemScope>true</includeSystemScope>
    </configuration>
</plugin>
```

## 给项目打上标签版本

```shell
# 修改 maven version标签 版本号
mvn versions:set -DnewVersion="1.0.0"
# 重新打包
mvn clean package    


```

## 仓库配置

```xml
<!-- mvn:部署 指定上传依赖路径 -->
<distributionManagement>
    <repository>
        <id>localhost</id>
        <url>http://localhost:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>localhost</id>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>

        <!--  指定依赖下载路径  -->
<repositories>
<repository>
    <id>localhost</id>     <!-- 对应在 maven setting.xml 中配置的 server 标签id -->
    <name>本地 nexus 下载测试</name>
    <url>http://localhost:8081/repository/maven-public/</url>
</repository>
</repositories>


        <!--  阿里插件库  -->
<repositories>
<repository>
    <id>aliyun</id>
    <url>https://maven.aliyun.com/repository/public</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>false</enabled>
    </snapshots>
</repository>
</repositories>
<pluginRepositories>
<pluginRepository>
    <id>aliyun-plugin</id>
    <url>https://maven.aliyun.com/repository/public</url>
    <releases>
        <enabled>true</enabled>
    </releases>
    <snapshots>
        <enabled>false</enabled>
    </snapshots>
</pluginRepository>
</pluginRepositories>





```

## 常用maven插件

```xml

<build>
    <plugins>
        <!-- maven-compiler-plugin 插件可以指定项目源码的 jdk 版本 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.3</version>
            <configuration>
                <!-- 指定source和target的版本 -->
                <source>${java.version}</source>
                <target>${java.version}</target>
            </configuration>
        </plugin>

        <!-- 跳过测试阶段插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.4.2</version>
            <configuration>
                <skipTests>true</skipTests>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 依赖冲突解决插件

`Maven Helper`