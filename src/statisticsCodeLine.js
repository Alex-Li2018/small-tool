/**
 * 统计代码行数的工具, 每个文件的,总数的
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
// 读取的目录文件
const filePath = path.resolve('../../../Yao/src');
// 结果的文件
const writeFilePath = './record.txt'

// 读取文件
readFileAndCountLine(filePath);

function readFileAndCountLine(filePath) {
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
                    // 如果是文件, 直接读取内容行数

                }
                if (stats.isDirectory()) {
                    // 如果是目录,递归
                    readFileAndCountLine(fileDir);
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