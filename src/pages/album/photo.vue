<template>
    <div>
        <div style="margin-left: 5px;">
            <el-button type="primary" icon="upload" @click="upload">上传照片</el-button>
        </div>
        <div v-for="(item,index) in datas" class='image'>
            <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><div @click="del(item.id)"><i class="el-icon-delete"></i>  删除</div></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <img :src="item.bigphoto" style="width: 300px;" @click="open(index)">
        </div>

        <el-dialog title="" v-model="show" :modal-append-to-body="false">
            <div class="item">
                <el-carousel indicator-position="none" :autoplay="false" :initial-index="index">
                    <el-carousel-item v-for="item in datas" :key="item.id">
                        <a :href="item.bigphoto" target="_blank"><img height="100%" width="100%" :src="item.bigphoto" alt=""></a>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </el-dialog>
        <upload @close="close" :value="show1" :albumname="$route.params.id"></upload>
    </div>
</template>

<script type="text/javascript">
    import {albumDetail,photoDel} from "../../widgets/Api"
    import upload from "../upload/album.vue"

    export default {
        data(){
            return {
                index: 0,
                show: false,
                show1: false,
                datas: []
            }
        },
        components: {
            upload
        },
        methods: {
            open(index){
                this.index = index;
                this.show = true;
            },
            close(val){
                this.show1 = val;
            },
            upload(){
                this.show1 = true;
            },
            del(pid){
                photoDel({pid}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "删除成功！"
                        });
                        this.getInfo();
                    }
                });
            },
            getInfo(){
                let aid = this.$route.params.id;
                albumDetail({aid}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.datas = data;
                    }
                });
            }
        },
        mounted(){
            this.getInfo();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .image{
        position: relative;
        float: left;
        margin: 5px;
        cursor: pointer;
    }
    .item{

    }

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

    .el-dropdown{
        position: absolute;
        right: 20px;
        top: 20px;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }
    .el-dropdown-menu{
        font-size: 12px;
    }
    .el-dropdown-menu__item:not(.is-disabled):hover{
        background-color: #48576a;
        color: white;
    }
</style>