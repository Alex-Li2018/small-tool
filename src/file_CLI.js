// file CLI脚手架
const fs = require('fs');
const path = require('path');

// 其中的process.cwd()对应的是当前目录
fs.readdir(process.cwd(), function(err, files) {

    if (!files.length) {
        return 'file is empty!';
    }

    console.log('CLI is start!')
        // 让用户输入要查看的文件路径序号
    readFile(0);
    // 让用户输入自己想要读取的文件,并将内容返回
    process.stdin.on('data', (chunk) => {
        // 读取文章下面的内容
        let fileDir = path.join(__dirname, files[0]);
        let content = fs.readFileSync(fileDir, 'utf-8');
        console.log(content);
    });

    function readFile(i) {
        // 递归退出条件
        if (i == files.length) {
            console.log('files read is complete!');
            process.stdout.write('  \033[36m enter your choice  \033[39m');
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            return;
        }
        let fileUrl = __dirname + '/' + files[i]
        fs.stat(fileUrl, function(err, stats) {
            console.log('   ' + i + '  \033[36m' + files[i] + '  \033[39m');
            i++;
            readFile(i);
        })
    }
});