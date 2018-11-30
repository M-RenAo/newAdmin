import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = resolve => require(['@/page/login'], resolve);
const manage = resolve => require(['@/page/manage'], resolve);
const home = resolve => require(['@/page/home'], resolve);
const addApp = resolve => require(['@/page/addApp'], resolve);
const applicationList = resolve => require(['@/page/appList'], resolve);
const uploadApp = resolve => require(['@/page/uploadApp'], resolve);
const adminList = resolve => require(['@/page/adminList'], resolve);
const adminSet = resolve => require(['@/page/adminSet'], resolve);
const addAdmin = resolve => require(['@/page/addAdmin'], resolve);
const iosList = resolve => require(['@/page/iosList'], resolve);
const editApp = resolve => require(['@/page/editApp'], resolve);
const checkApp = resolve => require(['@/page/checkApp'], resolve);
const updateApp = resolve => require(['@/page/updateApp'], resolve);
const userList = resolve => require(['@/page/userList'], resolve);
const userInfo = resolve => require(['@/page/userInfo'], resolve);
const pushMessage = resolve => require(['@/page/pushMessage'], resolve);
const updatePushMessage = resolve => require(['@/page/updatePushMessage'], resolve);
const focusImg = resolve => require(['@/page/focusImg'], resolve);
const updateFocus = resolve => require(['@/page/updateFocus'], resolve);
const applicationModule = resolve => require(['@/page/applicationModule'], resolve);
const applicationTag = resolve => require(['@/page/applicationTag'], resolve);
const dig = resolve => require(['@/page/dig'], resolve);
const willUpdateApps = resolve => require(['@/page/willUpdateApps'], resolve);
// const chainWallet=resolve =>require(['@/page/chainWallet'],resolve);
const appInfo = resolve => require(['@/page/appInfo'], resolve);
const appSort = resolve => require(['@/page/appSort'], resolve);
const realName = resolve => require(['@/page/realName'], resolve);
const quizList = resolve => require(['@/page/quizList'], resolve);
const addQuiz = resolve => require(['@/page/addQuiz'], resolve);
const lottery = resolve => require(['@/page/lottery'], resolve);
const quizInfo = resolve => require(['@/page/quizInfo'], resolve);
const trumpet = resolve => require(['@/page/trumpet'], resolve);
const iaBcdChange = resolve => require(['@/page/iaBcdChange'], resolve);
const setDig = resolve => require(['@/page/setDig'], resolve);
const iaData = resolve => require(['@/page/iaData'], resolve);
const platformEarn = resolve => require(['@/page/platformEarn'], resolve);
const quizzesAccount = resolve => require(['@/page/quizzesAccount'], resolve);
const userIA = resolve => require(['@/page/userIA'], resolve);
const addDigRule = resolve => require(['@/page/addDigRule'], resolve);
const agreementList = resolve => require(['@/page/agreementList'], resolve);
const agreeInfo = resolve => require(['@/page/agreeInfo'], resolve);
const contentInfo = resolve => require(['@/page/contentInfo'], resolve);
const system = resolve => require(['@/page/system'], resolve);
const addSys = resolve => require(['@/page/addSys'], resolve);
const focusInfo = resolve => require(['@/page/focusInfo'], resolve);
const messageInfo = resolve => require(['@/page/messageInfo'], resolve);
const iosTag = resolve => require(['@/page/iosTag'], resolve);
const iosModule = resolve => require(['@/page/iosModule'], resolve);
const systemServices = resolve => require(['@/page/systemServices'], resolve);
const iosFocusImg = resolve => require(['@/page/iosFocusImg'], resolve);
const addIos = resolve => require(['@/page/addIos'], resolve);
const checkList = resolve => require(['@/page/checkList'], resolve);
const checkSubmit = resolve => require(['@/page/checkSubmit'], resolve);
const downloadList = resolve => require(['@/page/downlooadList'], resolve);
const addDownload = resolve => require(['@/page/addDownload'], resolve);
const iosDownloadList = resolve => require(['@/page/iosDownloadList'], resolve);
const updateTag = resolve => require(['@/page/updateTag'], resolve);
const blackList = resolve => require(['@/page/blackList'], resolve);
// const newList=resolve=>require(['@/page/newList'],resolve);
const iaHomeData = resolve => require(['@/page/iaHomeData'], resolve);

const comment = resolve => require(['@/page/comment'], resolve);
const activityData = resolve => require(['@/page/activityData'], resolve);
const messageManagement = resolve => require(['@/page/messageManagement'], resolve);
const editingInterface = resolve => require(['@/page/editingInterface'], resolve);
const appHomeData = resolve => require(['@/page/appHomeData'], resolve);
const userBack = resolve => require(['@/page/userBack'], resolve);
const guessing = resolve => require(['@/page/guessing'], resolve);
const guessingEdit = resolve => require(['@/page/guessingEdit'], resolve);
const guessingRecord = resolve => require(['@/page/guessingRecord'], resolve);

const dappList = resolve => require(['@/page/dappList'], resolve);
const sensitiveWords = resolve => require(['@/page/sensitiveWords'], resolve);
const deploy = resolve => require(['@/page/deploy'], resolve);
const bannerDeploy = resolve => require(['@/page/bannerDeploy'], resolve);
const startupPage = resolve => require(['@/page/startupPage'], resolve);
const appComment =resolve => require(['@/page/appComments'], resolve);
const updataStartup =resolve => require(['@/page/updataStartup'], resolve);
const popupDeploy = resolve => require(['@/page/popupDeploy'], resolve);
const addPopup = resolve => require(['@/page/addPopup'], resolve);
const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        children: [{
            path: '/',
            component: home,
            meta: ['数据概览', '首页'],
        }, {
            path: '/iaHomeData',
            component: iaHomeData,
            meta: ['数据概览', '首页'],
        }, {
            path: '/dig',
            component: dig,
            meta: ['数据概览', '挖矿'],
        }, {
            path: '/iaBcdChange',
            component: iaBcdChange,
            meta: ['资产管理', 'BCD提取'],
        }, {
            path: '/setDig',
            component: setDig,
            meta: ['资产管理', '挖矿设置'],
        }, {
            path: '/iaData',
            component: iaData,
            meta: ['资产管理', 'IA总资产账户'],
        }, {
            path: '/platformEarn',
            component: platformEarn,
            meta: ['资产管理', '平台收益账户'],
        }, {
            path: '/quizzesAccount',
            component: quizzesAccount,
            meta: ['资产管理', '竞猜账户'],
        }, {
            path: '/userIA',
            component: userIA,
            meta: ['资产管理', '用户ImAPP钱包'],
        }, {
            path: '/addDigRule',
            component: addDigRule,
            meta: ['资产管理', '变更挖矿设置'],
        }, {
            path: '/addApp',
            component: addApp,
            meta: ['应用管理', '上传应用'],
        }, {
            path: '/uploadApp',
            component: uploadApp,
            meta: ['应用管理', '上传应用'],
        }, {
            path: '/addIos',
            component: addIos,
            meta: ['应用管理', '上传应用'],
        }, {
            path: '/willUpdateApps',
            component: willUpdateApps,
            meta: ['应用管理', '更新应用'],
        }, {
            path: '/applicationList',
            component: applicationList,
            meta: ['应用管理', 'android列表'],
        }, {
            path: '/iosList',
            component: iosList,
            meta: ['应用管理', 'ios列表'],
        }, {
            path: '/appInfo',
            component: appInfo,
            meta: ['应用管理', '应用详情'],
        }, {
            path: '/applicationTag',
            component: applicationTag,
            meta: ['应用管理', 'android分类'],
        }, {
            path: '/iosTag',
            component: iosTag,
            meta: ['应用管理', 'ios分类'],
        }, {
            path: '/updateTag',
            component: updateTag,
            meta: ['应用管理', '编辑分类'],
        }, {
            path: '/applicationModule',
            component: applicationModule,
            meta: ['应用管理', '应用模块'],
        }, {
            path: '/iosModule',
            component: iosModule,
            meta: ['应用管理', '应用模块'],
        }, {
            path: '/checkList',
            component: checkList,
            meta: ['应用管理', '应用审核'],
        }, {
            path: '/checkSubmit',
            component: checkSubmit,
            meta: ['应用管理', '应用详情'],
        }, {
            path: '/adminList',
            component: adminList,
            meta: ['账号管理', '管理员列表'],
        }, {
            path: '/editApp',
            component: editApp,
            meta: ['应用管理', 'App配置'],
        }, {
            path: '/updateApp',
            component: updateApp,
            meta: ['应用管理', 'App编辑'],
        }, {
            path: '/checkApp',
            component: checkApp,
            meta: ['应用管理', 'App审核'],
        }, {
            path: '/appSort',
            component: appSort,
            meta: ['应用管理', '应用排序'],
        }, {
            path: '/downloadList',
            component: downloadList,
            meta: ['应用管理', 'android排行榜'],
        }, {
            path: '/iosDownloadList',
            component: iosDownloadList,
            meta: ['应用管理', 'ios排行榜'],
        }, {
            path: '/addDownload',
            component: addDownload,
            meta: ['应用管理', '排行榜详情'],
        }, {
            path: '/quizList',
            component: quizList,
            meta: ['自选管理', '竞猜管理'],
        }, {
            path: '/addQuiz',
            component: addQuiz,
            meta: ['自选管理', '新增竞猜'],
        }, {
            path: '/updateQuiz',
            component: addQuiz,
            meta: ['自选管理', '编辑竞猜'],
        }, {
            path: '/lottery',
            component: lottery,
            meta: ['自选管理', '开奖'],
        }, {
            path: '/quizInfo',
            component: quizInfo,
            meta: ['自选管理', '竞猜详情'],
        }, {
            path: '/agreementList',
            component: agreementList,
            meta: ['自选管理', '小协议'],
        }, {
            path: '/agreeInfo',
            component: agreeInfo,
            meta: ['自选管理', '小协议详情'],
        }, {
            path: '/contentInfo',
            component: contentInfo,
            meta: ['自选管理', '内容上链详情'],
        }, {
            path: '/userList',
            component: userList,
            meta: ['数据管理', '用户列表'],
        }, {
            path: '/realName',
            component: realName,
            meta: ['用户信息', '实名认证'],
        }, {
            path: '/userInfo',
            component: userInfo,
            meta: ['数据管理', '用户详情'],
        }, {
            path: '/adminset',
            component: adminSet,
            meta: ['设置', '修改密码'],
        }, {
            path: '/addAdmin',
            component: addAdmin,
            meta: ['账号管理', '添加管理员'],
        }, {
            path: '/pushMessage',
            component: pushMessage,
            meta: ['通用中心', '公告管理'],
        }, {
            path: '/updatePushMessage',
            component: updatePushMessage,
            meta: ['通用中心', '编辑公告'],
        }, {
            path: '/addPushMessage',
            component: updatePushMessage,
            meta: ['通用中心', '新增公告'],
        }, {
            path: '/messageInfo',
            component: messageInfo,
            meta: ['通用中心', '公告详情'],
        }, {
            path: '/trumpet',
            component: trumpet,
            meta: ['通用中心', '小号'],
        },
        // {
        //     path: '/focusImg',
        //     component: focusImg,
        //     meta: ['通用中心', 'android焦点图'],
        // }, {
        //     path: '/iosFocusImg',
        //     component: iosFocusImg,
        //     meta: ['通用中心', 'ios焦点图'],
        // },
        {
            path: '/updateFocus',
            component: updateFocus,
            meta: ['通用中心', '编辑焦点图'],
        }, {
            path: '/focusInfo',
            component: focusInfo,
            meta: ['通用中心', '焦点图详情'],
        }, {
            path: '/blackList',
            component: blackList,
            meta: ['通用中心', '黑白名单'],
        },
            // ,{
            //     path: '/newList',
            //     component: newList,
            //     meta: ['通用中心', '快讯列表'],
            // },
            //     {
            //     path: '/system',
            //     component: system,
            //     meta: ['通用中心', '系统升级'],
            // },{
            //     path: '/addSys',
            //     component: addSys,
            //     meta: ['通用中心', '新增系统升级'],
            // },
            {
                path: '/systemServices',
                component: systemServices,
                meta: ['系统服务'],
            }, {
                path: '/comment',
                component: comment,
                meta: ['通用中心', '快讯部署'],
            }, {
                path: '/activityData',
                component: activityData,
                meta: ['数据概览', '活动数据'],
            }, {
                path: '/messageManagement',
                name: "messageManagement",
                component: messageManagement,
                meta: ['通用中心', '快讯部署'],
            }, {
                path: '/editingInterface',
                name: 'EditingInterface',
                component: editingInterface,
                meta: ['快讯部署', '编辑界面'],
            }, {
                path: '/appHomeData',
                component: appHomeData,
                meta: ['数据概览', 'android数据'],
            }, {
                path: '/iosHomeData',
                component: appHomeData,
                meta: ['数据概览', 'ios数据'],
            }, {
                path: '/iaHomeData',
                component: iaHomeData,
                meta: ['数据概览', 'IA数据'],
            }, {
                path: '/userBack',
                component: userBack,
                meta: ['用户管理', '用户反馈'],
            }, {
                path: '/guessing',
                component: guessing,
                meta: ['自选管理', '竞猜管理'],
            }, {
                path: '/guessingEdit',
                name: 'guessingEdit',
                component: guessingEdit,
                meta: ['自选管理', '竞猜编辑'],
            }, {
                path: '/guessingRecord',
                name: 'guessingRecord',
                component: guessingRecord,
                meta: ['自选管理', '竞猜记录'],
            }, {
                path: '/dappList',
                component: dappList,
                meta: ['自选管理', 'dapp部署'],

            }, {
                path: '/sensitiveWords',
                component: sensitiveWords,
                meta: ['通用中心', '敏感词'],
            }, {
                path: '/deploy',
                component: deploy,
                meta: ['通用中心', '运营部署'],
            }, {
                path: '/bannerDeploy',
                name:'bannerDeploy',
                component: bannerDeploy,
                meta: ['通用中心', 'banner部署'],
            }, {
                path: '/appComment',
                name:'appComment',
                component: appComment,
                meta: ['应用管理', '应用评论'],
            },{
                path: '/startupPage',
                name:'startupPage',
                component: startupPage,
                meta: ['通用中心', '启动页部署'],
            },{
                path: '/updataStartup',
                name:'updataStartup',
                component: updataStartup,
                meta: ['通用中心', '启动页部署'],
            },{
                path: '/popupDeploy',
                name:'popupDeploy',
                component: popupDeploy,
                meta: ['通用中心', '弹窗部署'],
            },{
                path: '/addPopup',
                name:'addPopup',
                component: addPopup,
                meta: ['通用中心', '新增弹窗'],
            }
        ]
    }
]
export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',

})
