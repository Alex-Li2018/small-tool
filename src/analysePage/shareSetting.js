// 分享页面的管理
// 注意常量是全部大写加下划线
// 变量是大小写都有
module.exports = [
    {
        title: '首页',
        page_url: 'pages/index',
        share_url: 'pages/index',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: 'https://imgcdn.huanjutang.com/image/2020/07/30/813601ce7d9665de0155989bbe8d3899.png'
    },
    {
        title: '学区地图',
        page_url: 'pages/map/index',
        share_url: 'pages/map/index',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: 'https://imgcdn.huanjutang.com/image/2020/07/30/813601ce7d9665de0155989bbe8d3899.png'
    },
    {
        title: '家长圈',
        page_url: 'pages/parentCricle/index',
        share_url: 'pages/parentCricle/index',
        share_content: '发现一个专属家长的内容圈子，分享给你',
        image_url: ''
    },
    {
        title: '我的',
        page_url: 'pages/me/index',
        share_url: 'pages/me/index',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: 'https://imgcdn.huanjutang.com/image/2020/07/30/813601ce7d9665de0155989bbe8d3899.png'
    },
    {
        title: '随迁子女',
        page_url: 'subPackages/home/accompanyingChildren',
        share_url: 'subPackages/home/accompanyingChildren',
        share_content: '${CITY_NAME}各区随迁子女政策，速看',
        image_url: ''
    },
    {
        title: '随迁子女详情页',
        page_url: 'subPackages/home/accompanyingChildrenDetail',
        share_url: 'subPackages/home/accompanyingChildrenDetail?area_code=${params.area_code}',
        share_content: '${CITY_NAME}各区随迁子女政策，速看',
        image_url: ''
    },
    {
        title: '作者详情页',
        page_url: 'subPackages/home/authorDetail',
        share_url: 'subPackages/home/authorDetail?id=${id}',
        share_content: '学区宝作者${author.name}，立即点击查看',
        image_url: ''
    },
    {
        title: '每日播报',
        page_url: 'subPackages/home/dailyBroadcast',
        share_url: 'subPackages/home/dailyBroadcast',
        share_content: '听每日播报，最新资讯不错过~',
        image_url: ''
    },
    {
        title: '问答列表',
        page_url: 'subPackages/home/hotAnswer',
        share_url: 'subPackages/home/hotAnswer',
        share_content: '${CITY_NAME}家长都关心的入学问题',
        image_url: 'https://imgcdn.huanjutang.com/image/2021/03/15/a9e6322df2ba184758212af3064da675.png'
    },
    {
        title: '问答详情',
        page_url: 'subPackages/home/answerDeatil',
        share_url: 'subPackages/home/answerDeatil?id=${id}',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: ''
    },
    {
        title: '文章列表',
        page_url: 'subPackages/home/hotInfo',
        share_url: 'subPackages/home/hotInfo',
        share_content: '${CITY_NAME}最新的教育咨询，立即点击查看',
        image_url: ''
    },
    {
        title: '小区列表',
        page_url: 'subPackages/home/hotVillage',
        share_url: 'subPackages/home/hotVillage',
        share_content: '${CITY_NAME}最全学区房列表，分享给你',
        image_url: ''
    },
    {
        title: '机构列表',
        page_url: 'subPackages/home/trainingOrganization',
        share_url: 'subPackages/home/trainingOrganization',
        share_content: '点击进入，立刻为孩子挑选兴趣班，辅导班',
        image_url: ''
    },
    {
        title: '学校列表',
        page_url: 'subPackages/index/schoolList',
        share_url: 'subPackages/index/schoolList',
        share_content: '${CITY_NAME}最全学校列表，分享给你~',
        image_url: ''
    },
    {
        title: '经纪人入驻',
        page_url: 'subPackages/me/salesmanSettled',
        share_url: 'subPackages/me/salesmanSettled?share=1',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: ''
    },
    {
        title: '教育局电话',
        page_url: 'subPackages/me/pages/edcPhone',
        share_url: 'subPackages/me/pages/edcPhone',
        share_content: '${CITY_NAME}各区教育局电话分享给你！可直接拨打哟',
        image_url: ''
    },
    {
        title: '入驻入口',
        page_url: 'subPackages/me/pages/noticeForEntry',
        share_url: 'subPackages/me/pages/noticeForEntry?share=1',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: ''
    },
    {
        title: '老师入驻',
        page_url: 'subPackages/me/pages/teacherSettled',
        share_url: 'subPackages/me/pages/teacherSettled?share=1',
        share_content: '上学就用学区宝，家长从此没烦恼',
        image_url: ''
    },
    {
        title: '老师详情',
        page_url: 'subPackages/me/pages/teacherDetail',
        share_url: 'subPackages/me/pages/teacherDetail',
        share_content: '推荐给你：${info.institution.name}机构的${info.name}老师',
        image_url: ''
    },
    {
        title: '入学日历',
        page_url: 'subPackages/schedule/schedule',
        share_url: 'subPackages/schedule/schedule',
        share_content: '订阅这个入学日历，再也不会错过时间',
        image_url: 'https://imgcdn.huanjutang.com/image/2020/05/23/23bc191af05f79557043fe0d1850daaa.png'
    },
    {
        title: '日程详情',
        page_url: 'subPackages/schedule/scheduleDetail',
        share_url: 'subPackages/schedule/scheduleDetail?id=${id}',
        share_content: '订阅这个入学日历，再也不会错过时间',
        image_url: 'https://imgcdn.huanjutang.com/image/2020/05/23/23bc191af05f79557043fe0d1850daaa.png'
    },
    {
        title: '事件详情',
        page_url: 'subPackages/schedule/eventDetail',
        share_url: 'subPackages/schedule/eventDetail?id=${eventId}&schedule_id=${scheduleId}',
        share_content: '订阅这个入学日历，再也不会错过时间',
        image_url: 'https://imgcdn.huanjutang.com/image/2020/05/23/23bc191af05f79557043fe0d1850daaa.png'
    },
    {
        title: '发表评论',
        page_url: 'subPackages/comment/comment',
        share_url: 'subPackages/comment/comment?relation_name=${title}&relation_id=${relation_id}&relation_type=${relation_type}',
        share_content: '我在这里评价',
        image_url: ''
    },
    {
        title: '评论列表',
        page_url: 'subPackages/comment/commentList',
        share_url: 'subPackages/comment/commentList',
        share_content: '【${baseInfo.relation_name}】的评论 一起加入我们的讨论呗!',
        image_url: ''
    },
    {
        title: '小区地图',
        page_url: 'subPackages/houseDetail/houseMap',
        share_url: 'subPackages/houseDetail/houseMap?house_id=${baseInfo.house_id}&school_type=${baseInfo.school_type}&name=${baseInfo.name}&longitude=${baseInfo.longitude}&latitude=${baseInfo.latitude}',
        share_content: '快来看看，${baseInfo.name}周围的学校情况吧!',
        image_url: ''
    },
    {
        title: '对口学校',
        page_url: 'subPackages/schoolDetail/allCorrespondingMiddle',
        share_url: 'subPackages/schoolDetail/allCorrespondingMiddle',
        share_content: '学区宝-${detailData.name}',
        image_url: ''
    },
    {
        title: '幼儿园地图',
        page_url: 'subPackages/schoolDetail/kdenSchoolBigMap',
        share_url: 'subPackages/schoolDetail/kdenSchoolBigMap?school_id=${baseInfo.school_id}',
        share_content: '学区宝-${baseInfo.school_name}',
        image_url: ''
    },
    {
        title: '中学地图',
        page_url: 'subPackages/schoolDetail/middleSchoolBigMap',
        share_url: 'subPackages/schoolDetail/middleSchoolBigMap?school_id=${baseInfo.school_id}',
        share_content: '学区宝-${baseInfo.school_name}',
        image_url: ''
    },
    {
        title: '小学地图',
        page_url: 'subPackages/schoolDetail/schoolBigMap',
        share_url: 'subPackages/schoolDetail/schoolBigMap?school_id=${baseInfo.school_id}',
        share_content: '学区宝-${baseInfo.school_name}',
        image_url: ''
    },
    {
        title: '机构详情',
        page_url: 'subPackages/trainingOrganization/indexTO',
        share_url: "subPackages/trainingOrganization/indexTO?id=${id}",
        share_content: '快来看一看，这就是${detail.name}机构',
        image_url: ''
    },
    {
        title: '课程详情',
        page_url: 'subPackages/trainingOrganization/courseDetail',
        share_url: "subPackages/trainingOrganization/courseDetail?id=${courseId}",
        share_content: '限时抢购${courseDetail.name}！',
        image_url: ''
    },
    {
        title: '线上课程详情',
        page_url: 'subPackages/trainingOrganization/courseOnlineDetail',
        share_url: 'subPackages/trainingOrganization/courseOnlineDetail?id=${courseDetail.id}',
        share_content: "推荐给你这个课程：${courseDetail.name}",
        image_url: ''
    },{
        title: '小学划片/小升初划片',
        page_url: 'subPackages/home/primaryToMiddle',
        share_url: 'subPackages/home/primaryToMiddle?type=${params.category}&city_id=${params.city_id}',
        share_content: "${shareTitle}",
        image_url: ''
    }
];
