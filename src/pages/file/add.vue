<template>
    <el-row>
        <el-col>
            <div class="mypanel">
                <div class="box">
                    <div v-for="(item,index) in data" class="box-item" @click="addFile(item.name)">
                        <div>{{item.name}}</div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script type="text/javascript">
    import {mapActions} from "vuex";

    export default {
        data(){
            return {
                data: [
                    {
                    id: 1,
                    name: "技术文档",
                },{
                    id: 2,
                    name: "规章制度",
                },{
                    id: 3,
                    name: "法律相关",
                },{
                    id: 4,
                    name: "娱乐社交",
                },]
            }
        },
        methods: {
            ...mapActions(['set_article_category']),
            addFile(name){
                this.$router.push({name: "articleAdd"});
                this.set_article_category(name);
            },

        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .el-col{
        background-color: white;
    }
    .mypanel{
        float: left;
        padding-bottom: 20px;
        padding-right: 20px;
    }
    .box{
        display: flex;
        align-items: center;
        &-item{
            position: relative;
            background: url(../../assets/images/document.png) no-repeat;
            background-position: 50% 30%;
            border: 1px solid #dadada;
            height: 200px;
            width: 200px;
            margin-top: 20px;
            margin-left: 20px;
            //background-color: #1c8de0;
            float: left;
            div{
                width: 100%;
                position: absolute;
                bottom: 20%;
                //left: 50%;
                text-align: center;
            }
            user-select: none;
        }
        &-item:hover{
            background: url(../../assets/images/document_hover.png) no-repeat;
            background-position: 50% 30%;
        }
    }
</style>