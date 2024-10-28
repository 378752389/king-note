(window.webpackJsonp=window.webpackJsonp||[]).push([[197],{656:function(t,e,s){"use strict";s.r(e);var a=s(3),n=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"使用github进行图床配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用github进行图床配置"}},[t._v("#")]),t._v(" 使用github进行图床配置")]),t._v(" "),e("blockquote",[e("p",[t._v("首先需要创建一个图床仓库，创建方式和代码仓库一样，此处省略")])]),t._v(" "),e("p",[t._v("1.点击头像，然后选择 "),e("code",[t._v("Settings")]),t._v(" 栏目，浏览到最下面，选择 "),e("code",[t._v("Developer settings")]),t._v("， 选择 "),e("code",[t._v("Personal access tokens")]),t._v(", 然后点击 "),e("code",[t._v("Generate new token")]),t._v("按钮。")]),t._v(" "),e("p",[e("code",[t._v("Note")]),t._v(" 填写该token的名称，便于记忆，"),e("code",[t._v("scope")]),t._v(" 处选择 "),e("code",[t._v("repo")]),t._v(" 权限，其他默认配置就行，然后点击 "),e("code",[t._v("Generate token")]),t._v(" 按钮生成token， token只在第一次生成的时候会显示，\n后面在访问将无法查看，因此需要妥善的保管好token， 否则需要重新生成新的token。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/github-generate-aceess-token.jpg",alt:"github生成个人token页面配置"}})]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/github-token-generate-result.jpg",alt:"个人token生成结果页面"}})]),t._v(" "),e("p",[t._v("2.打开"),e("code",[t._v("PicGo")]),t._v("图床软件，然后在 "),e("code",[t._v("图床配置")]),t._v("中选择"),e("code",[t._v("github")]),t._v("，此处需要填写一些相关配置。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/picgo-imagebed-config.jpg",alt:"PicGo中github图床配置"}})]),t._v(" "),e("ul",[e("li",[t._v("仓库名称：对应你创建的图床仓库的名称空间")]),t._v(" "),e("li",[t._v("分支名：指定当前仓库的分支，一般新建的仓库都是main分支")]),t._v(" "),e("li",[t._v("token：第一步中生成token，填写到此处即可")]),t._v(" "),e("li",[t._v("存储路径：仓库中图片存储到哪个文件目录")])]),t._v(" "),e("h2",{attrs:{id:"安装问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装问题"}},[t._v("#")]),t._v(" 安装问题")]),t._v(" "),e("p",[t._v("mac系统下安装 "),e("code",[t._v("picgo")]),t._v(" 会出现文件已经损坏问题，此时需要执行一下命令")]),t._v(" "),e("div",{staticClass:"language-shell line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-shell"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" spctl --master-disable\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" xattr "),e("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-d")]),t._v(" com.apple.quarantine "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/Applications/PicGo.app"')]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" spctl --master-enable\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("p",[t._v("显示文件损坏原因：")]),t._v(" "),e("p",[t._v("由于macOS的安全设置所致。为了保护用户不受恶意软件的攻击，macOS会阻止安装未经过苹果认证的应用程序。")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"title"}),e("ol",[e("li",[e("code",[t._v("sudo spctl --master-disable")]),t._v("和"),e("code",[t._v("sudo spctl --master-enable")]),t._v("用于关闭和开启macos的安全限制。")]),t._v(" "),e("li",[t._v('在Mac系统中，当你下载并安装应用程序时，操作系统会自动为该应用程序添加一个 "quarantine" 属性。\n这个属性可以帮助保护你的系统免受潜在的安全威胁。然而，在某些情况下，这个属性可能会干扰应用程序的正常运行，因此需要将其删除。')])])])])}),[],!1,null,null,null);e.default=n.exports}}]);