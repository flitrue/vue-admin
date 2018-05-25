<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <router-link :to="'/file/edit/'+$route.params.id">
                <el-button style="float: right;" type="primary"><i class="fa fa-edit"></i>  编辑</el-button>
            </router-link>
            <h1>{{title}}</h1>
            <p>
                <span><i class="fa fa-th-large" aria-hidden="true"></i> 文档类型：{{category}}</span>&nbsp;
                <span><i class="fa fa-clock-o"></i> 创建时间：{{time}}</span>&nbsp;
                <span><i class="fa fa-user"></i> 作者：{{name}}</span>
            </p>
        </div>
        <div v-html="content"></div>
        <div v-show="false">
            <el-button type="danger" @click="good"><i class="fa fa-heart-o"></i>喜欢就点个赞吧(5)</el-button>
        </div>
    </el-card>
</template>

<script type="text/javascript">
    import {articleDetail} from "../../widgets/Api"

    export default {
        data(){
            return {
                title: "",
                time: "",
                content: "",
                name: "",
                category: ""
            }
        },
        methods: {
            getDetail(){
                articleDetail({params: {id: this.$route.params.id}}).then( ({data: {code, data, msg}})  => {
                    if(code == 0){
                        this.category = data.category;
                        this.title = data.title;
                        this.time = data.time;
                        this.content = data.content;
                        this.name = data.name;
                    }
                })
            },
            good(){

            }
        },
        mounted(){
            this.getDetail();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    h1{
        margin: 0 0 15px 0;
        font-weight: bold;
        font-size: 24px;
        color: #444444;
    }
    p{
        color: #999999;
        font-size: 14px;
    }
</style>