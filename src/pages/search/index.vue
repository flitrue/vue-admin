<template>
    <div class="home">
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="keyword">
                <el-select v-model="category" slot="prepend">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="人员" value="person"></el-option>
                    <el-option label="设备" value="device"></el-option>
                    <el-option label="文档" value="file"></el-option>
                    <el-option label="分享" value="share"></el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="submit"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {search} from "../../widgets/Api"

    export default {
        data(){
            return {
                keyword: '',
                category: 'all'
            }
        },
        methods: {
            submit(){

                search({params: {category: this.category, keyword: this.keyword}}).then( ( {data: {code, data, msg}}) => {
                    if(code == 0){

                    }
                })
            }
        },
        mounted(){
            this.keyword = this.$route.params.keyword;
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .home{
        height: 100%;
        background-color: white;
        border-radius: 2px;

        padding: 20% 20%;

    }
    .el-select{
        width: 110px;
    }
</style>