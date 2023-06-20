---
title: http 
permalink: /java/core/http
---

## http各个版本之间区别

* Http/0.9

    * 只接受get请求
    * 不支持请求头
    * 只支持纯文本格式。
* Http/1.0

    * 包含头信息和响应状态码
    * 支持更多请求方式（post和head）

    * 每次tcp连接只能发送一次请求，不支持keep-alive；
      > 为了支持长连接，浏览器请求会加上(Connection: keep-alive)要求服务器不要关闭连接,服务器响应也会返回该头部字段表示同意
      >
      > 这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。

    * 支持多种数据传输，字符集， 内容编码

      1.0版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是Content-Type字段的作用。

      MIME type还可以在尾部使用分号，添加参数。 `Content-Type: text/html; charset=utf-8`
      客户端请求的时候，可以使用Accept字段声明自己可以接受哪些数据格式。  `Accept: */*`

      内容编码： client请求表示支持编码方式： `Accept-Encoding: gizp, deflate`   server响应表示使用编码方式： `Content-Encoding: gzip`

    * 支持cache

* Http/1.1

    * 引入了持久连接，tcp默认不关闭；
    * 引入管道机制（发送A请求后可以立马发送B请求，不用等A响应返回后在发送）；

      一个TCP连接现在可以传送多个回应，由于tcp是流式协议，势必就要有一种机制，区分数据包是属于哪一个回应的。这就是Content-length字段的作用，声明本次回应的数据长度。
    * 引入分块传输编码

      使用Content-Length字段的前提条件是，服务器发送回应之前，必须知道回应的数据长度。

      1.1版规定可以不使用Content-Length字段，而使用"分块传输编码"（chunked transfer
      encoding）。只要请求或回应的头信息有Transfer-Encoding字段，就表明回应将由数量未定的数据块组成。
      ```
      Transfer-Encoding: chunked
      ```
      每个非空的数据块之前，会有一个16进制的数值，表示这个块的长度。最后是一个大小为0的块，就表示本次回应的数据发送完了。

    * 新增请求方式（PUT、PATCH、OPTIONS、DELETE）
    * 新增Host头字段，指定服务器域名(同一个ip地址和端口号上可以有多个web站点， 参考nginx反向代理)
    * 支持文件断点续传，`RANGE: bytes`状态码(206)
    * 支持只发送header信息（如果服务器认为客户端有权限则发100 Continue， 否则返回401）

* Http/2.0

    * 二进制协议： http/1.1 头信息是文本，数据部分可以是文本也可以是二进制， http/2则是一个二进制协议，统称为frame。
    * 多工： 在一个TCP连接里面，服务器同时收到了A请求和B请求，于是先回应A请求，结果发现处理过程非常耗时，于是就发送A请求已经处理好的部分， 接着回应B请求，完成后，再发送A请求剩下的部分。
    * 头信息压缩： 头信息使用压缩算法后在发送，并且客户端和服务器都是生成一张头信息表，所有字段都存入表中，生成一个索引号， 以后发送只需发送索引号就行
    * 服务器推送：
    
## http restful 请求格式解析

### get (delete 同理)

请求url： `http://localhost:8080/user?name=admin&roles=1,2,3`

前端发送数据方式

```js
import axios from "axios";

// const query = "name=admin&roles=1,2,3";

// 效果同上面一行
const queryObj = {
    name: "admin",
    roles: [1, 2, 3]
}
const query = new URLSearchParams(queryObj).toString();

// 获取数据
axios.get("http://localhost:8080/user?" + query).then(res => {
  console.log(res.data);
});

// 批量删除数据
axios.delete("http://localhost:8080/user/batch?roles=1,2,3").then(res => {
    console.log(res.data);
});
```

后端接受数据方式

```java

@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping
    public User getUser(@RequestParam("name") String name, @RequestParam("roles") List<Integer> roles) {

        return new User();
    }
    
    @DeleteMapping("batch")
    public Result deleteUser(@RequestParam("roles") List<Integer> roles) {
        return new Result();
    }
}
```

### post (put 同理)

>x-www-from-urlencoded


请求url： `http://localhost:8080/user`

请求payload：`name=admin&roles=1,2,3`

前端发送数据方式

```js
import axios from "axios";

axios.post("http://localhost:8080/user", "name=admin&roles=1,2,3").then(res => {
  console.log(res.data);
});

// axios.post("http://localhost:8080/user", "name=admin&roles=1&role=2&role=3").then(res => {
//     console.log(res.data);
// });
```

后端接受数据方式

```java

@RestController
@RequestMapping("user")
public class UserController {

    @PostMapping
    public User createUser(@RequestParam("name") String name, @RequestParam("roles") List<Integer> roles) {

        return new User();
    }
    
}
```


> json

请求url： `http://localhost:8080/user`

请求payload：`{"name": "admin", "roles": [1, 2, 3]}`


前端发送数据方式

```js
import axios from "axios";
const data = {name: "admin", roles: [1, 2, 3]}
axios.post("http://localhost:8080/user", data).then(res => {
  console.log(res.data);
});

const dataList = [{name: "admin", roles: [1, 2, 3]}]
axios.post("http://localhost:8080/user/batch", dataList).then(res => {
    console.log(res.data);
});
```

后端接受数据方式

```java

@RestController
@RequestMapping("user")
public class UserController {

    @Data
    public static class UserDto {
        private String name;
        
        private List<Integer> roles;
    }
    
    @PostMapping
    public Result createUser(@RequestBody UserDto userDto) {
        
        return new Result();
    }
    
    @PostMapping("batch")
    public Result createUserBatch(@RequestBody List<UserDto> userDtoList) {
        return new Result();
    }
    
    
}
```