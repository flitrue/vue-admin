<template>
    <div>
        <el-col :offset="1">
            <el-button type="primary" icon="upload" @click="upload">上传照片</el-button>
            <add ref="edit" :data.sync="editData"></add>
        </el-col>
        <el-col :span="5" v-for="(item,key) in data" :key="item.id" :offset="1">
            <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><div @click="edit(key)"><i class="el-icon-edit"></i>  编辑</div></el-dropdown-item>
                    <el-dropdown-item><div @click="del(item.id)"><i class="el-icon-delete"></i>  删除</div></el-dropdown-item>
                    <el-dropdown-item v-show="item.share == 0"><div @click="share(item)"><i class="el-icon-share"></i>  分享</div></el-dropdown-item>
                    <el-dropdown-item v-show="item.share == 1"><div @click="cancleShare(item)"><i class="el-icon-share"></i>  取消分享</div></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-card :body-style="{ padding: '0px' }">
                <div @click="enter(item.id)">
                    <img :src="item.photo" class="image" >
                    <span class="num">{{item.photocount}}</span>
                    <div style="padding: 14px;">
                        <span>{{item.name}}</span>
                        <i v-show="item.share == 0" class="fa fa-lock" title="自己可见"></i>
                        <i v-show="item.share == 1" class="fa fa-unlock" title="所有人可见"></i>
                    </div>
                </div>
            </el-card>
        </el-col>
        <upload @close="close" :value="show"></upload>
    </div>
</template>

<script type="text/javascript">
    import upload from "../upload/album.vue"
    import add from "./add.vue"
    import {albumInfo,albumEdit,albumDel,share,cancelShare} from "../../widgets/Api"
    import Cookie from "js-cookie"

    export default {
        data(){
            return {
                show: false,
                show1: false,
                data: [],
                editData: {
                    name: "flitrue"
                }
            }
        },
        components: {
            upload,add
        },
        methods: {
            close(val){
                this.show = val;
            },
            edit(id){
                this.editData.id = this.data[id].id;
                this.editData.name = this.data[id].name;
                this.editData.mes = this.data[id].mes;
                this.editData.img = this.data[id].photo;
                this.$refs.edit.show = true;
            },
            del(id){

                this.$confirm('确认删除？').then( () => {

                    albumDel({aid: id}).then( ({data: {code, data, msg}}) => {
                        if(code == 0){
                            this.$message({
                                type: "success",
                                message: msg
                            });
                            this.getInfo();
                        }
                    });
                }).catch( e => {

                });
            },
            share(item){
                let data = {
                    category: "album",
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
                    category: "album",
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
            upload(){
                this.show = true;
            },
            create(){
                this.show1 = true;
            },
            enter(id){
                this.$router.push({name: "albumPhoto",params: {id: id}});
            },
            getInfo(){
                let uid = Cookie.get("_uid");
                albumInfo({uid: uid}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.data = data;
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
    .el-col{
        position: relative;
        margin: 10px 10px;
    }
    .el-card{
        cursor: pointer;
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
    .num{
        position: absolute;
        bottom: 18%;
        right: 12%;
        font-size: 26px;
        color: white;
    }
    .image {
        width: 100%;
        height: 200px;
        display: block;
    }
</style>