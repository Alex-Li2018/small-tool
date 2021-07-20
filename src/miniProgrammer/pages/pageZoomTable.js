// 小程序页面速查表
const fs = require('fs');
const path = require('path');
const pagesObj = require('../../src/pages.json');

const pageOrigin = [];
let pageOriginStr = '';

function diffPages(pageOrigin) {
    const currentPages = getCurrentPages();
    pageOrigin.forEach(item => {
        currentPages.forEach(page => {
            if (item.path === page.path) {
                page.title = item.title;
            }
        });
    });
    // 筛选出没有页面title的内容
    const noTitlePage = currentPages.filter(item => item.title === '');
    return noTitlePage;
}

// 添加新的页面
function addNewPagesMap(noTitlePage) {
    // 写csv页面映射文件
    let noTitlePageStr = '';
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
    const { subPackages } = pagesObj;

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
            if (Object.prototype.toString.call(arrArgs[i]) === '[object Array]') {
                flatArr(arrArgs[i]);
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

fs.readFile(path.resolve(__dirname, 'pathMap.csv'), 'utf-8', (err, data) => {
    if (err) throw err;
    pageOriginStr = data;
    data = data.replace(/\x0d\x0a/g, ';');
    const arr = data.split(';');
    arr.forEach(item => {
        pageOrigin.push({
            path: item.split(',')[0],
            title: item.split(',')[1]
        });
    });
    const newPages = diffPages(pageOrigin);
    newPages.length && addNewPagesMap(newPages);
});
