(window.webpackJsonp=window.webpackJsonp||[]).push([[201],{660:function(a,s,t){"use strict";t.r(s);var n=t(3),e=Object(n.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"中央仓库配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#中央仓库配置"}},[a._v("#")]),a._v(" 中央仓库配置")]),a._v(" "),s("p",[a._v("找到"),s("code",[a._v("mirrors")]),a._v("标签，删除旧配置，使用如下配置：")]),a._v(" "),s("div",{staticClass:"language-xml line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("mirror")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("nexus-aliyun"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("mirrorOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("central"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("mirrorOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("Nexus aliyun"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("url")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("http://maven.aliyun.com/nexus/content/groups/public"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("url")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("</")]),a._v("mirror")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(">")])]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br")])]),s("h2",{attrs:{id:"package、install、deploy-三者之间区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#package、install、deploy-三者之间区别"}},[a._v("#")]),a._v(" package、install、deploy 三者之间区别")]),a._v(" "),s("ul",[s("li",[a._v("package命令完成了项目编译、单元测试、打包功能，但没有把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库")]),a._v(" "),s("li",[a._v("install命令完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库，但没有布署到远程maven私服仓库")]),a._v(" "),s("li",[a._v("deploy命令完成了项目编译、单元测试、打包功能，同时把打好的可执行jar包（war包或其它形式的包）布署到本地maven仓库和远程maven私服仓库")])]),a._v(" "),s("h2",{attrs:{id:"maven中snapshot和正式版本区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#maven中snapshot和正式版本区别"}},[a._v("#")]),a._v(" maven中snapshot和正式版本区别")]),a._v(" "),s("p",[a._v("如果在项目的配置文件中（pom文件）指定的版本号带有‘-SNAPSHOT’后缀时，打包出来的就是一个快照版本；")]),a._v(" "),s("p",[a._v("区别： 正式版本： 如果项目依赖某个库的正式版本， 项目构建的时候构建工具会先在本地仓库中查找是否已经有这个版本库的依赖， 如果不存在，则会去远程仓库中拉取，以后再次构建时都不会去访问远程仓库； "),s("strong",[a._v("问题是：")]),a._v("\n当依赖的某个库发布了新的版本，且版本号同名，那么我们项目将不能获取新发布的依赖，而且如果某个依赖经常发布新版本， 我们需要依赖最新的版本， 则需要不断的修改版本号；")]),a._v(" "),s("p",[a._v("snapshot版本： 如果项目依赖某个库的snapshot版本，每次构建项目时都会优先去远程仓库中查看是否有最新的snapshot.jar,如果有则下载使用，即使本地仓库已有最新版本；")]),a._v(" "),s("h2",{attrs:{id:"repository"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#repository"}},[a._v("#")]),a._v(" repository")]),a._v(" "),s("ol",[s("li",[a._v("repositories中的repository")])]),a._v(" "),s("p",[a._v("表示从什么库地址可以下载项目依赖的库文件")]),a._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[a._v("distributionManagement中的repository")])]),a._v(" "),s("p",[a._v("表示的是项目打包成库文件后要上传到什么库地址")]),a._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[a._v("pluginRepositories中的repository")])]),a._v(" "),s("p",[a._v("pluginRepositories中的repository是以pluginRepository表示的，它表示插件从什么库地址下载。")]),a._v(" "),s("h2",{attrs:{id:"javaweb打包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#javaweb打包"}},[a._v("#")]),a._v(" javaweb打包")]),a._v(" "),s("p",[a._v("war模式：将WEB工程以包的形式上传到服务器 ； war exploded模式：将WEB工程以当前文件夹的位置关系上传到服务器；")]),a._v(" "),s("p",[a._v("（1）war模式这种可以称之为是发布模式，看名字也知道，这是先打成war包，再发布；")]),a._v(" "),s("p",[a._v("（2）war exploded模式是直接把文件夹、jsp页面 、classes等等移到Tomcat 部署文件夹里面，进行加载部署。因此这种方式支持热部署，一般在开发的时候也是用这种方式。")]),a._v(" "),s("h2",{attrs:{id:"依赖范围"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#依赖范围"}},[a._v("#")]),a._v(" 依赖范围")]),a._v(" "),s("p",[a._v("maven 在编译、测试和运行项目时会使用不同的 classpath（编译classpath、测试 classpath、运行 classpath）。依赖范围就是用来控制依赖和这三种 classpath 的关系。maven\n中有以下几种依赖范围：compile：默认值，使用该依赖范围的 maven 依赖，在编译、测试和运行时都需要使用该依赖test：只对测试 classpath 有效，在编译主代码和运行项目时无法使用此类依赖。如 JUnit\n只在编译测试代码和运行测试的时候才需要此类依赖provided：已提供依赖范围。对于编译和测试 classpath 有效，但在运行时无效。如 servlet-api，编译和测试时需要该依赖，但在运行项目时，由于容器已经提供此依赖，故不需要\nmaven重复引入runtime：运行时依赖范围。对于测试和运行 classpath 有效，但在编译主代码时无效。如 JDBC 驱动实现，项目主代码的编译只需要 JDK 提供的 JDBC接口，只有在测试和运行时才需要实现 JDBC\n接口的具体实现system：系统依赖范围import：导入依赖范围 import 导入依赖管理")]),a._v(" "),s("ul",[s("li",[a._v("compile：默认值，使用该依赖范围的 maven 依赖，在编译、测试和运行时都需要使用该依赖")]),a._v(" "),s("li",[a._v("test：只对测试 classpath 有效，在编译主代码和运行项目时无法使用此类依赖。如 JUnit 只在编译测试代码和运行测试的时候才需要此类依赖")]),a._v(" "),s("li",[a._v("provided：已提供依赖范围。对于编译和测试 classpath 有效，但在运行时无效。如 servlet-api，编译和测试时需要该依赖，但在运行项目时，由于容器已经提供此依赖，故不需要 maven重复引入")]),a._v(" "),s("li",[a._v("provided：已提供依赖范围。对于编译和测试 classpath 有效，但在运行时无效。如 servlet-api，编译和测试时需要该依赖，但在运行项目时，由于容器已经提供此依赖，故不需要 maven重复引入")]),a._v(" "),s("li",[a._v("system：系统依赖范围， 导入本地jar包")]),a._v(" "),s("li",[a._v("import：导入依赖范围，只在"),s("code",[a._v("<dependencyManagement>")]),a._v("内定义的"),s("code",[a._v("<dependency>")]),a._v("中支持import这一scope。 它表示，在当前这个pom文件的"),s("code",[a._v("<dependencyManagement>")]),a._v("\n内定义的"),s("code",[a._v("<dependency>")]),a._v("会被"),s("strong",[a._v("替换")]),a._v("成一些系列的"),s("code",[a._v("<dependency>")]),a._v("。")])]),a._v(" "),s("h2",{attrs:{id:"给项目打上标签版本"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#给项目打上标签版本"}},[a._v("#")]),a._v(" 给项目打上标签版本")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 修改 maven version标签 版本号")]),a._v("\nmvn versions:set "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-DnewVersion")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"1.0.0"')]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 重新打包")]),a._v("\nmvn clean package    \n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br")])])])}),[],!1,null,null,null);s.default=e.exports}}]);