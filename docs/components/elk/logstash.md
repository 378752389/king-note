```shell
# -e 指定 配置   -f 从文件中 获取配置
bin/logstash -e 'input{stdin{}}output{stdout{codec=>rubydebug}}'
```





### 数据处理流程

`input | decode | filter | encode | output`



### 文件配置

注意点：

* `*FileWatch*` 只支持文件的**绝对路径**，而且会不自动递归目录。使用用数组方式都写明具体哪些文件。
* 文件路径 `path => "/path/to/%{+yyyy/MM/dd/hh}.log"`写法，只能写成`/path/to/**/*.log`，用 `**` 来缩写表示递归全部子目录。
* 

```
input {
    file {
        path => ["/var/log/*.log", "/var/log/message"]
        type => "system"
        start_position => "beginning"
    }
}

output {
	stdout {
	
	}
}
```





### 其他配置

>参考： [file · ELKstack 中文指南 (elasticsearch.cn)](https://elkguide.elasticsearch.cn/logstash/plugins/input/file.html)