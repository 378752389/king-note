---
title: curl参数解析
date: '2023-07-11 08:00:00'
categories:
  - linux
tags:
  - http
---

```shell
# 不带有任何参数时，curl 就是发出 GET 请求; 服务器返回的内容会在命令行输出;
curl https://www.example.com

# -A参数:   指定客户端的用户代理标头，即User-Agent。curl 的默认用户代理字符串是curl/[version]。
curl -A 'php/1.0' https://www.example.com

# -H  也可以通过-H参数直接指定标头
curl -H 'User-Agent: php/1.0' https://www.example.com

# 请求结果保存为文件  -o  重命名  -O  原名
curl -o example.html https://www.example.com/index.html
curl -O https://www.example.com/index.html

# 跟随服务器的重定向
curl -L https://api.twitter.com/tweet

# 打印 响应头
curl -i https://www.example.com

# cookie
curl -b 'foo=bar' https://www.google.com         # 将 cookies 保存在文件中
curl -b cookies.txt https://www.google.com       # 将 cookies 保存在文件中
curl -c cookies.txt https://www.google.com       # 将 cookies 保存在文件中

# -d = --data-urlencode  发送 POST 请求的数据体，区别在于会自动将发送的数据进行 URL 编码
curl -d 'comment=hello world' -d 'name=wen king'  https://google.com/login
curl -G -d 'comment=hello world' -d 'name=wen king' https://google.com/login    # 发送get 请求， 查询参数拼接

# 限制请求带宽
curl --limit-rate 200k https://google.com

# 向服务器上传文件
curl -F 'file=@photo.png' https://google.com/profile # HTTP 请求加上Content-Type: multipart/form-data，然后将文件photo.png作为file字段上传。
curl -F 'file=@photo.png;type=image/png' https://google.com/profile #  curl 会把 MIME 类型默认设为application/octet-stream
curl -F 'file=@photo.png;filename=me.png' https://google.com/profile  # 原始文件名为photo.png，但是服务器接收到的文件名为me.png

# 跳过 ssl 证书检测
curl -k https://www.example.com

# 向服务器发送 head请求  -I  --head
curl -I https://www.example.com

# -x 指定代理
curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com

# -u 用来设置服务器认证的用户名和密码
curl -u 'bob:12345' https://google.com/login

# -v 查看请求的详细信息 请求 响应

# -X 指定请求方式
curl -X POST https://www.example.com

```