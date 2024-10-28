(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{589:function(s,a,e){"use strict";e.r(a);var t=e(3),r=Object(t.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h4",{attrs:{id:"https部署"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#https部署"}},[s._v("#")]),s._v(" https部署")]),s._v(" "),a("p",[a("strong",[s._v("HTTPS工作流程")])]),s._v(" "),a("p",[s._v("1.客户端发起一个 HTTPS 请求。\n2.服务端把配置好的证书返回给客户端。\n3.客户端验证证书：比如是否在有效期内，证书的用途是不是匹配 Client 请求的站点，是不是在 CRL 吊销列表里面，它的上一级证书是否有效等\n4.客户端使用伪随机数生成对称密钥，并通过证书里服务器的公钥进行加密。后续使用该对称密钥进行传输信息。\n5.服务端使用自己的私钥解密这个消息，得到对称密钥。至此，客户端和服务端都持有了相同的对称密钥。\n6.服务端使用对称密钥加密“明文内容 A”，发送给客户端。\n7.客户端使用对称密钥解密响应的密文，得到“明文内容 A”。\n8.客户端再次发起 HTTPS 的请求，使用对称密钥加密请求的“明文内容 B”，然后服务器使用对称密钥解密密文，得到“明文内容 B”。\n以此保持加密通信。")]),s._v(" "),a("ol",[a("li",[a("strong",[s._v("生成ca私钥和ca根证书")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#---------------------生成ca根证书-------------------------------")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#1. 创建ca私钥")]),s._v("\nopenssl genrsa "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" rootCA.key "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#2. 创建ca自签名证书  -nodes 不加密输出  -new 新的证书请求")]),s._v("\nopenssl req "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-x509")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-nodes")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-key")]),s._v(" rootCA.key  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-days")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("365")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" rootCA.crt\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[a("strong",[s._v("将rootCA.crt导入到浏览器中")])])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("创建server私钥")])])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#---------------------创建服务器私钥-------------------------------")]),s._v("\nopenssl genrsa "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" server.key "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[a("strong",[s._v("编写cert.ext附加配置文件")])])]),s._v(" "),a("div",{staticClass:"language-toml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-toml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Extensions to add to a certificate request")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("basicConstraints")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" CA:FALSE\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("keyUsage")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" nonRepudiation"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" digitalSignature"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" keyEncipherment"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" dataEncipherment\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("subjectAltName")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" @alt_names\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token table class-name"}},[s._v("alt_names")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 改成自己需要支持的服务器的域名")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("DNS.1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" zx"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("wenking"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("com\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#DNS.2 = helpdesk.example.org")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#DNS.3 = systems.example.net")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 改成自己需要支持的服务器的ip")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key property"}},[s._v("IP.1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("172.16")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("24.143")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# IP.2 = 172.16.24.85")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("当我们用域名或者ip地址访问服务器时，浏览器将校验domain or ip是否和 alt_names中的域名或者ip相等， 如果不相等  将提示 当前访问的请求不安全。")]),s._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[a("strong",[s._v("生成证书请求文件， 用ca私钥对证书请求文件进行签名")])])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 生成证书请求文件")]),s._v("\nopenssl req "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-key")]),s._v(" server.key "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" server.csr\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#使用ca私钥对证书进行签名    -CAcreateserial: 创建序号文件   -CAserial serial： 指定序号文件")]),s._v("\nopenssl x509 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-req")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" server.csr "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" server.crt "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-days")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("365")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-CAcreateserial")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-CA")]),s._v(" rootCA.crt "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-CAkey")]),s._v(" rootCA.key "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-CAserial")]),s._v(" serial "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-extfile")]),s._v(" cert.ext\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("strong",[s._v("部署")]),s._v("： 将server.key和server.crt文件放置到nginx配置文件中")]),s._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("server {\n        listen       443 ssl;\n        server_name  test.wenking.com;\n\n        ssl_certificate      /usr/local/nginx/ssl/server.crt;\n        ssl_certificate_key  /usr/local/nginx/ssl/server.key;\n        \n        location / {\n            root   html;\n            index  index.html index.htm;\n        }\n    }\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br")])]),a("p",[a("strong",[s._v("验证证书合法性")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("openssl verify "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-CAfile")]),s._v(" rootCA.crt server.crt\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("strong",[s._v("其他")]),s._v("：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#查看证书")]),s._v("\nopenssl x509 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" github.crt "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-text")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-noout")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 连接github.com:443 获取tls 证书")]),s._v("\nopenssl s_client "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-connect")]),s._v(" github.com:443 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-showcerts")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-n")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/-----BEGIN/,/-----END/p'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" github.com.crt\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("strong",[s._v("pkcs12转换")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 服务端证书和私钥打包为 pkcs12 文件")]),s._v("\nopenssl pkcs12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-clcerts")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" server.crt "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-inkey")]),s._v(" server.key "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" server.p12\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提取用户证书")]),s._v("\nopenssl pkcs12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" server.p12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-clcerts")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-password")]),s._v(" pass:217 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-nokeys")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" server_cert.pem\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 提取密钥")]),s._v("\nopenssl pkcs12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" server.p12  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-nocerts")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-password")]),s._v(" pass:217 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-nodes")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" private_key.pem\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 从密钥中提取公钥")]),s._v("\nopenssl rsa "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" private_key.pem "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-pubout")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" pk_server.pub\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 从密钥中提取私钥")]),s._v("\nopenssl rsa "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-in")]),s._v(" private_key.pem "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-out")]),s._v(" pk_server.key\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("blockquote",[a("p",[s._v("pkcs12 大致的组成包括密钥和证书， 密钥有公私钥对组成")])]),s._v(" "),a("p",[a("strong",[s._v("jks和pkcs12转换")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# jks -> p12")]),s._v("\nkeytool "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-importkeystore")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-srckeystore")]),s._v(" server.jks "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-srcstoretype")]),s._v(" JKS "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-deststoretype")]),s._v(" PKCS12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-destkeystore")]),s._v(" server.p12\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# p12 -> jks")]),s._v("\nkeytool "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-importkeystore")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-srckeystore")]),s._v(" server.p12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-srcstoretype")]),s._v(" PKCS12 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-deststoretype")]),s._v(" JKS "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-destkeystore")]),s._v(" server.jks\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[a("strong",[s._v("查看证书的网站：")]),s._v(" https://myssl.com/cert_decode.html")]),s._v(" "),a("p",[a("strong",[s._v("chrome 浏览器中删除证书：")]),s._v(" chrome://net-internals/#hsts")]),s._v(" "),a("p",[a("strong",[s._v("note：")])]),s._v(" "),a("p",[s._v("csr文件可以理解为没有签名的crt文件， 因为签名需要用issuer机构进行签名（此处为ca），同时还需要包含证书请求链。")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://gist.github.com/liuguangw/4d4b87b750be8edb700ff94c783b1dd4",target:"_blank",rel:"noopener noreferrer"}},[s._v("使用openssl制作自定义CA、自签名ssl证书 (github.com)"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=r.exports}}]);