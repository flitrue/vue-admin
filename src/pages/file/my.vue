<template>
    <div class="home" v-loading="isLoading"
         element-loading-text="拼命加载中">
        <div v-if="data.length>0">
            <el-card v-for="item in data" :key="item.id" class="box-card">
                <div class="info">
                    <div class="info-title">
                        <h2><span :style="'color:'+ item.color+ ';border-color:'+item.color">{{item.category | filterC}}</span><router-link :to="'/file/my/'+item.id">{{item.title}}</router-link></h2>
                    </div>
                    <div class="info-content">
                        {{item.text | filterContent}}<router-link :to="'/file/my/'+ item.id">继续阅读 »</router-link>
                    </div>
                    <div class="info-relative">
                        <!--<i class="fa fa-user"></i>&nbsp;作者：{{item.name}}&nbsp;&nbsp;--><i class="fa fa-clock-o"></i>&nbsp;发布时间：{{item.time}}&nbsp;&nbsp;
                        <router-link :to="'/file/edit/'+ item.id"><i class="fa fa-edit"></i>&nbsp;编辑</router-link>&nbsp;&nbsp;
                        <span @click="delInfo(item.id)"><i class="fa fa-trash-o"></i>&nbsp;删除</span>&nbsp;&nbsp;
                        <span v-show="item.share == 0" @click="share(item)"><i class="fa fa-share-alt"></i>&nbsp;分享</span>
                        <span v-show="item.share == 1" @click="cancelShare(item)"><i class="fa fa-share"></i>&nbsp;取消分享</span>
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

        <div class="nodata" v-else>
            <img src="../../assets/images/nodata.png" alt="暂无数据">
        </div>
    </div>
</template>

<script type="text/javascript">
    import _ from "lodash";
    import {articleInfo,articleDel,share,cancelShare} from "../../widgets/Api"

    export default {
        data(){
            return {
                data:[],
                pagenow: 1,
                pagesize: 20,
                total: 0,
                isLoading: true
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
            getInfo(page){
                articleInfo({params: {page: page}}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        _.each(data.datas, item => {
                            switch (item.category){
                                case "娱乐社交":
                                    item.color = "orange";
                                    break;
                                case "技术文档":
                                    item.color = "blue";
                                    break;
                                case "规章制度":
                                    item.color = "green";
                                    break;
                                case "法律相关":
                                    item.color = "red";
                                    break;
                                default:
                                    item.color = "black";
                                    break;
                            }
                        });
                        this.data = data.datas;
                        this.isLoading = false;
                        this.total = data.total;
                    }
                })
            },
            delInfo(id){
                this.$confirm('删除后无法恢复, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    articleDel({params: {id: id}}).then(({data: {code, data, msg}}) => {
                        if(code == 0){
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getInfo();
                        }
                    })
                }).catch( () => {

                });
            },
            share(item){
                let data = {
                    category: "article",
                    id: item.id
                };
                share({params: data}).then(({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "分享成功！"
                        });
                        item.share = 1;
                    }
                });
            },
            cancelShare(item){
                let data = {
                    category: "article",
                    id: item.id
                };
                cancelShare({params: data}).then(({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "取消分享成功！"
                        });
                        item.share = 0;
                    }
                });
            },
            init(){
                this.getInfo();
            }
        },
        mounted(){
            this.init();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .nodata{
        min-height: 600px;
        background-color: white;
        line-height: 600px;
        text-align: center;
    }
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