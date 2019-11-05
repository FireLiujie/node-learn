let fs = require('fs')

/**
 * 通过回调函数方法来解决异步问题
 */
// getExt = callback => {
//   fs.readFile('src/08_ext.json', (err, data) => {
//     callback(data)
//   })
// }

// getExt(result => {
//   console.log(result.toString())
// })
/**
 * 通过回调函数方法来解决异步问题
 */

// 通过Node的events模块来解决异步问题

/**
 * Node事件循环
 * 1. Node 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高
 * 2. Node 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
 * 3. Node 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件
 */

// 引入 events 模块
let events = require('events')
// 实例化事件对象
let EventEmitter = new events.EventEmitter()

getExt = () => {
  fs.readFile('src/08_ext.json', (err, data) => {
    // 将 data 广播出去
    EventEmitter.emit('data', data.toString())
  })
}

getExt()

// 监听 data
EventEmitter.on('data', ext => {
  console.log(ext)
})

/**
 * 在这里，EventEmitter.on 通过监听 data 的形式，获取了 getExt 内部执行结果，如此，我们就了解了Node 的 I/O 事件及 events模块
 */
