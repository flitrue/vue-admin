<template>
    <div>
        <el-card v-for="item in data" :key="item.id" class="box-card">
            <div class="info">
                <div class="info-title">
                    <h2><span :style="'color:'+ item.color+ ';border-color:'+item.color">{{item.category | filterC}}</span><router-link :to="'/file/my/'+item.id">{{item.title}}</router-link></h2>
                </div>
                <div class="info-content">
                    {{item.text | filterContent}}<router-link :to="'/file/my/'+ item.id">继续阅读 »</router-link>
                </div>
                <div class="info-relative">
                    <p class="article-span">
                        <i class="fa fa-clock-o"></i>&nbsp;{{item.time}}
                        <i class="fa fa-eye" aria-hidden="true"></i> {{item.look}}浏览&nbsp;
                        <!--<i class="fa fa-comments-o" aria-hidden="true"></i> {{item.comment}}评论&nbsp;
                        <i class="fa fa-heart-o" aria-hidden="true"></i> {{item.good}}个赞&nbsp;-->
                        <i class="fa fa-trash-o" @click="delInfo(item,'article')"></i>&nbsp;删除&nbsp;
                        <i v-show="item.share == 1" @click="cancelShare(item,'article')" class="fa fa-share"></i>&nbsp;取消分享
                    </p>
                </div>
            </div>
        </el-card>

        <el-card v-for="item in data1" :key="item.id" class="box-card">
            <div class="info">
                <div class="info-title">
                    <h2><span >相册</span><router-link :to="'/album/'+item.id">{{item.name}}</router-link></h2>
                </div>
                <router-link :to="'/album/'+item.id">
                    <div class="info-content">
                        <img style="width: 100px;height: 100px;" :src="item.photo" alt="item.name">
                        {{item.mes}}
                    </div>
                </router-link>
                <div class="info-relative">
                    <span @click="delInfo(item,'album')"><i class="fa fa-trash-o"></i>&nbsp;删除</span>&nbsp;&nbsp;
                    <span v-show="item.share == 1" @click="cancelShare(item,'album')"><i class="fa fa-share"></i>&nbsp;取消分享</span>
                </div>
            </div>
        </el-card>

        <div class="pagination">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="pagenow"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {shareInfo,albumDel,articleDel,cancelShare} from "../../widgets/Api"
    import _ from "lodash"

    export default {
        data(){
            return {
                data: [],
                data1: [],
                pagenow: 1,
                pagesize: 20,
                total: 0
            }
        },
        filters: {
            filterContent: function (content) {
                return content.substring(0,500)+ "......";
            },
            filterC: function (category) {
                return category.substring(0,2);
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.pagenow = val;
                this.getInfo(val);
            },
            delInfo(item, category){
                this.$confirm('删除后无法恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(category == "article"){
                    articleDel({params: {id: item.id}}).then(({data: {code, data, msg}}) => {
                        if(code == 0){
                        this.$notify({
                            title: '成功',
                            message: msg,
                            type: 'success'
                        });

                        }
                    })
                    }else{
                    albumDel({aid: item.id}).then( ({data: {code, data, msg}}) => {
                        if(code == 0){
                        this.$message({
                            type: "success",
                            message: msg
                        });
                    }
                });
                    }
                    this.getData();
                }).catch( () => {

                });
            },
            getData(){
                shareInfo().then( ({data: {code, data, msg}}) => {
                    console.log(data);
                _.each(data.article, item => {
                    switch (item.category){
                case "1":
                    item.category = "娱乐社交";
                    item.color = "orange";
                    break;
                case "2":
                    item.category = "技术文档";
                    item.color = "blue";
                    break;
                case "3":
                    item.category = "规章制度";
                    item.color = "green";
                    break;
                case "4":
                    item.category = "法律相关";
                    item.color = "red";
                    break;
                default:
                    item.color = "black";
                    break;
                }
            });
                this.data = data.article;
                this.data1 = data.album;
            });
            },
            cancelShare(item,category){
                let data = {
                    category: category,
                    id: item.id
                };
                cancelShare({params: data}).then(({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "取消分享成功！"
                        });
                        this.getData();
                    }
                });
            },
        },
        mounted(){
            this.getData();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    a{
        text-decoration: none;
        color: #6bc5a4;
        font-weight: 500;
    }
    a:hover{
        text-decoration: none;
    }
    a:focus{
        text-decoration: none;
    }
    a:active{
        text-decoration: none;
    }
    .info{
        position: relative;
        padding-bottom: 15px;
        &-title{
            span{
                font-size: 16px;
                padding: 5px;
                color: rgba(145,50,35,1);
                border: 1px;
                border-style: solid;
                border-radius: 8px;
                margin-right: 10px;
            }
            margin: 0 0 15px 0;
            a{
                font-weight: bold;
                font-size: 20px;
            }
        }
        &-content{
            color: #444444;
            font-size: 14px;
        }
        &-relative{
            position: absolute;
            bottom: -15px;
            font-size: 14px;
            color: #6bc5a4;
            span{
                cursor: pointer;
            }
        }
    }
    .pagination{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>