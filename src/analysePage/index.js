// 小程序页面速查表
const fs = require('fs');
const path = require('path');
const pagesObj = require('./pages.json');
const http = require('./uploadPages');
const shareSetting = require('./shareSetting');

let firstLoad = true; // 是否是第一次导入
let pageOrigin = [];
let pageOriginStr = '';

fs.readFile(path.resolve(__dirname, 'pathMap.csv'), 'utf-8', (err, data) => {
    if (err) throw err;
    pageOriginStr = data;
    data = data.replace(/\x0d\x0a/g, ';');
    const arr = data.split(';');
    arr.forEach(item => {
        pageOrigin.push({
            path: item.split(',')[0],
            title: item.split(',')[1]
        })
    });
    const newPages = diffPages(pageOrigin);

    if (firstLoad) {
        writeAPI(pageOrigin)
    } else {
        newPages.length && addNewPagesMap(newPages);
    }
});

function diffPages(pageOrigin) {
    console.log(pageOrigin);
    const currentPages = getCurrentPages();
    pageOrigin.forEach(item => {
        currentPages.forEach(page => {
            if (item.path === page.path) {
                page.title = item.title;
            }
        })
    });
    // 筛选出没有页面title的内容
    const noTitlePage = currentPages.filter(item => item.title === '');
    return noTitlePage;
}

// 添加新的页面
function addNewPagesMap(noTitlePage) {
    // 写csv页面映射文件
    let noTitlePageStr = ''
    noTitlePage.forEach(item => {
        noTitlePageStr += `${item.path},${item.title || '请补充页面路径'}\r\n`;
    });
    // 有才写
    if (noTitlePage) {
        writeFile(path.resolve(__dirname, 'pathMap.csv'), pageOriginStr + noTitlePageStr);
    }
}

// 当前页面的集合
function getCurrentPages() {
     // 主包
     const page = pagesObj.pages;
     // 分包
     const subPackages = pagesObj.subPackages;
 
     const pagesArr = page.map((item, index) => ({
         id: index,
         path: item.path,
         title: '',
     }));
 
     const subPackagesArr = subPackages.map(subItem => {
         const arr = subItem.pages.map((item, index) => ({
            id: index,
            path: `${subItem.root}/${item.path}`,
            title: '',
         }));
         return arr;
     });
 
     // 数组拍平
     const arr = [];
     function flatArr(arrArgs) {
         for (let i = 0; i < arrArgs.length; i++) {
             if (Object.prototype.toString.call(arrArgs[i]) === "[object Array]") {
                 flatArr(arrArgs[i])
             } else {
                 arr.push(arrArgs[i]);
             }
         }
     }
     flatArr(subPackagesArr);
 
     const pages = [...pagesArr, ...arr];
     pages.forEach((item, index) => {
         item.id = index;
     });

     return pages;
}

// 写文件
function writeFile(pathUrl, str) {
    fs.writeFile(pathUrl, str, { encoding: 'utf8' }, err => {
        if (err) throw err;
        console.log('请去补充页面名称');
    });
}

// 写入到数据库
function writeAPI(newPages) {
    const apiArr = [];
    newPages.forEach(item => {
        apiArr.push({
            entity_id: 0,
            entity_type: 0,
            title: item.title,
            path: item.path,
            redirect_url: '',
            thumb: '',
            description: '',
            status: 0
        });
    })

    apiArr.forEach(item => {
        const share = shareSetting.filter(it => item.path === it.page_url);
        if (shareSetting.filter(it => item.path === it.page_url).length) {
            item.redirect_url = share[0].share_url;
            item.thumb = share[0].image_url;
            item.description = share[0].share_content;
            item.status = 1;
        }
    });
    for (let i = 0; i < apiArr.length; i++) {
        http.sharePagesCreate(apiArr[i]).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err, apiArr[i]);
        });
    }
    
}