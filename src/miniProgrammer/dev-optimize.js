/*
鉴于日常开发中小程序的整个构建会导致构建编译极慢，严重影响团队的开发效率和开发节奏，以及开发心情，恶性循环、新人劝退，开发体验的提升务必、急切、迫切解决
【功在当代，利在千秋】
该脚本提供以下能力
1.根据自动生成原有 pages.json 的备份文件
2.根据配置文件，自动留存对应path的内容，并替换原来的pages.json
恢复该文件的话，直接通过vscode的撤销变更恢复即可；

需要考虑的情况：
1.多次执行该文件，如果有备份文件则不会再复制
2.备份文件有、无两种情况
3.备份路由永远都是最新的，因此只需要在本地保留一份即可
4.如果出现问题，只需要将pages.json文件通过vscode撤回更新即可
5.出现意外情况可以手动解决
有任何其他疑问找

使用方式
0.第一次需要首先执行一遍 npm run start
1.在 optimize/keepRoutes.js 修改想要保留的路由
2.然后执行 npm run start
3.最后 node dev-optimize.js -recover 即可恢复原来的路由
*/

const fs = require('fs');
const path = require('path');
const LogHorizon = require('log-horizon');

const args = process.argv.slice(2);
const logger = new LogHorizon();
const OPTIMIZE_DIR_NAME = 'optimize';// 和gitignore对应

const realRouterPath = path.resolve(__dirname, '../src/pages.json');
const backupRouterPath = path.resolve(__dirname, `${OPTIMIZE_DIR_NAME}/pages.json`);

// 下面声明全局变量-函数
function isDir (filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
}

function isFile (filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}
function getFileContent (filePath) {
    if (isFile(filePath)) {
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return content;
    }
    return '';
}

function revertFile (copyedRoutePath, originPath) {
    if (isFile(copyedRoutePath)) {
        const realRouterContent = getFileContent(copyedRoutePath);
        if (isFile(originPath)) {
            fs.writeFileSync(originPath, realRouterContent);
        }
    }
}

function copyFile (destPath, originPath) {
    const copedContent = getFileContent(originPath);
    const optimizeDir = path.resolve(__dirname, OPTIMIZE_DIR_NAME);
    if (!isDir(optimizeDir)) {
        fs.mkdirSync(optimizeDir);
    }
    if (!isFile(destPath)) {
        fs.writeFileSync(destPath, copedContent);
        logger.success('拷贝pages.json完成');
    }
}

function handlerPages(destPages, originTabBar, originPages) {
    // 处理pages
    const pages = originPages.filter(item => destPages.includes(item.path));
    const tabBar = originTabBar.list.filter(item => destPages.includes(item.pagePath));

    return {
        pages,
        tabBar: {
            ...originTabBar,
            ...{ list: tabBar }
        }
    };
}

function handlerSubPackages(destSubPages, originSubPages) {
    return originSubPages.filter(item => destSubPages.includes(item.root));
}

function rewriteNewPagesJson(routes) {
    const res = getFileContent(backupRouterPath);
    const origin = JSON.parse(res);
    const { pages, subPackages, tabBar } = JSON.parse(res);
    // 处理主包
    const p = handlerPages(routes.pages, tabBar, pages);
    const sub = handlerSubPackages(routes.subPackages, subPackages);
    // 组装新的pages.json
    const newPages = {
        ...origin,
        ...{ pages: p.pages },
        ...{ subPackages: sub },
        ...{ tabBar: p.tabBar }
    };

    fs.writeFileSync(realRouterPath, JSON.stringify(newPages), 'utf-8');
    logger.success('重写pages.json完成');
}

/*
从 optimize 中的 router.config.json 中筛选出要构建的路由
*/
function devOptimize (routes) {
    // 1. 先拷贝原路由
    if (!isFile(backupRouterPath)) {
        copyFile(backupRouterPath, realRouterPath);
    }
    // 2. 读配置生成新的pages.json
    rewriteNewPagesJson(routes);
}

if (args.length && args[0] === '-recover') {
    revertFile(backupRouterPath, realRouterPath);
}

module.exports = devOptimize;
