<template>
    <div class="home">
        <el-row>
            <el-col :span="24">
                <div class="header">

                    <el-col :span="24">
                        <el-input v-model.trim="title" placeholder="文章标题" size="large" class="form-input"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <el-select v-model="category" size="small">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="create-time"> 创建时间：{{time}}</span>
                        <el-button type="primary" @click="handleArticle">保存</el-button>
                    </el-col>
                </div>

                <el-col :span="24">
                    <div ref="editor"></div>
                </el-col>

            </el-col>
        </el-row>

    </div>
</template>

<script type="text/javascript">
    import {articleAdd,articleEdit,articleDetail,articleDel} from "../../widgets/Api"
    import {mapGetters} from "vuex"
    import Cookie from "js-cookie"
    import "../../../static/UEditor/ueditor.config"
    import "../../../static/UEditor/ueditor.all.min"
    import '../../../static/UEditor/lang/zh-cn/zh-cn'

    export default {
        data(){
            return {
                id: 'myeditor' + Math.random(10),
                options: [
                    {
                        id: 1,
                        value: "技术文档",
                        label: "技术文档"
                    },{
                        id: 2,
                        value: "规章制度",
                        label: "规章制度"
                    },{
                        id: 3,
                        value: "法律相关",
                        label: "法律相关"
                    },{
                        id: 4,
                        value: "娱乐社交",
                        label: "娱乐社交"
                    }
                ],
                title: "",
                content: "",
                text: "",
                category: "技术文档",
                time: "",
                timer: 0,
                ue: {}
            }
        },
        computed:{
            ...mapGetters(["get_article_category"])
        },
        methods: {
            init(){
                this.timer = setInterval( () => {
                    //this.time = moment().format("YYYY-MM-DD HH:mm:ss")
                    this.time = (new Date()).$DateFormat("yyyy-MM-dd hh:mm:ss");
                },1000);
                this.getDetail();
            },
            getDetail(){
                let id = parseInt(this.$route.params.id);
                if(id && typeof id === 'number'){
                    articleDetail({params: {id: id}}).then( ({data: {code, data, msg}}) => {
                        if(code == 0){
                            this.id = data.id;
                            this.title = data.title;
                            this.content = data.content;
                            this.category = data.category;
                            this.ue.ready( () => {
                                this.ue.setContent(this.content);
                            });
                        }else{
                            this.$message({
                                type: "warning",
                                message: msg
                            });
                        }
                    })
                }else{
                    this.category = this.get_article_category;
                }

            },
            handleArticle(){
                let id = parseInt(this.$route.params.id);
                if(id){
                    this.editArticle(id);
                }else{
                    this.addArticle();
                }
            },
            addArticle(){
                if(this.title == ""){
                    this.$message({
                        type: "warning",
                        message: "标题不能为空"
                    })
                    return false;
                }
                this.content = this.ue.getContent();
                this.text = this.ue.getContentTxt();
                let data = {
                    title: this.title,
                    content: this.content,
                    category: this.category,
                    text: this.text,
                    uid: Cookie.get("_uid")
                };
                articleAdd(data).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        })
                        this.$router.push({name: "articleDetail",params: {id: data.id}});
                    }
                })
            },
            editArticle(id){
                if(this.title == ""){
                    this.$message({
                        type: "warning",
                        message: "标题不能为空"
                    })
                    return false;
                }
                this.content = this.ue.getContent();
                this.text = this.ue.getContentTxt();
                let data = {
                    id: id,
                    title: this.title,
                    content: this.content,
                    category: this.category,
                    text: this.text,
                    uid: Cookie.get("_uid")
                };
                articleEdit(data).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        })
                        this.$router.push({name: "articleDetail",params: {id: id}});
                    }
                })
            },
            delArticle(){
                articleDel({params: {id: this.id}}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "保存成功"
                        });
                    }
                });
            }
        },
        mounted(){
            this.init();
            this.$nextTick(() => {
                this.$refs.editor.id = this.id;
                this.ue = UE.getEditor(this.id,{
                    initialFrameWidth: null,
                    initialFrameHeight: 600
                });
            });
        },
        beforeDestroy(){
            clearInterval(this.time);
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .header{
        position: relative;
        background-color: white;
        border-radius: 5px;
    }
    .create-time{
        padding: 5px 10px;
        font-size: 12px;
    }
    .el-input{
        margin: 0px 0px 10px;
    }
    .el-select{
        margin: 0px 0px 10px;
    }
    .recommen{
        background-color: white;
    }
</style>