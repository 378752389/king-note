---
title: PicGo
date: 2023-08-06
sidebar: false
categories:
  - 工具软件
tags:
  - 截图软件
---

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