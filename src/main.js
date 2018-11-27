import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './global.js'
import VueClipboard from 'vue-clipboard2'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import md5 from 'js-md5';

Vue.prototype.$md5 = md5;
Vue.prototype.encryptByPublicKey = function (data) {
    var key = {
        "modulus": "93c6fb8837702ea0f1032485a584ec4dd158501da0b5d4732a7ac99ebb5fed132cefdf40a4137e056c92b0044b4d8691c56cc628e51f8740d65922741e24519b9fa843494b03bafcdeb7087d6372ab0c91906a41f46aef3f8c61bc5a541566c8a3063cf09e6f7ff60f8ae052747ddae0b49472720aa15966a9fdf1c2dcdace65",
        "publicExponent": "10001"
    };

    // 实例化js的RSA对象生成
    var rsa = new RSAKey();
    rsa.setPublic(key.modulus, key.publicExponent);
    return rsa.encrypt(data);
}

// var parse=require('apkreader')
// parse.parse('Listen.apk', function (err, info) {
//     if(err){
//         return console.error(err);
//     }
//
//     console.log(info);
// });

Vue.prototype.$ajax = axios;
// Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(VueClipboard);
Vue.use(FileSaver);
Vue.use(XLSX)
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})

router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (sessionStorage.getItem('token')) { //判断本地是否存在access_token
            next();
        } else {
            next({
                path: '/login'
            })
        }
    }
    else {
        next();
    }
    /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
    if (to.fullPath == "/login") {
        if (sessionStorage.getItem('token')) {
            next({
                path: from.fullPath
            });
        } else {
            next();
        }
    }
})
