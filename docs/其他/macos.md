---
title: macos
date: 2023-07-08
categories:
  - 其他
tags:
  - macos
---

## homebrew

### 介绍：

homebrew是Mac OS X上的强大的包管理工具，可以高效管理各种软件包，使用 Homebrew 不用去了解在哪里下载安装包，不用思考到底安装在电脑哪个位置。

Homebrew Cask 是 Homebrew 附带的、用来安装和管理 GUI 应用软件的工具，也就是通常有一个窗口、一些按钮的这样的应用。

homebrew按照安装的软件类型进行分类：
1 终端使用的软件： wget、curl
2 编程使用的软件依赖环境： jdk、mysql
3 带有GUI的软件： chrome、jetbrains

对于1、2类软件，可以通过 `brew install app_name` 进行安装，
对于3类软件，需要cask进行辅助安装，安装命令为： `brew install --cask app_name`

### 常用命令

```shell
brew install              安装软件
brew update               自动升级homebrew（从github下载最新版本）
brew outdated             检测已经过时的软件
brew upgrade              升级所有已过时的软件，即列出的以过时软件
brew upgrade <formula>    升级指定的软件
brew pin <formula>        禁止指定软件升级
brew unpin <formula>      解锁禁止升级
brew upgrade --all        升级所有的软件包，包括未清理干净的旧版本的包
brew cleanup -n           列出需要清理的内容
brew cleanup <formula>    清理指定的软件过时包
brew cleanup              清理所有的过时软件
brew uninstall <formula>    卸载指定软件
brew uninstall <fromula> --force 彻底卸载指定软件，包括旧版本
brew list                 显示所有的已安装的软件
brew search text          搜索本地远程仓库的软件，已安装会显示绿色的勾
brew search /text/        使用正则表达式搜软件
```
