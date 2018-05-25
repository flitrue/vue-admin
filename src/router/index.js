/**
 * Created by 王平平 on 2017/3/21.
 *
 * @author: 王平平
 * @github: https://github.com/flitrue
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import Cookie from "js-cookie"
//导入接口地址
import {info} from "../widgets/Api"

const dispatch = store.dispatch

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [
    {
        path: '/',
        name: '/',
        components: {
            default: require('pages/home'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "主页",
            auth: true
        }
    }, {
        path: '/home',
        name: 'home',
        components: {
            default: require('pages/home'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "主页",
            auth: true
        }
    }, {
        path: '/search',
        name: 'search',
        components: {
            default: require('pages/search/index'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "搜索",
            auth: true
        }
    }, {
        path: '/search/:keyword',
        name: 'search1',
        components: {
            default: require('pages/search/index'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "搜索",
            auth: true
        }
    }, {
        path: '/test',
        name: 'test',
        components: {
            default: require('pages/test/sort'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "测试",
            auth: true
        }
    }, {
        path: '/person/add',
        name: 'personAdd',
        components: {
            default: require('pages/person/add'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "添加人员",
            auth: true
        }
    }, {
        path: '/person/edit/:id',
        name: 'personEdit',
        components: {
            default: require('pages/person/admin/edit'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "编辑人员",
            auth: true
        }
    }, {
        path: '/person/my',
        name: 'personMy',
        components: {
            default: require('pages/person/my'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的卡片",
            auth: true
        }
    }, {
        path: '/person/list',
        name: 'personList',
        components: {
            default: require('pages/person/list'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "人员列表",
            auth: true
        }
    }, {
        path: '/person/detail/:id',
        name: 'personDetail',
        components: {
            default: require('pages/person/detail'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "人员详情",
            auth: true
        }
    }, {
        path: '/person/staff/:id',
        name: 'staffDetail',
        components: {
            default: require('pages/person/admin/detail'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "员工详情",
            auth: true
        }
    }, {
        path: '/person/search',
        name: 'personSearch',
        components: {
            default: require('pages/person/search'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "组织架构",
            auth: true
        }
    }, {
        path: '/device/add',
        name: 'deviceAdd',
        components: {
            default: require('pages/device/add'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "添加设备",
            auth: true
        }
    }, {
        path: '/device/edit/:id',
        name: 'deviceEdit',
        components: {
            default: require('pages/device/edit'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "编辑设备",
            auth: true
        }
    }, {
        path: '/device/list',
        name: 'deviceList',
        components: {
            default: require('pages/device/list'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "设备列表",
            auth: true
        }
    },  {
        path: '/device/my',
        name: 'deviceMy',
        components: {
            default: require('pages/device/my'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的设备",
            auth: true
        }
    },  {
        path: '/device/detail/:id',
        name: 'deviceDetail',
        components: {
            default: require('pages/device/detail'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的设备",
            auth: true
        }
    }, {
        path: '/device/admin/apply',
        name: 'applyList',
        components: {
            default: require('pages/device/admin/apply'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "设备申请",
            auth: true
        }
    }, {
        path: '/device/admin/repair',
        name: 'repairList',
        components: {
            default: require('pages/device/admin/repair'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "维修申请",
            auth: true
        }
    },  {
        path: '/device/apply',
        name: 'deviceApply',
        components: {
            default: require('pages/device/apply'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "设备申请",
            auth: true
        }
    }, {
        path: '/device/repair',
        name: 'deviceRepair',
        components: {
            default: require('pages/device/repair'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "维修申请",
            auth: true
        }
    }, {
        path: '/file/add',
        name: 'fileAdd',
        components: {
            default: require('pages/file/add'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "新建文档",
            auth: true
        }
    }, {
        path: '/file/my',
        name: 'fileMy',
        components: {
            default: require('pages/file/my'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的文档",
            auth: true
        }
    }, {
        path: '/file/article',
        name: 'articleAdd',
        components: {
            default: require('pages/ueditor/index'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "新建文档",
            auth: true
        }
    }, {
        path: '/file/my/:id',
        name: 'articleDetail',
        components: {
            default: require('pages/file/detail'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "",
            auth: true
        }
    },  {
        path: '/file/edit/:id',
        name: 'articleEdit',
        components: {
            default: require('pages/ueditor/index'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "编辑文档",
            auth: true
        }
    }, {
        path: '/album',
        name: 'album',
        components: {
            default: require('pages/album/index'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的相册",
            auth: true
        }
    }, {
        path: '/album/:id',
        name: 'albumPhoto',
        components: {
            default: require('pages/album/photo'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的相册",
            auth: true
        }
    }, {
        path: '/share/my',
        name: 'shareMy',
        components: {
            default: require('pages/share/my'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "我的分享",
            auth: true
        }
    }, {
        path: '/share/search',
        name: 'shareSearch',
        components: {
            default: require('pages/share/search'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "资源共享",
            auth: true
        }
    }, {
        path: '/charts/person',
        name: 'chartsPerson',
        components: {
            default: require('pages/charts/admin/person'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "人事报表",
            auth: true
        }
    }, {
        path: '/charts/device',
        name: 'chartsDevice',
        components: {
            default: require('pages/charts/admin/device'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "资产报表",
            auth: true
        }
    }, {
        path: '/charts/file',
        name: 'chartsFile',
        components: {
            default: require('pages/charts/admin/file'),
            menuView: require('components/leftSlide')
        },
        meta: {
            title: "文档报表",
            auth: true
        }
    }, {
        path: '/user/login',
        name: 'login',
        components: {
            fullView: require('pages/user/login')
        },
        meta: {
            title: "登录",
        }
    }, {
        path: '/user/register',
        name: 'register',
        components: {
            fullView: require('pages/user/register')
        },
        meta: {
            title: "注册",
        }
    }, {
        path: '/user/reset',
        name: 'reset',
        components: {
            fullView: require('pages/user/reset')
        },
        meta: {
            title: "重置密码",
        }
    }, {
        path: '*',
        name: '404',
        components: {
            fullView: require('pages/error/404')
        },
        meta: {
            title: "404",
        }
    }]

const router = new VueRouter({
    routes,
    mode: 'hash', //default: hash ,history
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let toName = to.name
    // let fromName = from.name
    let userName = Cookie.get("_email");
    if (userName && toName === "login") {
        router.replace({path: "/"})
    }

    if (to.matched.some(record => record.meta.auth)) {
        if (!userName) {
            router.replace({name: "login"})
        } else {
            // 然后为避免登录延迟，先获取用户信息
            info().then(({data:{data, code, msg}}) => {
                if (code === 0) {
                    Cookie.set("_uid", data.id);
                    Cookie.set("_email", data.email);
                    dispatch('set_user_info', {
                        user: data,
                        is_login: true
                    })
                } else {
                    Cookie.remove("_email");
                }
            }).catch(({status, statusText}) => {
                Vue.prototype.$message({
                    message: '操作失败！错误原因 ' + statusText + ' 状态码 ' + status,
                    type: 'error'
                })
            });
            next()
        }
    } else {
        next()
    }
});

//路由完成之后的操作
router.afterEach(route => {

})

export default router
