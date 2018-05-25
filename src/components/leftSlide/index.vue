<template>
    <div class="left-side">
        <div class="left-side-inner">
            <router-link to="/" class="logo block">
                <img src="./images/logo.png" alt="logo">
            </router-link>
            <el-menu
                    class="menu-box"
                    theme="dark"
                    router
                    :default-active="$route.path">
                <div
                        v-for="(item, index) in nav_menu_data"
                        :key="index">
                    <el-menu-item
                            class="menu-list"
                            v-if="typeof item.child === 'undefined'"
                            :index="item.path">
                        <i class="icon fa" :class="item.icon"></i>
                        <span v-text="item.title" class="text"></span>
                    </el-menu-item>
                    <el-submenu
                            :index="item.path"
                            v-else>
                        <template slot="title">
                            <i class="icon fa" :class="item.icon"></i>
                            <span v-text="item.title" class="text"></span>
                        </template>
                        <el-menu-item
                                class="menu-list"
                                v-for="(sub_item, sub_index) in item.child"
                                :index="sub_item.path"
                                :key="sub_index">
                            <!--<i class="icon fa" :class="sub_item.icon"></i>-->
                            <span v-text="sub_item.title" class="text"></span>
                        </el-menu-item>
                    </el-submenu>
                </div>
            </el-menu>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {info} from "../../widgets/Api"

    export default{
        data(){
            return {
                nav_menu_data1: [
                    {
                    title: "主页",
                    path: "/home",
                    icon: "fa-home"
                }, {
                    title: "人事管理",
                    path: "/person",
                    icon: "fa-user",
                    child: [{
                        title: "添加人员",
                        path: "/person/add"
                    },{
                        title: "我的卡片",
                        path: "/person/my"
                    },{
                        title: "人员列表",
                        path: "/person/list"
                    },{
                        title: "组织架构",
                        path: "/person/search"
                    }]
                },{
                    title: "设备管理",
                    path: "/device",
                    icon: "fa-desktop",
                    child: [{
                        title: "添加设备",
                        path: "/device/add"
                    },{
                        title: "设备列表",
                        path: "/device/list"
                    },{
                        title: "设备申请",
                        path: "/device/admin/apply"
                    },{
                        title: "维修申请",
                        path: "/device/admin/repair"
                    }]
                },{
                    title: "文档管理",
                    path: "/file",
                    icon: "fa-files-o",
                    child: [{
                        title: "新建文档",
                        path: "/file/add"
                    },{
                        title: "我的文档",
                        path: "/file/my"
                    }]
                }, {
                    title: "分享管理",
                    path: "/share",
                    icon: "fa-share-alt",
                    child: [{
                        title: "我的分享",
                        path: "/share/my"
                    },{
                        title: "资源共享",
                        path: "/share/search"
                    }]
                }, {
                    title: "报表管理",
                    path: "/charts",
                    icon: "fa-bar-chart-o",
                    child: [{
                        title: "人事报表",
                        path: "/charts/person"
                    },{
                        title: "资产报表",
                        path: "/charts/device"
                    },{
                        title: "文档报表",
                        path: "/charts/file"
                    },]
                }, {
                    title: "我的相册",
                    path: "/album",
                    icon: "fa-photo",
                }],
                nav_menu_data2: [
                    {
                        title: "主页",
                        path: "/home",
                        icon: "fa-home"
                    }, {
                        title: "人事管理",
                        path: "/person",
                        icon: "fa-user",
                        child: [{
                            title: "我的卡片",
                            path: "/person/my"
                        },{
                            title: "组织架构",
                            path: "/person/search"
                        }]
                    },{
                        title: "设备管理",
                        path: "/device",
                        icon: "fa-desktop",
                        child: [{
                            title: "我的设备",
                            path: "/device/my"
                        },{
                            title: "设备申请",
                            path: "/device/apply"
                        },{
                            title: "维修申请",
                            path: "/device/repair"
                        },]
                    },{
                        title: "文档管理",
                        path: "/file",
                        icon: "fa-files-o",
                        child: [{
                            title: "新建文档",
                            path: "/file/add"
                        },{
                            title: "我的文档",
                            path: "/file/my"
                        }]
                    }, {
                        title: "分享管理",
                        path: "/share",
                        icon: "fa-share-alt",
                        child: [{
                            title: "我的分享",
                            path: "/share/my"
                        },{
                            title: "资源共享",
                            path: "/share/search"
                        }]
                    }, {
                        title: "我的相册",
                        path: "/album",
                        icon: "fa-photo",
                    }],
                nav_menu_data: []
            }
        },
        created(){
            info().then( ({data: {code, data, msg}}) => {
                if(code == 0){
                    if(data.power == 1){
                        this.nav_menu_data = this.nav_menu_data1;
                    }else{
                        this.nav_menu_data = this.nav_menu_data2;
                    }
                }
            })
        }
    }
</script>
