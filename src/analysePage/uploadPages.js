// 上传页面的路径
const axios = require('../../node_modules/axios');

// axios的请求
// 线上
axios.defaults.baseURL = 'https://xqb-admin-api.huanjutang.com/api/v3/';
axios.defaults.headers.Authorization = 'Bearer e19db16567830a8584b3ff3ba7a8d458';
// 线下
// axios.defaults.baseURL = 'https://staging-xqb-admin-api.huanjutang.com/api/v3/';
// axios.defaults.headers.Authorization = 'Bearer 85cccaba0e660b2e61d7cd1674771cb9';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const sharePagesCreate = data => axios.post('share-pages', data);
const getPagesShare = () => axios.get('share-pages?city_id=510100&page=1&page_size=1000')

module.exports = {
    sharePagesCreate,
    getPagesShare
}
