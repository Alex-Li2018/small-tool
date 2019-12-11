/**
 * 读取工程目录中所有文件是否有console.log的字段
 */
const fs = require('fs');
const path = require('path');
// 读取的目录文件
const filePath = path.resolve('../../../Yao/src');
// 结果的文件
const writeFilePath = './record.txt'

// 读取文件
readFile(filePath);

function readFile(filePath) {
    fs.readdir(filePath, (err, files) => {
        // 其中files是文件名称的数组
        if (err) {
            throw err;
        }

        // 如果有文件路径信息,需要判断文件是文件还是文件夹
        files.forEach(fileName => {
            let fileDir = path.join(filePath, fileName);
            fs.stat(fileDir, (err, stats) => {
                if (err) {
                    throw err;
                }
                if (stats.isFile()) {
                    // 如果是文件, 直接读取内容
                    let content = fs.readFileSync(fileDir, 'utf-8')
                    const regex = /console.log/g;
                    // 如果有console.log将内容记录下来,生成txt文件
                    console.log(fileDir, regex.test(content));
                    if (regex.test(content)) {
                        record(fileDir);
                    }
                }

                if (stats.isDirectory()) {
                    // 如果是目录,递归
                    readFile(fileDir);
                }
            });
        });
    });
}

// 记录文件
function record(filePath) {
    const content = `文件路径：${filePath}\n`
        // 将内容改为二进制再加入文件中
    const data = new Uint8Array(Buffer.from(content));
    fs.appendFile(writeFilePath, data, (err) => {
        if (err) throw err;
    });
}