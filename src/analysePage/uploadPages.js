// 上传页面的路径
const axios = require('../../node_modules/axios');

// axios的请求
axios.defaults.baseURL = 'https://staging-xqb-admin-api.huanjutang.com/api/v3/';
axios.defaults.headers.Authorization = 'Bearer f8446c8c80f2554fed25e65de4f2104c';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const sharePagesCreate = data => axios.post('share-pages', data);

module.exports = {
    sharePagesCreate
}
