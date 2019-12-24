// 一个典型的输入输出脚手架
process.stdin.setEncoding('utf8');

process.stdout.write('请输入图片的地址: \033[39m ');
process.stdin.on('readable', () => {
  let chunk;
  // 使用循环确保我们读取所有的可用数据。
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`数据: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('结束');
});