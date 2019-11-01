var http = require('http')

var tools1 = require('./03_tool-add')

// 如果Node 在当前目录没找到tool.js文件，则会去mode_modules里面去查找
var tools2 = require('03_tool-multiply')

/**
 * 通过package.json 来引用文件
 * 1.通过在jsliang-module中 npm init --yes 来生成 package.json文件
 * 2.package.json 文件中告诉了程序入口文件为 : 'main': 'tools.js'
 * 3.Node通过 require 查找jsliang-module ，发现它有个package.json
 * 4.Node执行tools.js文件
 */
var tools3 = require('jsliang-module')

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html;charset=UTF-8'
    })

    res.write('<h1 style="text-align:center">Hello NodeJS</h1>')

    // console.log(tools1.add(1, 2, 3))
    // console.log(tools2.multiply(1, 2, 3, 4))
    console.log(tools3.add(1, 2, 3))
    console.log(tools3.multiply(1, 2, 3, 4))
    /**
     * console:
     * 6
     * 6
     * 这里要记得Node运行过程中，它请求了两次，
     * http://localhost:3000/ 为一次
     * http://localhost:3000/favicon.ico 为第二次
     */

    res.end()
  })
  .listen(3000)
