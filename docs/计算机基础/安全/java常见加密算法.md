---
title: 常见加密算法
date: 2023-07-08
categories:
  - 计算机基础
tags:
  - JavaSE
  - 加密算法
---

## 编码与解码

### URL编码

目的： 出于兼容性考虑，因为很多服务器只识别ASCII字符。

编码规则：
* 如果字符是A~Z，a~z，0~9以及-、_、.、*，则保持不变；
* 如果是其他字符，先转换为UTF-8编码，然后对每个字节以%XX表示。

### base64编码

目的： Base64编码是对二进制数据进行编码，表示成文本格式。可以把任意长度的二进制数据变为纯文本，且只包含A~Z、a~z、0~9、+、/、=这些字符。

原理：把3字节的二进制数据按6bit一组，用4个int整数表示。
因为6位整数的范围总是0-63，所以能用64个字符表示：A~Z对应0~25、a~z对应26~51，0~9对应52~61，+对应62，/对应63

如果输入的byte数组长度不是3的整数倍，需要对输入的末尾补一个或两个0x00,编码后在结尾加一个=表示补充了一个0x00,解码的时候去掉补充的0x00即可

> 变种
> 
> Base64URL编码： 把 + 变成 -， 把 / 变成 _

## 签名

|算法|    输出长度（位）|    输出长度（字节）|
|---|---|---|
|MD5|    128 |    16 |
|SHA-1|    160 |    20 |
|RipeMD-160|    160 |    20 |
| SHA-256|    256 |    32 |
| SHA-512|    512 |    64 |

> [java标准库支持的签名算法](https://docs.oracle.com/en/java/javase/14/docs/specs/security/standard-names.html#messagedigest-algorithms)

### md5

算法输出128bit位 (16字节)

用途：常用于文件内容签名，判断文件是否被篡改

```java
MessageDigest md5=MessageDigest.getInstance("md5");

//   3858f62230ac3c915f300c664312c63f
md5.update("foo".getBytes(StandardCharsets.UTF_8));
md5.update("bar".getBytes(StandardCharsets.UTF_8));

//   效果同上
//   md5.update("foobar".getBytes(StandardCharsets.UTF_8));

byte[]digest=md5.digest();
printHex(digest);
```

### sha系列

#### sha1

算法输出160bit位 (20字节)

```java
MessageDigest md5=MessageDigest.getInstance("sha-1");
md5.update("foobar".getBytes(StandardCharsets.UTF_8));
byte[]digest=md5.digest();
printHex(digest);
```

#### sha256

算法输出256bit位 (32字节)

```java
MessageDigest md5=MessageDigest.getInstance("sha-256");
md5.update("foobar".getBytes(StandardCharsets.UTF_8));
byte[]digest=md5.digest();
printHex(digest);
```

#### sha512

算法输出512位（64字节）

```java
MessageDigest md5=MessageDigest.getInstance("sha-512");
md5.update("foobar".getBytes(StandardCharsets.UTF_8));
byte[]digest=md5.digest();
printHex(digest);
```

### hmac系列

之前md5和sha存在的问题：相同的输入和产生相同的输出，黑客可以使用彩虹表进行输入破解，因此存储密码时需要加盐，加盐的目的就是使得输入有所变化； 同样的输入，不同的salt，会产生不同的输出。

hmac算法是一种基于密钥的消息认证码算法。全称： Hash-based Message Authentication Code。 其总是和某种哈希算法配合起来用的。

hmac有如下特点：

* 使用的key是512bit(64字节)
* 输出长度和原有的hash算法一致

常见的算法包括： hmacmd5、hmacsha1、hmacsha256、hmacsha512等，算法流程整体类似，以 hmacmd5为例子进行演示

#### hmacmd5

签名流程

```java
// 随机生成64字节的key
KeyGenerator kg=KeyGenerator.getInstance("hmacmd5");
SecretKey secretKey=kg.generateKey();
byte[]encoded=secretKey.getEncoded();
System.out.println(new BigInteger(1,encoded).toString(16));
System.out.println(encoded.length);

Mac mac=Mac.getInstance("hmacmd5");
mac.init(secretKey);
mac.update("foobar".getBytes(StandardCharsets.UTF_8));
byte[]bytes=mac.doFinal();
System.out.println(new BigInteger(1,bytes).toString(16));
System.out.println(bytes.length);
```

验证流程

```java
// byte[] encoded    key
// String algorithm  hmac算法  hmacmd5
// 获取之前随机生成的64字节key
SecretKey sk=new SecretKeySpec(encoded,algorithm);

Mac instance=Mac.getInstance(algorithm);
instance.init(sk);
instance.update("foobar".getBytes(StandardCharsets.UTF_8));
byte[]bytes1=instance.doFinal();
```

## 加密与解密

### 对称加密

|算法|    输出长度（位）| 块大小（位）|   工作模式| 填充模式| 
|---|---|---| ---|---|
|DES|56| 64|ECB/CBC/PCBC/CTR/...|NoPadding/PKCS5Padding/...|
|AES|    128/192/256| 128|   ECB/CBC/PCBC/CTR/...|    NoPadding/PKCS5Padding/PKCS7Padding/...|

DES算法密钥每7个bit位都将包含一个奇偶校验位。因此虽然生成的密钥长度位8byte，但其中包含一个byte的奇偶校验。由于密钥过短，可以在短时间内被暴力破解，所以现在已经不安全了。

如果需要加密的数据（明文）的字节码的长度不是块大小的整数倍，那么就需要在末尾进行填充。

* PKCS5Padding: 填充字符串由一个1~8位的字节序列组成，每个字节填充“该字节序列的长度”。 
  eg: 数据长度为9个字节，要填充7个字节 凑齐为8的整数倍,那么填入的值就是0×07,填写7个该值; 如果数据长度刚好是8的整数倍，也需要填充，填充为0x08;
* PKCS7Padding: 填充字符串可以在 1-255byte之间


#### AES/ECB/PKCS5Padding

加密流程

```java
String msg = "foobarfoobarfoobar";
byte[] key = "1234567890abcdef".getBytes(StandardCharsets.UTF_8);

Cipher instance = Cipher.getInstance("AES/ECB/PKCS5Padding");
SecretKey sk = new SecretKeySpec(key, "AES");
instance.init(Cipher.ENCRYPT_MODE, sk);

byte[] bytes = instance.doFinal(msg.getBytes(StandardCharsets.UTF_8));
printHex(bytes);
```

解密流程

```java
// byte[] bytes    加密数据

byte[] key = "1234567890abcdef".getBytes(StandardCharsets.UTF_8);
Cipher instance = Cipher.getInstance("AES/ECB/PKCS5Padding");
SecretKey sk = new SecretKeySpec(key, "AES");

instance.init(Cipher.DECRYPT_MODE, sk);
byte[] res = instance.doFinal(bytes);
System.out.println(new String(res));
```


#### AES/CBC/PKCS5Padding

CBC模式: 它需要一个随机数作为IV参数，这样对于同一份明文，每次生成的密文都不同

加密流程

```java
String msg = "foobarfoobarfoobar";
byte[] key = "1234567890abcdef".getBytes(StandardCharsets.UTF_8);

Cipher instance = Cipher.getInstance("AES/CBC/PKCS5Padding");
SecretKey sk = new SecretKeySpec(key, "AES");

SecureRandom sr = SecureRandom.getInstanceStrong();
byte[] iv = sr.generateSeed(16);
IvParameterSpec ivps = new IvParameterSpec(iv);

instance.init(Cipher.ENCRYPT_MODE, sk, iv);

byte[] bytes = instance.doFinal(msg.getBytes(StandardCharsets.UTF_8));
printHex(bytes);
```

解密流程

```java
// byte[] ivps    向量数组
// byte[] key     密钥
// byte[] data    加密数据

Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
IvParameterSpec ivps = new IvParameterSpec(iv);
cipher.init(Cipher.DECRYPT_MODE, keySpec, ivps);
byte[] bytes = cipher.doFinal(data);
printHex(bytes);
```

### 非对称加密

#### RSA

rsa 加密

```java

// 生成 公钥 和 私钥
KeyPairGenerator rsa = KeyPairGenerator.getInstance("RSA");
rsa.initialize(1024);
KeyPair keyPair = rsa.generateKeyPair();
PrivateKey sk = keyPair.getPrivate();
PublicKey pk = keyPair.getPublic();

// 用 公钥和私钥 对数据进行加密/解密
Cipher alg = Cipher.getInstance("RSA");

// 加密
alg.init(Cipher.ENCRYPT_MODE, pk);
alg.update(msg.getBytes(StandardCharsets.UTF_8));
byte[] bytes = alg.doFinal();

// 解密
alg.init(Cipher.DECRYPT_MODE, sk);
alg.update(bytes);
System.out.println(new String(alg.doFinal()));
```

恢复公钥和私钥

```java
byte[] pkData = ...
byte[] skData = ...
        
KeyFactory kf = KeyFactory.getInstance("RSA");
// 恢复公钥:
X509EncodedKeySpec pkSpec = new X509EncodedKeySpec(pkData);
PublicKey pk = kf.generatePublic(pkSpec);
// 恢复私钥:
PKCS8EncodedKeySpec skSpec = new PKCS8EncodedKeySpec(skData);
PrivateKey sk = kf.generatePrivate(skSpec);

```


数字签名算法
```java
KeyPairGenerator rsa = KeyPairGenerator.getInstance("RSA");
rsa.initialize(1024);
KeyPair keyPair = rsa.generateKeyPair();
PrivateKey sk = keyPair.getPrivate();
PublicKey pk = keyPair.getPublic();

Signature signature = Signature.getInstance("sha1withrsa");
signature.initSign(sk);
signature.update(msg.getBytes(StandardCharsets.UTF_8));
byte[] res2 = signature.sign();
```