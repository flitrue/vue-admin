<template>
    <div class="vue-image-crop-upload" v-show="value">
        <el-card class="box-card vicp-wrap">
            <div slot="header" class="clearfix">
                上传到
                <el-select v-model="albumname" placeholder="请选择">
                    <el-option
                            v-for="item in category"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        <span style="float: left">{{ item.name }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.photocount }}张</span>
                    </el-option>
                </el-select>
                <el-button @click="submit">开始上传</el-button>
            </div>
            <div class="vicp-close" @click="off">
                <i class="vicp-icon4 fa fa-close"></i>
            </div>
            <div class="upload">
                <el-upload
                        ref="upload"
                        :action="action"
                        multiple
                        name="img"
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :modal="false" :modal-append-to-body="false" v-model="dialogVisible" size="tiny">
                    <div style="text-align: center;">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </div>

</template>

<script>
    import {albumCategory,albumInfo, photoAdd} from "../../widgets/Api"
    import Cookie from "js-cookie"

    export default {
        name: "albumUpload",
        props: {
            value: {
                type: Boolean,
                "default": false
            },
            albumname: {
                type: String,
                "default": "0"
            }
        },
        data() {
            const langBag = {
                    zh: {
                        hint: '点击，或拖动图片至此处',
                        loading: '正在上传……',
                        noSupported: '浏览器不支持该功能，请使用IE10以上或其他现在浏览器！',
                        success: '上传成功',
                        fail: '图片上传失败',
                        preview: '头像预览',
                        btn: {
                            off: '取消',
                            close: '关闭',
                            back: '上一步',
                            save: '保存'
                        },
                        error: {
                            onlyImg: '仅限图片格式',
                            outOfSize: '单文件大小不能超过 ',
                            lowestPx: '图片最低像素为（宽*高）：'
                        }
                    },
                    en: {
                        hint: 'Click, or drag the file here',
                        loading: 'Uploading……',
                        noSupported: 'Browser does not support, please use IE10+ or other browsers',
                        success: 'Upload success',
                        fail: 'Upload failed',
                        preview: 'Preview',
                        btn: {
                            off: 'Cancel',
                            close: 'Close',
                            back: 'Back',
                            save: 'Save'
                        },
                        error: {
                            onlyImg: 'Image only',
                            outOfSize: 'Image exceeds size limit: ',
                            lowestPx: 'The lowest pixel in the image: '
                        }
                    }
                };
            return {
                // 判断是否触摸屏
                isSupportTouch: document.hasOwnProperty("ontouchstart"),
                dialogImageUrl: "",
                category: [],
                dialogVisible: false,
                action: "http://mis.flitrue.site/api/album/upload",
                imglist: [],
                isClear: false
            }
        },
        watch: {
            value() {

            }
        },
        methods: {
            handleRemove(file, fileList) {
                for(let i=0;i<this.imglist.length;i++){
                    if(file.uid == this.imglist[i].uid){
                        this.imglist.splice(i,1);
                    }
                }
            },
            handleAvatarSuccess(res,file){
                let obj = {
                    url: res.url,
                    uid: file.uid
                };
                this.imglist.push(obj);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 点击波纹效果
            ripple(e) {
                effectRipple(e);
            },
            // 关闭控件
            off() {
                let that = this;
                setTimeout(function() {
                    that.$emit('close', false);
                }, 200);
            },
            /* ---------------------------------------------------------------*/
            // 检测选择的文件是否合适
            checkFile(file) {
                let that = this,
                    {
                        lang,
                        maxSize
                    } = that;
                // 仅限图片
                if (file.type.indexOf('image') === -1) {
                    that.hasError = true;
                    that.errorMsg = lang.error.onlyImg;
                    return false;
                }
                // 超出大小
                if (file.size / 1024 > maxSize) {
                    that.hasError = true;
                    that.errorMsg = lang.error.outOfSize + maxSize + 'kb';
                    return false;
                }
                return true;
            },
            getCategory(){
                let uid = Cookie.get("_uid");
                albumInfo({uid: uid}).then( ({data: {code, data, msg}}) => {
                  if(code == 0){
                      this.albumname = data[0].id;
                      this.category = data;
                  }
                })
            },
            submit(){
                photoAdd({aid: this.albumname,imglist: this.imglist}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "照片上传成功！"
                        });
                        this.$parent.show = false;
                        this.$parent.getInfo();
                        this.$refs.upload.clearFiles();
                    }
                })
            }
        },
        mounted(){
            this.getCategory();
        }
    }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    @-webkit-keyframes vicp {
        0% {
            opacity: 0;
            -webkit-transform: scale(0) translatey(-60px);
            transform: scale(0) translatey(-60px); }
        100% {
            opacity: 1;
            -webkit-transform: scale(1) translatey(0);
            transform: scale(1) translatey(0); }
    }

    @keyframes vicp {
        0% {
            opacity: 0;
            -webkit-transform: scale(0) translatey(-60px);
            transform: scale(0) translatey(-60px); }
        100% {
            opacity: 1;
            -webkit-transform: scale(1) translatey(0);
            transform: scale(1) translatey(0); }
    }

    .vue-image-crop-upload {
        position: fixed;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        z-index: 3000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.65);
        -webkit-tap-highlight-color: transparent;
    }
    .vue-image-crop-upload .vicp-wrap {
        -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
        position: fixed;
        display: block;
        overflow: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 723px;
        height: 380px;
        padding: 25px;
        background-color: #fff;
        border-radius: 2px;
        -webkit-animation: vicp 0.12s ease-in;
        animation: vicp 0.12s ease-in; }
    .vicp-close {
        position: absolute;
        right: 10px;
        top: 15px;
        -webkit-transition: -webkit-transform 0.18s;
        transition: -webkit-transform 0.18s;
    }
    .vicp-close .vicp-icon4 {
        position: relative;
        font-size: 24px;
        color: rgba(0,0,0,0.8);
        cursor: pointer;
    }
    .vicp-close:hover {
        color: #65CEA7;
        -webkit-transform: rotateZ(90deg);
        -ms-transform: rotateZ(90deg);
        transform: rotateZ(90deg);
    }
    .el-select-dropdown__item{
        min-width: 200px;
    }
</style>