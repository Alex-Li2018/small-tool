// 上传页面的路径
const axios = require('../../node_modules/axios');

// axios的请求
// axios.defaults.baseURL = 'https://staging-xqb-admin-api.huanjutang.com/api/v3/';
axios.defaults.baseURL = 'https://xqb-admin-api.huanjutang.com/api/v3/';
axios.defaults.headers.Authorization = 'Bearer 24af18f02e0171d00ed6db13b33b53f9';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const sharePagesCreate = data => axios.post('share-pages', data);

module.exports = {
    sharePagesCreate
}
