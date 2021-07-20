const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const shell = require('shelljs');
const LogHorizon = require('log-horizon');
const pagesConfig = require('./pages/pagesConfig.json');
const devOptimize = require('./dev-optimize');
const { getCommandLineArgs } = require('./helper/index');

const logger = new LogHorizon();
const args = getCommandLineArgs();

// 将页面选择组装为多选框交互
async function interActiveHandler() {
    const pages = pagesConfig.pages.map(item => item.title);
    const subPackages = pagesConfig.subPackages.map(item => item.title);
    const promptList = [
        // 具体交互内容
        {
            type: 'checkbox',
            message: '选择需要构建的主包(必须选择两个):',
            name: 'pages',
            choices: pages,
            validate(val) {
                if (val.length < 2) {
                    // 主包必须要两个tab
                    return false;
                }
                return true;
            }
        }
    ];
    const subPromptList = [
        // 具体交互内容
        {
            type: 'checkbox',
            message: '选择需要构建的分包:',
            name: 'subPackages',
            choices: subPackages
        }
    ];

    const route = [],
        subRoute = [];
    const res = await inquirer.prompt(promptList);
    pagesConfig.pages.forEach(item => {
        res.pages.includes(item.title) && route.push(item.path);
    });
    const subres = await inquirer.prompt(subPromptList);
    pagesConfig.subPackages.forEach(item => {
        subres.subPackages.includes(item.title) && subRoute.push(item.path);
    });
    devOptimize({
        pages: route,
        subPackages: subRoute
    });
}

// 是否存在配置文件
function isExistProfile() {
    const filePath = path.resolve(__dirname, 'router.config.js');
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function execute () {
    const { mode, env } = args;
    const command = `cross-env NODE_ENV=${env} CITY_NAME=chengdu UNI_INPUT_DIR=./src UNI_OUTPUT_DIR=dist/mp-weixin UNI_PLATFORM=mp-weixin vue-cli-service uni-build --mode --watch ${mode === 'test' ? '--minimize' : ''}`;
    logger.success(`执行的命令: ${command}`);
    shell.exec(command);
}

async function main () {
    if (isExistProfile()) {
        // 读取配置
        const res = require(path.resolve(__dirname, '../router.config.js'));
        const route = [],
            subRoute = [];
        pagesConfig.pages.forEach(item => {
            res.pages.includes(item.path) && route.push(item.path);
        });
        pagesConfig.subPackages.forEach(item => {
            res.subPackages.includes(item.path) && subRoute.push(item.path);
        });
        devOptimize({
            pages: route,
            subPackages: subRoute
        });
        execute();
    } else {
        // 交互
        await interActiveHandler();
        execute();
    }
}

main();
