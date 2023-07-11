---
title: git
permalink: /java/devkits/git
---

## 仓库初始化

```shell
git init 
git config --global user.name wenjin
git config --global user.email 378752389@qq.com
git commit -m "first commit"
git remote add origin git@github.com:378752389/gitaction-test.git
git pull origin main --allow-unrelated-histories
git push -u origin main


# 重置代理
git config --global --unset http.proxy
# 配置代理
git config --global http.proxy 127.0.0.1:10082
```



## 配置git私钥

```shell
git config --global user.name “输入你的用户名”
git config --global user.email “输入你的邮箱”

# 默认的生成路径如下：     C:\Users\wenking/.ssh/id_rsa.pub    将其复制到 github/settings 私钥管理选项中
# -f "生成路径"
ssh-keygen -t rsa -C "邮箱名称"     
```



## git常用命令

```shell
# 创建一个新的分支
git checkout -b dev                    (创建并切换)
git branch dev                         （创建）

# 查看现有分支
git branch

# 切换到现有分支
git checkout main

# 删除现有分支    -D 强制删除
git branch -d dev   

# 分支提交流程
git checkout -b dev

# add something content

git add .
git commit -m "description"
git push origin dev:dev

# 如果提交的分支不是在同一台电脑上
git checkout -b dev origin/dev
# ----------------------------
git checkout master
git pull origin master
git merge dev
git commit -m "合并dev 分支"
git push origin master


# 工作区暂存
git stash 
git stash save "comment"  
# 工作区恢复
git stash pop 
git stash apply stash@{0}    git stash drop
# 查看暂存区
git stash list



git reset --hard sw122
# 保留工作区 和 暂存区
git reset --soft s23qa
# 保留工作区，清空暂存区， 之前在暂存区的内容和到当前版本之后 所有新增文件 会放到工作区中
git reset  === git reset --mixed  

git reset --hard 09d9170c8
```



## gitaction

```yaml
name: wenking CI/CD/DEV

on:
  push:
    branches:
      - dev

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master
        with:
          ref: dev
      - uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Build java jar
        run: |
          mvn clean package
      - name: scp file to server
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          port: 22
          source: "target/gitaction-test-0.0.1-SNAPSHOT.jar"
          target: "/root"
      - name: Distribution and Backup
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          password: ${{ secrets.SERVER_PASSWORD }}
          port: 22
          script: |
            for i in `ps -ef | grep "gitaction-test-0.0.1-SNAPSHOT.jar" | grep -v "grep" | awk '{print $2}'`;
            do
              kill -9 $i
            done

            cd /root
            mkdir -p /root/gitaction
            if [ -f "/root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar.bak" ];then
              rm -rf /root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar.bak
            fi

            if [ -f "/root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar" ];then
              mv /root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar /root/gitaction/gitaction-test-0.0.1-SNAPSHOT.jar.bak
            fi

            mv /root/gitaction-test-0.0.1-SNAPSHOT.jar /root/gitaction/
            nohup java -jar gitaction-test-0.0.1-SNAPSHOT.jar > /root/gitaction/gitaction.log 2>&1 &

```



