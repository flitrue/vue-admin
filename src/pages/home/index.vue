<template>
    <div class="home">
        <el-row :gutter="10">
            <el-col :span="12">
                <el-row :gutter="10">
                    <div class="mypanel">
                        <el-carousel height="240px">
                            <el-carousel-item v-for="item in carouselItems" :key="item">
                                <a :href="item.url" target="_blank"><img height="100%" width="100%" :src="item.img" :alt="item.title"></a>
                                <!--<h3>{{item.title}}</h3>-->
                            </el-carousel-item>
                        </el-carousel>
                    </div>

                    <div class="mypanel total" style="height: 250px;">
                        <el-row :gutter="10" class="myrow" style="height: 50%;">
                            <el-col :span="12" class="fullheight" style="text-align: center;">
                                <el-row class="myrow fullheight mycenter">
                                    <div class="box">
                                        <el-col :span="10" class="fullheight myalign" style="background-color: #5AC7F6;">
                                            <img src="../../assets/images/device.png" alt="设备数">
                                        </el-col>
                                        <el-col :span="14" class="myalign1">
                                            {{total.device}}<span style="font-size: 10px;">台</span>
                                        </el-col>
                                    </div>
                                </el-row>
                            </el-col>
                            <el-col :span="12" class="fullheight" style="text-align: center;">
                                <el-row class="myrow fullheight mycenter">
                                    <div class="box">
                                        <el-col :span="10" class="fullheight myalign" style="background-color: #FCD12C;">
                                            <img src="../../assets/images/file.png" alt="文档数">
                                        </el-col>
                                        <el-col :span="14" class="myalign1">
                                            {{total.article}}<span style="font-size: 10px;">篇</span>
                                        </el-col>
                                    </div>
                                </el-row>
                            </el-col>
                        </el-row>

                        <el-row :gutter="10" class="myrow" style="height: 50%;">
                            <el-col :span="12" class="fullheight" style="text-align: center;">
                                <el-row class="myrow fullheight mycenter">
                                    <div class="box">
                                        <el-col :span="10" class="fullheight myalign" style="background-color: #FF6D60;">
                                            <img src="../../assets/images/photo.png" alt="相片数">
                                        </el-col>
                                        <el-col :span="14" class="myalign1">
                                            {{total.photo}}<span style="font-size: 10px;">张</span>
                                        </el-col>
                                    </div>
                                </el-row>
                            </el-col>
                            <el-col :span="12" class="fullheight" style="text-align: center;">
                                <el-row class="myrow fullheight mycenter">
                                    <div class="box">
                                        <el-col :span="10" class="fullheight myalign" style="background-color: #6DCCC8;">
                                            <img src="../../assets/images/share.png" alt="分享数">
                                        </el-col>
                                        <el-col :span="14" class="myalign1">
                                            {{total.share}}<span style="font-size: 10px;">个</span>
                                        </el-col>
                                    </div>
                                </el-row>
                            </el-col>
                        </el-row>

                    </div>
                </el-row>
            </el-col>

            <el-col :span="12">
                <div style="height: 520px;">
                    <calendar :originData="moodData"></calendar>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="10">
            <el-col :span="12">
                <div class="mypanel">
                    <div class="newsTitle">
                        <img src="../../assets/images/notice.png" alt="通知公告">
                    </div>
                    <div class="mypanel" style="height: 100px;">
                        <notice></notice>
                    </div>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="mypanel">
                    <div class="newsTitle">
                        <img src="../../assets/images/news.png" alt="新闻中心">
                    </div>
                    <news></news>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import {panelTitle,calendar} from 'components'
    import {pointData,moodInfo,total} from "../../widgets/Api"
    import {news,notice} from "./sub"
    import {mapActions} from 'vuex'
    import Cookie from "js-cookie"

    export default{
        data(){
            return {
                carouselItems: [
                    {
                        title: "惯性动作捕捉系统",
                        url: "#",
                        img: "http://cdn.foheart.com/20170227_20170227062144.jpg"
                    },
                    {
                        title: "惯性传感器",
                        url: "#",
                        img: "http://cdn.foheart.com/20160811_57ac4842a39cc.jpg"
                    },
                    {
                        title: "虚拟现实输入设备",
                        url: "#",
                        img: "http://cdn.foheart.com/20160819_57b6d74eaa9a2.jpg"
                    }
                ],
                total: {
                    device: 0,
                    article: 0,
                    share: 0,
                    photo: 0
                },
                moodData: []
            }
        },
        components: {
            panelTitle,calendar,news,notice
        },
        methods: {
            getMood(){
                moodInfo().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.moodData = data;
                    }else if(data.id == null){
                        Cookie.remove("_userName");
                        this.$store.dispatch('set_user_info', {
                            user: null,
                            is_login: false
                        })
                        this.$message({
                            type: "warning",
                            message: msg
                        });
                    }else{
                        this.$message({
                            type: "warning",
                            message: msg
                        });
                    }
                });
            },
            getTotal(){
                total().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.total = data;
                    }
                })
            },
            init(){
                this.getMood();
                this.getTotal();
            }
        },
        mounted(){
            this.init();
        }
    }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .el-carousel__item {
        h3{
            position: relative;
            bottom: 50px;
            color: #475669;
            font-size: 14px;
            opacity: 0.75;
            text-align: center;
        }
        a{
            display: block;
            width: 100%;
            height: 100%;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .el-carousel__button{
        background-color: rgba(0,0,0,.6);
    }
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .newsTitle{
        padding: 10px;
    }
    .total{
        padding: 10px 20px;
    }
    .myrow{
        margin-bottom: 0px;
    }
    .fullheight{
        height: 100%;
    }
    .mycenter{
        //padding: 10% 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .myalign{
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
    }
    .box{
        box-shadow: 0 3px 15px rgba(0,0,0,.2), 0 -2px 6px rgba(0,0,0,.2);
    }
    .myalign1{
        width: 100px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        font-size: 40px;
        color: #1c8de0;
    }
</style>
