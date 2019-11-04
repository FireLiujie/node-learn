/**
 * 1. fs.stat 检测是文件还是目录
 * 2. fs.mkdir 创建目录
 * 3. fs.writeile 创建写入文件
 * 4. fs.appendFile 追加文件
 * 5. fs.readFile 读取文件
 * 6. fs.readdir 读取目录
 * 7. fs.rename 重命名
 * 8. fs.rmdir 删除目录
 * 9. fs.unlink 删除文件
 */

// 1.判断服务器上有没有upload 目录，没有就创建这个目录
// 2.找出 html 目录下面的所有的目录，然后打印出来

let fs = require('fs')
// 图片上传
fs.stat('src/upload', (err, stats) => {
  // 判断有没有upload 目录
  if (err) {
    fs.mkdir('src/upload', error => {
      if (error) {
        console.log(error)
        return false
      } else {
        console.log('创建upload目录成功！')
      }
    })
  } else {
    // 如果有
    console.log(stats.isDirectory())
    console.log('有upload目录，你可以做更多操作！')
  }
})

// 读取目录全部文件
fs.readdir('src/node_modules', (err, files) => {
  if (err) {
    console.log(err)
    return false
  } else {
    // 判断是目录还是文件夹
    console.log('`````````')
    console.log(files)
    let filesArr = []
    ;(function getFile(i) {
      // 循环结束
      if (i == files.length) {
        // 打印出所有目录
        console.log('目录：')
        console.log(filesArr)
        return false
      }
      // 判断目录是文件还是文件夹
      fs.stat('src/node_modules/' + files[i], (error, stats) => {
        if (error) {
          console.log(error)
          return false
        } else {
          if (stats.isDirectory()) {
            filesArr.push(files[i])
          }
          // 递归调用
          getFile(i + 1)
        }
      })
    })(0)
    console.log('````filesArr````')
    console.log(filesArr)
  }
})
