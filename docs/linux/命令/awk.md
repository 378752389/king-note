---
title: awk入门
date: 2024-05-13
categories:
  - linux
tags:
  - 命令
---

awk是处理文本文件的一个应用程序；依次处理文件的每一行，并读取里面的每一个字段。

<!-- more -->

## 1. 基本语法

```bash
awk '动作' 文件名

awk '{print $1}' 1.txt
```

1.txt是 awk 所要处理的文本文件, 前面单引号内部有一个大括号，里面就是每一行的处理动作 print $0。其中，print是打印命令，$0代表当前行；

awk会根据**空格和制表符**，将每一行分成若干字段，依次用$1、$2、$3代表第一个字段、第二个字段、第三个字段等等。

```bash
echo 'this is a test' | awk '{print $3}'

a
```

当然，如果文件分隔符不是空格和制表符，比如：冒号:，那么，可以用-F指定分隔符。

```bash
echo 'this:is:a:test' | awk -F ':' '{print $3}'

a
```


## 变量

awk中提供了一些内置变量，方便对文本内容进行操作。

1. 可以使用 `$ + 数字` 表示第几个字段， $1表示第一个字段， $2 表示第二个字段，以此类推。
2. `NF` 表示当**前行**有多少个字段，`$NF` 表示最后一个字段，`$(NF-1)` 表示倒数第二个字段；
3. `NR` 表示**当前**处理的是第几行；
4. 其他常用变量：
   - `FS` 表示**输入字段分隔符**，默认为空格和制表符；
   - `RS` 表示**输入记录分隔符**，默认为换行符；
   - `OFS` 表示**输出字段分隔符**，默认为空格；
   - `ORS` 表示**输出记录分隔符**，默认为换行符。
   - `FILENAME` 表示当前输入的文件名。

## 函数

awk中内置了一些原始函数，方便对文本内容进行转换。

1. `length()` 表示字符串长度；
2. `sub(r,s,t)` 表示用字符串s替换字符串t中匹配r的部分；
3. `tolower(s)` 表示将字符串s中的所有大写字母转换为小写字母；
4. `toupper(s)` 表示将字符串s中的所有小写字母转换为大写字母；
5. `sprintf(format,expr,expr,...)` 表示按照format的格式化方式，将expr转换为字符串，并返回结果。
6. `split(s,array,sep)` 表示将字符串s按照sep分割，并将结果保存到数组array中。
7. `systime()` 表示返回当前时间的时间戳。
8. `rand()` 表示返回一个随机数。
9. `sqrt()` 表示返回一个数的平方根。

[内置函数手册传送门](https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din)


## 条件语句

awk 允许输出符合条件的行；

```bash
awk '条件 动作' 文件名

awk '$1=="a" {print $0}' 1.txt
awk -F ':' '/usr/ {print $1}' 1.txt
```

**条件语句需要写在 `{}` 外**

if 语句

```bash
awk -F ':' '{if ($1 > "m") print $1}' demo.txt
```

**if语句需要写在 `{}` 内**

打印倒数第三个字段；

```bash
awk 'NF > 3 {print NR ")", $(NF-3) }' 1.txt

awk '{if(NF > 3) print NR ") " $(NF-3); else print NR ") " "xxx"}' 1.txt
```