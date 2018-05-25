<template>
    <span>
        <el-button type="primary" icon="plus" @click="handleOpen">创建相册</el-button>
        <el-dialog :title="title" :modal-append-to-body="false"
                   :before-close="handleClose"
                   v-model="show" size="tiny">
            <el-form :model="form">
                <el-form-item label="相册名" label-width="80px">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="80px">
                    <el-input type="textarea" v-model="form.mes"></el-input>
                </el-form-item>
                <el-form-item label="封面图片" label-width="80px" style="margin-bottom: 0px;">

                </el-form-item>

            </el-form>

            <el-upload
                    class="avatar-uploader"
                    :action="action"
                    name="img"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <div v-if="imageUrl" style="margin-left: 80px;">
                    <img :src="imageUrl" class="avatar" title="点击更换封面">
                </div>
                <div v-else class="my-upload my-upload--picture-card" style="margin-left: 80px;">

                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

    </span>
</template>

<script type="text/javascript">
    import {albumCreate,albumEdit} from "../../widgets/Api"
    import Cookie from "js-cookie"

    export default {
        props: {
            value: {
                type: Boolean,
                "default": false
            },
            data: {
                type: Object,
                "default": {}
            }
        },
        data(){
            return {
                title: "创建相册",
                isEdit: false,
                action: "https://mis.flitrue.com/api/album/upload",
                show: false,
                form: {
                    aid: "",
                    name: "",
                    mes: "",
                    img: ""
                },
                imageUrl: ""
            }
        },
        watch: {
          data: {
              handler: function (val, oldVal) {
                  this.title = "编辑相册";
                  this.form.aid = this.data.id;
                  this.form.name = this.data.name;
                  this.form.mes = this.data.mes;
                  this.form.img = this.data.img;
                  this.imageUrl = this.data.img;
                  this.isEdit = true;
              },
              deep: true
          }
        },
        methods: {
            init(){
                this.title = "创建相册";
                this.form.aid = "";
                this.form.mes = "";
                this.form.name = "";
                this.form.img = "";
                this.imageUrl = "";
                this.isEdit = false;
            },
            handleOpen(){
                this.init();
                this.show = true;
            },
            handleClose(){
                this.init();
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.img = res.url;
            },
            beforeAvatarUpload(file) {
                let isJPG = false;
                if(file.type == 'image/jpeg' || file.type == 'image/png'){
                    isJPG = true;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            submit(){
                this.imageUrl = "";
                this.show = false;
                this.form.uid = Cookie.get("_uid");
                if(this.isEdit){
                    albumEdit(this.form).then( ({data: {code, data, msg}}) => {
                        if(code == 0){
                            this.init();
                            this.$parent.$parent.getInfo();
                            console.log( this.$parent);
                            this.$parent.$parent.$children[1].getCategory();
                            this.$message({
                                type: 'success',
                                message: "相册编辑成功！"
                            });
                        }
                    })
                }else{
                    albumCreate(this.form).then( ({data: {code, data, msg}}) => {
                        if(code == 0){
                            this.init();
                            this.$parent.$parent.getInfo();
                            this.$message({
                                type: 'success',
                                message: "相册创建成功！"
                            });
                        }
                    })
                }
            }
        },
        mounted(){
            this.init();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .my-upload {
        display: inline-block;
        text-align: center;
        cursor: pointer
    }

    .my-upload--picture-card {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        cursor: pointer;
        line-height: 200px;
        vertical-align: top
    }

    .my-upload--picture-card i {
        font-size: 28px;
        color: #8c939d
    }

    .my-upload--picture-card:hover {
        border-color: #20a0ff;
        color: #20a0ff
    }
</style>