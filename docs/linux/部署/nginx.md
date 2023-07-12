---
title: nginx环境搭建
date: '2023-07-11 08:00:00'
categories:
  - 中间件
tags:
  - nginx
---


```
#一键安装上面四个依赖
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
#yum -y install gcc gcc-c++ make automake autoconf libtool pcre* zlib openssl openssl-devel

wget http://nginx.org/download/nginx-1.20.2.tar.gz

tar -zxvf nginx-1.20.2.tar.gz
mv nginx-1.20.2.tar.gz /usr/local

cd /usr/local/nginx-1.20.2
./configure --with-http_ssl_module

make & make install 
# 如何是按照新的插件   先用 nginx -V 查看已按照的插件并复制下来， 然后 执行  make 命令， 将按照目录下的 objs/nginx 移动到已经安装的nginx目录下的sbin目录下即可

cd /usr/local/nginx
sbin/nginx
```





nginx 中 lua 包路径配置

```shell
lua_package_path "/usr/local/nginx/conf/lua/?.lua;/usr/local/nginx/conf/lua/resty/?.lua";
```







**符号解释**

```shell
=    精确匹配 
^~   只与前部分匹配
~    大小写敏感
~*   大小写不敏感
!~    正则不匹配（区分大小写）
!~*    正则不匹配（不区分大小写）
```



**直播服务**

https://www.jb51.net/article/249100.htm





**正向代理**

分类：

* 正向代理分类：
  * 普通代理： 客户端需要手动指定代理服务器的ip地址和端口号； eg： squid
  * 透明代理： 客户端**不**需要手动指定代理服务器的ip地址和端口号； eg：网关

* 代理是否解密https分类：
  * 隧道代理： 不解密； eg：nginx
  * 中间人代理： 解密；eg： charles





nginx默认只支持做http正向代理， 如要nginx做https正向代理需要下载http_connect模块：[下载地址](https://github.com/chobits/ngx_http_proxy_connect_module)

```shell
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak

cd nginx-1.20.2/
patch -p1 < /path/to/ngx_http_proxy_connect_module/patch/proxy_connect.patch

./configure \
--with-http_ssl_module \
--with-http_stub_status_module \
--with-http_realip_module \
--with-threads \
--add-module=/opt/ngx_http_proxy_connect_module-0.0.3

make

mv obj/nginx /usr/local/nginx/sbin/
```





修改nginx.conf 配置文件

```
# http 代理
server {
    resolver 114.114.114.114;       #指定DNS服务器IP地址 
    listen 3080;
    location / {
        proxy_pass http://$host$request_uri;     #设定代理服务器的协议和地址 
        proxy_set_header HOST $host;
        proxy_buffers 256 4k;
        proxy_max_temp_file_size 0k;
        proxy_connect_timeout 30;
        proxy_send_timeout 60;
        proxy_read_timeout 60;
        proxy_next_upstream error timeout invalid_header http_502;
    }
}


server {
     listen                         3443;

     # dns resolver used by forward proxying
     resolver                       114.114.114.114;

     # forward proxy for CONNECT request
     proxy_connect;
     proxy_connect_allow            443 563;
     proxy_connect_connect_timeout  10s;
     proxy_connect_read_timeout     10s;
     proxy_connect_send_timeout     10s;

     # forward proxy for non-CONNECT request
     location / {
         proxy_pass http://$host;
         proxy_set_header Host $host;
     }
 }
```









