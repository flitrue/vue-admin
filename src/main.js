/**
 * Created by 王平平 on 2017/3/23.
 *
 * 主程序入口
 *
 * @author: 王平平
 * @github: https://github.com/zzmhot
 * @email: 812863096@qq.com
 * @Date: 2017/3/23 18:19
 * @Copyright(©) 2017 by 王平平.
 *
 */

//导入样式
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/scss/font-awesome.scss'
//导入Vue框架
import Vue from 'vue'
//导入组件
import router from './router'
import VueResource from 'vue-resource'
import NProgress from 'vue-nprogress'
//导入状态管理器
import store from 'store'
// 引入cookie
import Cookie from "js-cookie"
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
// 引入element-ui 主题
import "./assets/theme/index.css"

const dispatch = store.dispatch

//使用自定义插件
Vue.use(Plugins)

//使用element-ui
Vue.use(ElementUI)

//使用vue-resource
Vue.use(VueResource)

//使用vue-nprogress
Vue.use(NProgress, {
    latencyThreshold: 100, // Number of ms before progressbar starts showing, default: 100,
    router: true, // Show progressbar when navigating routes, default: true
    http: false // Show progressbar when doing Vue.http, default: true
})

Vue.http.options.emulateJSON = true
Vue.http.options.method = "POST"

Vue.config.productionTip = false

//vue-resource 请求发送前的处理逻辑
Vue.http.interceptors.push((request, next) => {
    next((response) => {

        console.log("response", response);
        let _code = response.body.code
        let _msg = response.body.msg

        if (_code === 1) {
            Vue.prototype.$message({
                message: _msg,
                type: 'warning'
            })
            return response;
        }
        if (_code === 2) {
            Vue.prototype.$message({
                message: _msg,
                type: 'warning'
            })
            Cookie.remove("_userName");
            dispatch('set_user_info', {
                user: null,
                is_login: false
            })
            setTimeout(() => {
                window.location.href = "/";
            }, 500)
            return false;
        }
        if (_code === 3) {
            Vue.prototype.$message({
                message: _msg,
                type: 'error'
            })
            return false;
        }
    })
})

//首先检查是否有网络
if(window.navigator.onLine==true){
    new Vue({
        router,
        store,
        nprogress: new NProgress({parent: '.nprogress-container'}),
        ...App
    }).$mount('mainbody')
}
else{
    alert("您已进入无网络的二次元");
}

