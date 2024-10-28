(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{604:function(s,l,e){"use strict";e.r(l);var n=e(3),t=Object(n.a)({},(function(){var s=this,l=s._self._c;return l("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[l("p",[s._v("我们使用linux的时候会发现，当我们进入系统一进入 bash ，就有一堆变量可以使用，这些东西都是从哪来的呢？这就要归功于linux系统里面的配置文件了。当我们的系统启动之后，它们就会开始读取我们的配置文件让我们后续可以正常的使用。")]),s._v(" "),l("table",[l("thead",[l("tr",[l("th",[s._v("shell")]),s._v(" "),l("th",[s._v("概念")])])]),s._v(" "),l("tbody",[l("tr",[l("td",[s._v("login shell")]),s._v(" "),l("td",[s._v("取得 bash 时需要完整的登陆流程(输入用户名和密码)，就称为 login shell。")])]),s._v(" "),l("tr",[l("td",[s._v("non-login shell")]),s._v(" "),l("td",[s._v("取得 bash 时不需要重复登陆的举动。比如我们登陆 Linux 后， 启动终端Terminal，此时那个终端接口并没有需要再次的输入账号与密码，那个 bash 的环境就称为 non-login shell了。又或者你在原本的 bash 环境下再次使用 bash 这个命令，建立了一个bash子进程，同样的也没有输入账号密码， 那第二个 bash (子程序) 也是 non-login shell")])])])]),s._v(" "),l("p",[s._v("这两种shell 读取的配置文件是不一样的")]),s._v(" "),l("ul",[l("li",[s._v("对于 "),l("code",[s._v("login shell")]),s._v(", 一般来说会读取一下配置：")])]),s._v(" "),l("ol",[l("li",[l("code",[s._v("/etc/profile")]),s._v(": 系统的整体配置；")]),s._v(" "),l("li",[l("code",[s._v("~/.bash_profile")]),s._v(" 或 "),l("code",[s._v("~/.bash_login")]),s._v(" 或 "),l("code",[s._v("~/.profile")]),s._v("， 属于个人配置，多用户时，我们就可以修改这些配置文件。")])]),s._v(" "),l("div",{staticClass:"custom-block tip"},[l("p",{staticClass:"title"}),l("p",[s._v("bash 的 login shell 配置只会读取上面三个文件的其中一个， 而读取的顺序则是依照 "),l("code",[s._v("~/.bash_profile")]),s._v(" 或 "),l("code",[s._v("~/.bash_login")]),s._v(" 或 "),l("code",[s._v("~/.profile")]),s._v(" 的顺序。")])]),l("p",[l("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/linux%E4%B8%ADlogin-shell%E7%99%BB%E5%BD%95%E8%AF%BB%E5%8F%96%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E9%A1%BA%E5%BA%8F.png",alt:"linux中login-shell读取配置文件顺序"}})]),s._v(" "),l("ul",[l("li",[s._v("对于"),l("code",[s._v("non-login shell")]),s._v("则只会读取"),l("code",[s._v("~/.bashrc")]),s._v("这一个文件")])]),s._v(" "),l("p",[s._v("su 命令可以用于进行用户切换，其常用参数包含：")]),s._v(" "),l("div",{staticClass:"custom-block tip"},[l("p",{staticClass:"title"}),l("p",[s._v("-: 代表使用 login-shell 的变量文件读取方式来登陆系统; 若使用者名称没有加上去，则代表切换为 root 的身份\n-c：仅进行一次命令,登录时候可执行的命令\n-m: 使用目前的环境配置，而不读取新使用者的配置文件")])]),l("div",{staticClass:"custom-block warning"},[l("p",{staticClass:"title"}),l("p",[l("code",[s._v("su 用户名")]),s._v("， 是以"),l("code",[s._v("non-login-shell")]),s._v("切换用户进行登陆的，而"),l("code",[s._v("su - 用户名")]),s._v(" 则表示以"),l("code",[s._v("login-shell")]),s._v("切换root用户。")])]),l("p",[s._v("验证:")]),s._v(" "),l("p",[s._v("修改"),l("code",[s._v("~/.bash_profile")]),s._v(", 末尾添加如下内容：")]),s._v(" "),l("div",{staticClass:"language-shell line-numbers-mode"},[l("pre",{pre:!0,attrs:{class:"language-shell"}},[l("code",[l("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),l("span",{pre:!0,attrs:{class:"token string"}},[s._v('"~/.bash_profile"')]),s._v("\n")])]),s._v(" "),l("div",{staticClass:"line-numbers-wrapper"},[l("span",{staticClass:"line-number"},[s._v("1")]),l("br")])]),l("p",[s._v("修改 "),l("code",[s._v("~/.bashrc")]),s._v(", 末尾添加如下内容：")]),s._v(" "),l("div",{staticClass:"language-shell line-numbers-mode"},[l("pre",{pre:!0,attrs:{class:"language-shell"}},[l("code",[l("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),l("span",{pre:!0,attrs:{class:"token string"}},[s._v('"~/.bashrc"')]),s._v("\n")])]),s._v(" "),l("div",{staticClass:"line-numbers-wrapper"},[l("span",{staticClass:"line-number"},[s._v("1")]),l("br")])]),l("p",[l("code",[s._v("login shell")]),s._v("进行用户登录")]),s._v(" "),l("div",{staticClass:"language-shell line-numbers-mode"},[l("pre",{pre:!0,attrs:{class:"language-shell"}},[l("code",[l("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" root:123@192.168.1.128\n")])]),s._v(" "),l("div",{staticClass:"line-numbers-wrapper"},[l("span",{staticClass:"line-number"},[s._v("1")]),l("br")])]),l("p",[l("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/login-shell%E6%96%B9%E5%BC%8F%E8%BF%9B%E8%A1%8C%E7%99%BB%E5%BD%95.png",alt:"以login-shell方式进行登录输出"}})]),s._v(" "),l("p",[l("code",[s._v("non login shell")]),s._v("进行用户登录")]),s._v(" "),l("div",{staticClass:"language-shell line-numbers-mode"},[l("pre",{pre:!0,attrs:{class:"language-shell"}},[l("code",[l("span",{pre:!0,attrs:{class:"token function"}},[s._v("su")]),s._v(" root\n")])]),s._v(" "),l("div",{staticClass:"line-numbers-wrapper"},[l("span",{staticClass:"line-number"},[s._v("1")]),l("br")])]),l("p",[l("img",{attrs:{src:"https://raw.githubusercontent.com/378752389/image-bed/main/king-note/non-login-shell%E6%96%B9%E5%BC%8F%E8%BF%9B%E8%A1%8C%E7%99%BB%E5%BD%95.png",alt:"以non-login-shell方式进行登录输出"}})])])}),[],!1,null,null,null);l.default=t.exports}}]);