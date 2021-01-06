// 压缩图片
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const {
  createReadStream,
  createWriteStream
} = require('fs');

const gzip = createGzip();
const source = createReadStream('./1.jpg');
const destination = createWriteStream('./1.jpg.gz');

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('发生错误:', err);
    process.exitCode = 1;
  }
});