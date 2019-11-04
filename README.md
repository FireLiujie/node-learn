## 什么是 CommonJS?

CommonJS 就是为 JS 的表现来制定规范，因为 JS 没有模块系统，标准库较少、缺乏包管理工具，所以 CommonJS 应运而生，它希望 JS 可以在任何地方运行，而不只是在浏览器中，从而达到 Java、C#、PHP 这些后端语言具备开发大型应用的能力

### CommonJS 的应用？

1.服务器端 JavaScript 应用程序(Node.js)  
2.命令行工具  
3.桌面图形界面应用程序

### CommonJS 与 Node.js 的关系？

CommonJS 就是模块化的标准，Node.js 就是 CommonJS(模块化)的实现

### Node.js 中的模块化？

1.在 Node 中，模块分为两类：一是 Node 提供的模块，称为核心模块；而是用户编写的模块，称为文件模块。核心模块在 Node 源代码的编译过程中，编译成了二进制执行文件，所以它的加载速度是最快的，例如：HTTP 模块、URL 模块、FS 模块；文件模块是在运行时动态加载的，需要完整的路径分析、文件定位、编译执行过程等......所以它的速度相对核心模块来说会更慢一些。  
2.我们可以将公共的功能抽离出一个单独的 JS 文件存放，然后在需要的情况下，通过 exports 或者 module.exports 将模块导出，并通过 require 引入这些模块

### npm 基本知识

i/install:安装。使用 install 或者 它的简写 i，都表明你想要下摆这个包  
uninstall:卸载。 如果你发现这个模块你已经不使用了，那么可以通过 uninstall 卸载它  
g: 全局安装。表明这个包将安装到你的计算机中，你可以在计算机任何一个位置使用它  
--save/-S:通过这种方式安装的包的名称及版本号会出现在 package.json 中的 dependeciesz 中。dependencies 是需要发布在生产环境的。例如：ElementUI 是部署后还需要的，所以通过-S 形式来安装  
--save-dev/-D:通过该方式安装的包的名称及版本号会出现在 package.json 中的 devDenpendices 中。devDenpendcies 只在开发环境使用。例如：gulp 知识用来压缩代码、打包的工具，程序运行时并不需要，所以通过-D 形式来安装。

那么，这么多的包，我们通过什么管理呢？  
答案是 package.json  
如果我们需要创建 package.json，那么我们只需要在指定的包管理目录(例如 node_modules)中通过以下命名进行生成：  
npm init:按步骤创建 package.json  
npm init --yes：快速创建 package.json  
安装 cnpm:  
npm install -g cnpm --registry=https://registry.npm.taobao.org

### fs 文件管理

1. fs.stat 检测是文件还是目录
2. fs.mkdir 创建目录
3. fs.writeFile 创建写入文件
4. fs.appendFile 追加文件
5. fs.readFile 读取文件
6. fs.readdir 读取目录
7. fs.rename 重命名
8. fs.rmdir 删除目录
9. fs.unlink 删除文件

### 什么是 web 服务器？

web 服务器一般是指网站服务器，是指驻留于因特网上某种类型计算机的程序，可以像浏览器等 web 客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的是哪个 web 服务器是 Apache、Nginx、IIS
