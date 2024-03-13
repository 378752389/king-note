---
title: PicGo
date: 2024-03-13
sidebar: false
categories:
  - 工具软件
tags:
  - 截图软件
---

## 使用github进行图床配置

> 首先需要创建一个图床仓库，创建方式和代码仓库一样，此处省略

1.点击头像，然后选择 `Settings` 栏目，浏览到最下面，选择 `Developer settings`， 选择 `Personal access tokens`, 然后点击 `Generate new token`按钮。

`Note` 填写该token的名称，便于记忆，`scope` 处选择 `repo` 权限，其他默认配置就行，然后点击 `Generate token` 按钮生成token， token只在第一次生成的时候会显示，
后面在访问将无法查看，因此需要妥善的保管好token， 否则需要重新生成新的token。

![github生成个人token页面配置](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/github-generate-aceess-token.jpg)

![个人token生成结果页面](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/github-token-generate-result.jpg)

2.打开`PicGo`图床软件，然后在 `图床配置`中选择`github`，此处需要填写一些相关配置。

![PicGo中github图床配置](https://raw.githubusercontent.com/378752389/image-bed/main/king-note/picgo-imagebed-config.jpg)

- 仓库名称：对应你创建的图床仓库的名称空间
- 分支名：指定当前仓库的分支，一般新建的仓库都是main分支
- token：第一步中生成token，填写到此处即可
- 存储路径：仓库中图片存储到哪个文件目录




## 安装问题

mac系统下安装 `picgo` 会出现文件已经损坏问题，此时需要执行一下命令

```shell
sudo spctl --master-disable
sudo xattr -d com.apple.quarantine "/Applications/PicGo.app"
sudo spctl --master-enable
```

显示文件损坏原因：

由于macOS的安全设置所致。为了保护用户不受恶意软件的攻击，macOS会阻止安装未经过苹果认证的应用程序。

:::tip
1. `sudo spctl --master-disable`和`sudo spctl --master-enable`用于关闭和开启macos的安全限制。
2. 在Mac系统中，当你下载并安装应用程序时，操作系统会自动为该应用程序添加一个 "quarantine" 属性。
这个属性可以帮助保护你的系统免受潜在的安全威胁。然而，在某些情况下，这个属性可能会干扰应用程序的正常运行，因此需要将其删除。
:::