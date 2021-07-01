// 获取线上的配置
const http = require('./uploadPages');
const path = require('path');
const fs = require('fs');

http.getPagesShare().then(res => {
    console.log(res);
    let str = '';
    res.data.data.forEach(item => {
        const obj = {
            share_content: item.description,
            page_url: item.path,
            share_url: item.redirect_url,
            image_url: item.thumb,
            title: item.title
        };
        str += JSON.stringify(obj,null,"\t");
        str += ',';
    });

    fs.writeFile(path.resolve(__dirname, 'shareOnline.json'),str,function(err){
        if (err) {
            console.log(err);
        }
    })
}).catch(err => {
    console.log(err);
});