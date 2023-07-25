---
title: Nginx-SSL证书配置
date: 2023-07-25
categories:
  - 中间件
sidebar: false
tags:
  - nginx
  - 证书
---

## nginx 证书配置

:::tip
关于自定义证书生成，大家可以参考这篇[博客](/linux/命令/openssl)
:::

```shell

# HTTP server 
server {
    # http使用80端口
    listen       80;
    server_name localhost;
    
    # 把http的域名请求转成https    ex: 访问 http://www.baidu.com 时自动跳转为 https://www.baidu.com
	# return 301 https://$host$request_uri; 

    location / {
        root   html;
        index  index.html index.htm;
    }
}


# HTTPS server
server {
    # SSL使用443端口
    listen       443 ssl;
    
    # =============================================================
    # =============↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓========================
    # =============================================================
    # SSL证书绑定的域名
    server_name www.wenking.com;
    # 证书pem文件
    ssl_certificate      /home/ssl/server-cert.pem;
    # 证书key文件
    ssl_certificate_key  /home/ssl/server-key.pem;
    
    # =============================================================
    # ==================↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑========================
    # =============================================================
    
    # 启用 SSL Session 缓存
    ssl_session_cache    shared:SSL:1m;
    # 缓存SSL握手产生的参数和加密密钥的时长
    ssl_session_timeout 5m;
    # 使用的加密套件的类型
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; 
    # 表示使用的TLS协议的类型
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    # 加密套件优先选择服务器的加密套件
    ssl_prefer_server_ciphers on; 

    location / {
        root   html;
        index  index.html index.htm;
    }
}
```

## 验证证书有效性

:::tip

通常我们使用curl访问https请求时，在tls进行会话连接时，会使用系统内置安装的证书验证服务器发送过来的证书，如果验证失败，默认是会报错的，

:::

```shell
# 直接请求服务器，会使用系统内置的证书，结果将会报错
curl https://192.168.1.128
```

报错内容如下：

![curl请求https自定义证书服务器报错](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/curl%E8%AF%B7%E6%B1%82https%E8%87%AA%E5%AE%9A%E4%B9%89%E8%AF%81%E4%B9%A6%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%8A%A5%E9%94%99.png)

指定ca证书
```shell
# 指定ca证书请求服务器
curl https://192.168.1.128 --cacert ca.pem
```
![curl请求https自定义证书服务器成功](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/curl%E8%AF%B7%E6%B1%82https%E8%87%AA%E5%AE%9A%E4%B9%89%E8%AF%81%E4%B9%A6%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%88%90%E5%8A%9F.png)


:::tip
# 跳过服务器验证
curl -k https://192.168.1.128
:::