let fs = require('fs')
// 1. fs.stat
fs.stat('src/index.js', (error, stats) => {
  if (error) {
    console.log(error)
    return false
  } else {
    console.log(stats)
    /**
     Stats {
        dev: 16777220,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 1872614,
        size: 45,
        blocks: 8,
        atimeMs: 1572831916964.1128,
        mtimeMs: 1572831916964.4893,
        ctimeMs: 1572831916964.4893,
        birthtimeMs: 1572831605378.7544,
        atime: 2019-11-04T01:45:16.964Z,
        mtime: 2019-11-04T01:45:16.964Z,
        ctime: 2019-11-04T01:45:16.964Z,
        birthtime: 2019-11-04T01:40:05.379Z
        }
     */
    console.log(`文件：${stats.isFile()}`)
    // 文件: true
    console.log(`目录：${stats.isDirectory()}`)
    // 目录：false
    return false
  }
})

// 2. fs.mkdir 创建
/**
 * path - 将创建的目录路径
 * mode - 目录权限（读写权限），默认0777
 * callback - 回调，传递异常参数 err
 */

fs.mkdir('src/css', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('创建目录成功！')
  }
})

// 8. fs.rmdir 删除

fs.rmdir('css', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('删除目录成功！')
  }
})

// 3. fs.writeFile 覆盖写入
/**
 * filename(String)文件名称
 * data(String|Buffer)将要写入的内容，可以是字符串或者buffer数据
 *  encoding(String)可选。默认'utf-8',当data是buffer时，该值应该为ignored
 *  mode(Number)文件读写权限，默认 438
 *  flag(String)默认值'w'
 * callback{Function} 回调，传递一个异常参数 err
 */

fs.writeFile('src/index.js', 'console.log("111")', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('写入成功！')
  }
})
/**
 * 值得注意的是，这样的写入，是清空原文件中的所有数据，然后添加Hello jslinag这句话。
 * 即：存在即覆盖，不存在即创建
 */

// 4. fs.appendFile 追加
fs.appendFile('src/index.js', '这段文本是要追加的内容', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('追加成功！')
  }
})

// 5. fs.readFile 读取文件
fs.readFile('src/index.js', (err, data) => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('读取文件成功！')
    console.log(data)
  }
})

// 6. fs.readdir 读取目录
fs.readdir('src/node_modules', (err, data) => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('读取目录成功')
    console.log(data)
  }
})

// 7. fs.rename 重命名
fs.rename('src/index.js', 'src/jsliang.js', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('重命名成功')
  }
})

fs.rename('src/jsliang.js', 'src/node_modules/index.js', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('剪切成功')
  }
})
