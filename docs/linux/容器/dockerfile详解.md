---
title: dockerfile详解
date: 2023-07-20
categories:
  - 容器
tags:
  - docker
---


## 常用指令详解

* FROM
选择基础镜像，定制的镜像都是基于 FROM 的基础镜像，我们后续命令都可基于该镜像进行操作。
```dockerfile
FROM ubuntu:latest
```

* WORKDIR
设置当前的工作目录，后续所有的操作默认都是基于该目录进行的。
```dockerfile
WORKDIR /tmp
```

* USER
用于指定执行后续命令的用户和用户组
```dockerfile
USER docker
# or
USER docker:dockergroup
```

* MAINTAINER
镜像的维护人，可以写入作者名字或联系方式。
```dockerfile
MAINTAINER "wenking"
```

* EXPOSE
容器启动时暴露的端口号；此处暴露的是容器端口，我们执行 `docker run` 命令如果不暴露 主机端口是访问不到容器的。
```dockerfile
EXPOSE 80
# or
EXPOSE 80 81 82
```

* ENV
设置容器启动时的环境变量，具体可以查看对应容器官方文档，用环境变量覆盖配置文件配置。
```dockerfile
EXPOSE name "king"
# or
EXPOSE name="king" age=25
```

* VOLUME
设置容器启动时挂载的卷；此处挂载的卷和容器端口一样，都是挂载在容器内部的卷，我们需要通过 `docker run` 指定外部卷来映射容器卷。
```dockerfile
VOLUME "/data"
# or
VOLUME ["/data", "/var/log"]
```

* ADD
将docker构建上下文中的文件拷贝到容器中；
```dockerfile
ADD "/root/data" "/data"
```

* COPY
将docker构建上下文中的文件拷贝到容器中；
```dockerfile
COPY "/root/data" "/data"
```

:::tip
ADD和COPY两者之间的区别： 如果拷贝的文件是 tar，gzip等压缩文件，ADD文件会自动解压缩
:::

* RUN
执行命令，并构建新的docker镜像；

* CMD
为启动的容器指定默认要运行的程序，程序运行结束，容器也就结束。 CMD 指令指定的程序可被 docker run 命令行参数中指定要运行的程序所覆盖。多个CMD命令，最后一个会覆盖之前的。

* ENTRYPOINT
类似于 CMD 指令，但其不会被 `docker run` 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。多个ENTRYPOINT命令，最后一个会覆盖之前的。

:::tip
RUN和CMD区别： RUN运行时机是 `docker build`， 而CMD是 `docker run`
CMD和ENTRYPOINT区别： CMD命令可以被覆盖，一般用作可选参数；ENTRYPOINT命令不能被覆盖，一般用作必选参数。
:::



## 构建前端vue项目

```dockerfile
# 拉取nginx基础镜像
FROM nginx:latest

# 维护者信息
MAINTAINER king

# 将dist文件中的内容复制到 `/usr/share/nginx/html/` 这个目录下面
COPY dist/  /usr/share/nginx/html/
# 用本地配置文件来替换nginx镜像里的默认配置
COPY conf/nginx/nginx.conf /etc/nginx/nginx.conf

# 对外暴漏的端口号
# [注：EXPOSE指令只是声明容器运行时提供的服务端口，给读者看有哪些端口，在运行时只会开启程序自身的端口！]
EXPOSE 80

# 启动nginx容器
CMD ["nginx", "-g", "daemon off;"]
```


:::tip
`.dockerignore` 在传递给Docker引擎时配置需要忽略掉的文件或文件夹，以提升镜像构建速度。

```
node_modules
```
:::

###### nginx.conf

```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    # include /etc/nginx/conf.d/*.conf;

    # ================== 修改配置位置 ==================
    server {
        listen       80;
        server_name  localhost; # 服务器地址或绑定域名

        #charset koi8-r;
        #access_log  /var/log/nginx/host.access.log  main;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
    # ==============================================
}
```

构建镜像

```shell
# 构建镜像
# -t：镜像命名
# --no-cache：构建镜像时不使用缓存
docker build  -t "test-frontend" . --no-cache
```

运行

```shell
# 运行
docker run -d --name test-frontend -p 80:80 --restart=on-failure test-frontend

# 进入容器
docker exec -it test-frontend /bin/bash
cd /usr/share/nginx/html
```



## 构建后端spring-boot项目

```dockerfile
# 拉取jdk基础镜像
FROM openjdk:8-jdk-alpine

# 维护者信息
MAINTAINER king

# 添加jar包到容器中 -- tips: xx.jar 和 Dockerfile 在同一级
ADD app.jar /tmp/

# 对外暴漏的端口号
EXPOSE 80

#  每个Dockerfile只能有一条CMD命令。如果指定了多条命令，只有最后一条会被执行。
CMD ["java", "-jar", "/tmp/app.jar"]
```


构建镜像

```shell
# 构建镜像
# -t：镜像命名
# --no-cache：构建镜像时不使用缓存
docker build  -t "test-backend" . --no-cache
```

运行

```shell
# 运行
docker run -d --name test-backend -p 80:80 --restart=on-failure test-backend

docker exec -it test-backend /bin/sh
cd /tmp
```