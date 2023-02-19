### 

### centos三方包下载解决方案

1. 首先搜索软件源是否存在安装包

   ```shell
   yum search vim 
   ```

   

2. 去网站搜索需要下载的软件：https://centos.pkgs.org

3. 点击详情页后往下拉， 在下载列表中选中 binary文件的连接

   ```shell
   wget binary文件的连接
   ```

4. 安装rpm文件

   ```shell
   rpm -ivh ...rpm
   ```

​	上面3步操作等同于`yum install 包`



### centos包查询

```shell
rpm -qa | grep ...
```



### centos删除软件

```shell
rpm remove ...
```

