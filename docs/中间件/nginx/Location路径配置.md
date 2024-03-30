---
title: Nginx-Location路径配置
date: 2023-07-25
categories:
  - 中间件
tags:
  - nginx
---

## location 匹配顺序

location模块分类有3类： 精确、正则和非正则。

=：精确匹配：必须和pattern完全相同才会匹配成功；匹配成功后会直接返回，不会继续匹配。

对于正则location，如果当前模块匹配成功，则直接返回成功，不会向下继续匹配。（顺序很重要，匹配到第一个就返回）
- ~*：不区分大小写正则；
- ~：区分大小写正则；
- ^~：非正则，或者理解为前缀匹配。和普通前缀匹配区别是匹配pattern成功后会立即返回。

对于非正则location，需要等所有其他模块匹配完成后，然后从成功匹配的模块中选取最长匹配前缀返回。（顺序无所谓，最终按照最长的返回）
- ''：普通（前缀）匹配：当前缀和pattern匹配时，匹配成功；
- /：通用匹配：如果没有其他匹配，则匹配当前请求；（可以理解为优先级最低的前缀匹配）

匹配流程为：
1. 先判断精确匹配是否命中，命中则直接返回。
2. 从上往下依次匹配，普通匹配命中，进行记录。正则匹配命中，直接返回。
3. 匹配顺序遍历完成后，没有正则命中，依据普通匹配命中pattern最长的模块进行返回。


## location 配置

### 静态资源配置

<span class="red">对于nginx静态资源的路径配置，必须使用绝对路径。 （nginx默认的index.html资源路径可能是做了映射，因此使用相对路径，但我们进行配置时必须使用绝对路径。）</span>

静态资源的路径配置包括 root 和 alias。

<span class="red">root命令指定的必须是目录。（末尾加不加斜杠都无所谓）。结果为：root + uri</span>
```nginx.conf
server {
    server_name  www.xxx.com;
    
    # 对于所有以 .html 结尾的请求，都将替换为到 /home/king/**.html 目录下搜索文件。
    # eg： 对于请求uri /page/static/index.html，转换后的结果为： /home/king/page/static/index.html
    location ~ \.html$ {
        root  /home/king;
        index index.html;
    }
}
```

<span class="red">alias命令必须指定目录，并且目录末尾的斜杠必须和pattern中的斜杠同时出现，或者同时不写。结果为：uri后面未匹配到pattern的部分 + alias</span>

```nginx.conf
server {
    server_name  www.xxx.com;
    
    # 对于请求 /img/static/a.jpg  重定向最终结果为去 /home/king/static/a.jpg 目录中查找文件
    location ~ /img/ {
        alias  /home/king/;
        index index.html;
    }
    
    # 同上
    location ~ /img {
        alias  /home/king;
        index index.html;
    }
}
```

### 反向代理配置

反向代理配置需要注意 proxy_pass 后面是否带有 / 。
- 如果有 / ： 则返回结果为：proxy_pass  + 将uri中未匹配到的（pattern）部分。
- 如果没有 / ： 则返回结果为： proxy_pass + uri。

```nginx.conf
server {
    server_name  www.xxx.com;
    
    # 对于请求 http://www.xxx.com/order/api/v1/makeorder, 最终转发到上游服务器的url为： http:127.0.0.1:8080/order/api/v1/makeorder。
    location ^~ /order/ {
        proxy_pass http:127.0.0.1:8080;
    }
    
    # 对于请求 http://www.xxx.com/order/api/v1/makeorder, 最终转发到上游服务器的url为： http:127.0.0.1:8080/api/v1/makeorder。
    location ^~ /order/ {
        proxy_pass http:127.0.0.1:8080/;
    }
}
```

### 重定向配置

由于网站迁移，或者接口地址修改，为了兼容老用户接口访问，我们通常需要对旧的url进行重定向，重定向主要通过 rewrite 指令操作。

rewrite指定：对请求的URI做正则匹配，不包括域名和查询参数，然后进行重定向。

replacement 指定的 regex 对应解析的字符串是 请求的 uri。

```nginx.conf
server {
    server_name  www.xxx.com;
    
    # 对于请求 http://www.xxx.com/order/api/v1/makeorder, 我们现在服务器和接口都进行了修改，需要将旧地址重定向到新地址上。 
    # 重定向后的结果为： http://www.yyy.com/order/api/v2/makeorder
    location /order {
        rewrite ^/(.*)/v1/(.*)$  http://www.yyy.com/$1/v2/$2 permanent;
    }
}
```


- $request_uri：包含请求参数的原始URI，不包含主机名，如：http://www.abc.com/abc/bbs/index.html?a=1&b=2 中的 /abc/bbs/index.php?a=1&b=2
- $uri：这个变量指当前的请求URI，不包括任何参数，如:/abc/bbs/index.html


扩展：

关于 301 和 302 的区别：
- 当服务器返回301状态码时，它明确告诉客户端（包括浏览器和搜索引擎爬虫）原始请求的资源已经永久性地移动到了新的URL。收到此状态码的客户端应当更新书签或者将来直接使用新的URL进行访问。搜索引擎在索引时也会将原链接的权重转移到新的URL上，这对SEO（搜索引擎优化）至关重要。
- 302状态码表示请求的资源已被临时转移到了新的URL上，但这不是一个永久性的变动。客户端应当继续使用原来的URL来执行后续请求，除非另外指示。搜索引擎在遇到302时，通常不会把索引和权重从原URL转移到新URL上，而是保留对原URL的关注。

临时重定向和永久重定向主要用于告诉搜索引擎，优化搜索算法，提高搜索效率。



## 应用

### 接口临时关闭

我们线上发布服务后，可能存在某个接口异常，需要临时关闭，我们可以通过nginx的location模块进行临时拦截返回。

正常线上应用配置：

```nginx.conf
server {
    server_name  www.xxx.com;
    
    # eg: 对于请求http://www.xxx.com/order/api/v1/makeorder, 对于真实后端地址为： http://127.0.0.1:8080/api/v1/makeorder;
    location ^~ /order/ {
        proxy_pass  http://127.0.0.1:8080/;
    }
}
```

现在，由于订单接口存在问题，我想临时关闭该接口，我们可以进行如下配置：

```nginx.conf
server {
    server_name  www.xxx.com;
    
    location ^~ /order/api/v1/makeorder {
        default_type application/json;
        return 200 "{'code': 200, 'message': '接口正再加紧修复，请稍后再试！'}";
    }
    
    # eg: 对于请求http://www.xxx.com/order/api/v1/makeorder, 对于真实后端地址为： http://127.0.0.1:8080/api/v1/makeorder;
    location ^~ /order/ {
        proxy_pass  http://127.0.0.1:8080/;
    }
}
```
