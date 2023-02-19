#### shell

```shell
$0：Shell 的命令本身
$1 到 $9：表示 Shell 的第几个参数
$? ：显示最后命令的执行情况
$#：传递到脚本的参数个数
$$：脚本运行的当前进程 ID 号
$*：以一个单字符串显示所有向脚本传递的参数
$!：后台运行的最后一个进程的 ID 号


#while 死循环
while :
do...done

while [ $var -lt 5 ];
do...done

if
组合测试条件： -a: and -o: or  !:  非
整数比较：-eq -ne -gt -lt -ge -le
字符串比较: == != > <
文件测试: 
-z string 测试指定字符是否为空，空着真，非空为假
-n string 测试指定字符串是否为不空，空为假 非空为真
-e FILE 测试文件是否存在
-f | -d file 测试文件是否为普通文件/目录文件
-r | -w | -x file 测试文件对当前用户是否 可读|可写|可执行


if [ $var -lt 5 ]; then
...
else
...
fi

test -f a.txt 
echo $?  # 0为真,非0为假

#函数定义
start() {
	...
}

#函数调用
start

#case 用法
case "$!" in
"a")
	m1;;
"b")
	m2;;
*)
	m3;;
esac
exit 0
```

