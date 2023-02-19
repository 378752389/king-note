---
title: java项目搭建
---

### 修改pom.xml 

```xml
 <!-- 配置环境信息 -->
    <profiles>
        <!-- 开发环境 -->
        <profile>
            <id>dev</id>
            <properties>
                <!--                ***********************配置信息****************************************-->
                <user>root</user>
                <password>123</password>
                <ip>192.168.1.133</ip>
                <active>default</active>

                <!--                项目目录-->
                <xProjectPath>/root/wagon-test</xProjectPath>
                <!--                打包文件暂存位置， 不能和项目目录重合-->
                <xHomePath>/root</xHomePath>
                <!--                项目名称-->
                <xProjectName>${project.artifactId}-${project.version}</xProjectName>

                <!--                ********************************************************************-->
            </properties>
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
    </profiles>

    <build>

        <finalName>${xProjectName}</finalName>

        <extensions>
            <!-- https://mvnrepository.com/artifact/org.apache.maven.wagon/wagon-ssh -->
            <extension>
                <groupId>org.apache.maven.wagon</groupId>
                <artifactId>wagon-ssh</artifactId>
                <version>3.5.2</version>
            </extension>

        </extensions>

        <plugins>
            <!-- Package 自动上传服务器插件 -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>wagon-maven-plugin</artifactId>
                <version>2.0.2</version>

                <executions>
                    <execution>
                        <id>upload-wagon-test</id>
                        <phase>install</phase>
                        <goals>
                            <goal>upload-single</goal>
                            <goal>sshexec</goal>
                        </goals>
                    </execution>
                </executions>

                <configuration>
                    <!-- 指定上传文件: target/artifactId-version.jar -->
                    <fromFile>target/${xProjectName}.zip</fromFile>
                    <!-- scp协议传输：username:password@ip/destinationPath-->
                    <url>scp://${user}:${password}@${ip}/${xHomePath}</url>
                    <!-- scp传输完毕后执行的命令 -->
                    <commands>
                        <!-- 1) 备份旧包 -->
                        <!--                        创建项目目录-->
                        <command>mkdir -p ${xProjectPath}</command>
                        <!--                        备份项目旧包-->
                        <command>
                            if [ -f ${xProjectPath}/${xProjectName}.zip ];
                            then
                            mv ${xProjectPath}/${xProjectName}.zip ${xProjectPath}/${xProjectName}.zip.`date
                            +%Y-%m-%d@%H-%M-%S`.bak
                            fi;
                        </command>
                        <!--                        移除旧的解压项目-->
                        <command>
                            if [ -d ${xProjectPath}/${xProjectName} ];
                            then
                            rm -rf ${xProjectPath}/${xProjectName}
                            fi;
                        </command>
                        <!-- 2) 移动新包到工程目录 -->
                        <command>\mv ${xHomePath}/${xProjectName}.zip ${xProjectPath}/${xProjectName}.zip</command>
                        <!-- 3) 执行解压包 -->
                        <command>unzip ${xProjectPath}/${xProjectName}.zip -d ${xProjectPath}</command>
                        <command>/bin/bash ${xProjectPath}/${xProjectName}/bin/startup.sh restart</command>
                    </commands>
                    <!-- 显示执行命令的输出结果 -->
                    <displayCommandOutputs>true</displayCommandOutputs>
                </configuration>
            </plugin>


            <!--boot 项目打包插件 -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <!--            跳过测试阶段-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <skipTests>true</skipTests>
                </configuration>
            </plugin>

            <!--            项目打包-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-assembly-plugin</artifactId>
                <version>3.2.0</version>
                <executions>
                    <execution>
                        <id>create-release-zip</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <finalName>${xProjectName}</finalName>
                    <appendAssemblyId>false</appendAssemblyId>
                    <descriptors>
                        <descriptor>release.xml</descriptor>
                    </descriptors>
                </configuration>
            </plugin>
        </plugins>
    </build>
```







### 创建启动脚本

```shell
#!/bin/sh
# ***************************配置信息*****************************************
# PID保存路径
BASE_PATH=/root/wagon-test/wagon-test-1.0-SNAPSHOT

# 可运行的jar
JAVA_RUNNER_PATH=$BASE_PATH/lib
JAVA_RUNNER=wagon-test-1.0-SNAPSHOT.jar

# java虚拟机参数
JAVA_OPTS="-Duser.timezone=Asia/Shanghai -Xms512m -Xmx512m"
# **************************************************************************

getPID() {
   javaps=`ps -ef | grep $JAVA_RUNNER_PATH/$JAVA_RUNNER | grep -v "grep"`
   if [ -n "$javaps" ]; then
      psid=`echo $javaps | awk '{print $2}'`
   fi
   echo "$psid"
}

start(){
    echo "---------------------------------------------"
    echo "* Home path:    $BASE_PATH"
    echo "* Runnable jar: $JAVA_RUNNER"
    echo "* JAVA_OPTS:    $JAVA_OPTS"
    echo "---------------------------------------------"
    pid=`getPID`
    if [ -n "$pid" ]
    then
        echo "$JAVA_RUNNER has already been running!"
    else
        echo "--- Starting $JAVA_RUNNER"
        nohup java $JAVA_OPTS -jar $JAVA_RUNNER_PATH/$JAVA_RUNNER > /dev/null 2>&1 &
        sleep 1
        pid=`getPID`
        if [ -n "$pid" ]
        then
          echo "--- $JAVA_RUNNER start success !"
        fi
    fi
}


stop(){
    pid=`getPID`
    if [ -z "$pid" ]
    then
        echo "$JAVA_RUNNER is not running !"
    else
        kill -9 $pid
        echo "$JAVA_RUNNER has stoped !"
    fi
}


restart(){
    stop
    start
}

status(){
    echo "---------------------------------------------"
    echo "* Home path:    $BASE_PATH"
    echo "* Runnable jar: $JAVA_RUNNER"
    echo "* JAVA_OPTS:    $JAVA_OPTS"
    echo "---------------------------------------------"
    pid=`getPID`
    if [ -z "$pid" ]
    then
        echo "$JAVA_RUNNER is not running!"
    else
        echo "$JAVA_RUNNER is running!"
    fi
}

case $1 in
start) start;;
stop) stop;;
restart) restart;;
status) status;;
*) echo "please input start/stop/restart/status"
esac

```



### 添加logback.xml配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <contextName>${APP_NAME}</contextName>

    <springProperty name="APP_NAME" scope="context" source="spring.application.name"/>
<!--    **************************************配置信息***************************************************************-->
<!--    <springProperty name="LOG_FILE" scope="context" source="logging.file" defaultValue="./logs/${APP_NAME}"/>-->
    <springProperty name="LOG_FILE" scope="context" source="logging.file" defaultValue="/root/logs/${APP_NAME}"/>

<!--    <springProperty name="LOG_POINT_FILE" scope="context" source="logging.file" defaultValue="./logs/point"/>-->
    <springProperty name="LOG_MAXFILESIZE" scope="context" source="logback.filesize" defaultValue="100MB"/>
    <springProperty name="LOG_FILEMAXDAY" scope="context" source="logback.filemaxday" defaultValue="7"/>
    <springProperty name="ServerIP" scope="context" source="spring.cloud.client.ip-address" defaultValue="0.0.0.0"/>
    <springProperty name="ServerPort" scope="context" source="server.port" defaultValue="0000"/>
<!--    ************************************************************************************************************-->
    <!-- 彩色日志 -->
    <!-- 彩色日志依赖的渲染类 -->
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter"/>
    <conversionRule conversionWord="wex"
                    converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter"/>
    <conversionRule conversionWord="wEx"
                    converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter"/>

    <!-- 彩色日志格式 -->
    <property name="CONSOLE_LOG_PATTERN"
              value="[${APP_NAME}:${ServerIP}:${ServerPort}] [%clr(%X{traceid}){yellow},%clr(%X{X-B3-TraceId}){yellow}] %clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(%level){blue} %clr(${PID}){magenta} %clr([%thread]){orange} %clr(%logger){cyan} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}"/>
    <property name="CONSOLE_LOG_PATTERN_NO_COLOR"
              value="[${APP_NAME}:${ServerIP}:${ServerPort}] [%X{traceid},%X{X-B3-TraceId}] %d{yyyy-MM-dd HH:mm:ss.SSS} %level ${PID} [%thread] %logger %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}"/>


    <!-- 控制台日志 -->
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <withJansi>true</withJansi>
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- 按照每天生成常规日志文件 -->
    <appender name="ERROR" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE}/${APP_NAME}-error.log</file>
        <!-- 基于时间的分包策略 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${LOG_FILE}/${APP_NAME}-error.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <!--保留时间,单位:天-->
            <maxHistory>7</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN_NO_COLOR}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>100MB</MaxFileSize>
        </triggeringPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter"><!-- 只打印错误日志 -->
            <level>ERROR</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <!-- 按照每天生成常规日志文件 -->
    <appender name="INFO" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_FILE}/${APP_NAME}-info.log</file>
        <!-- 基于时间的分包策略 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>${LOG_FILE}/${APP_NAME}-info.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <!--保留时间,单位:天-->
            <maxHistory>7</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN_NO_COLOR}</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>

    <root level="INFO">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="ERROR"/>
        <appender-ref ref="INFO"/>
    </root>

</configuration>
```

