<template>
    <div>
        <my-upload field="img" v-show="!isShowUpload"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :width="200"
                   :height="200"
                   :url="url"
                   :params="params"
                   :headers="headers"
                   img-format="png">
        </my-upload>
        <div class="box">
            <div class="person">
                <div style="cursor: pointer">
                    <div @click="removeImg">
                        <img :src="imgDataUrl" title="点击更换头像">
                    </div>
                    <div v-show="isShow" class="my-upload my-upload--picture-card" @click="toggleShow">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
                <div v-show="item != 5" class="person-comment" @click="edit(5)">
                    <p>
                        <i class="edit el-icon-edit"></i><span>简介: </span>
                        {{tableData.comment}}
                    </p>

                </div>
                <div v-show="item == 5">
                    <el-input type="textarea" @blur="submit" :autosize="{ minRows: 10, maxRows: 11}" v-model="tableData.comment">
                    </el-input>
                    <el-button type="text" icon="check" @click="submit(5)"></el-button>
                </div>
            </div>
            <div class="info" :style="'width:'+ width">
                <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                    <tr>
                        <td class="header" @click="edit(1)"><i class="el-icon-edit"></i><span>姓名</span></td>
                        <td class="value header">
                            <div v-show="item != '1'">{{tableData.name}}</div>
                            <div v-show="item == 1">
                                <el-input class="info-input" v-model="tableData.name">
                                    <el-button slot="append" icon="check" @click="submit(1)"></el-button>
                                </el-input>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td @click="edit(2)"><i class="el-icon-edit"></i><span>性别</span></td>
                        <td class="value">
                            <div v-show="item != 2"><i class="sex fa" :class="'fa-'+tableData.type" :style="'color:'+ tableData.color"></i></div>
                            <div v-show="item == 2" :style="{backgoundColor:tableData1.color1}">
                                <span @click="selectSex('男')"><i class="sex fa fa-male" :style="{color:tableData1.color1}" ></i></span>&nbsp;&nbsp;
                                <span @click="selectSex('女')"><i class="sex fa fa-female" :style="{color:tableData1.color2}"></i></span>
                                <span><el-button style="padding: 0;" type="text" icon="check" @click="submit(2)"></el-button></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td @click="edit(3)"><i class="el-icon-edit"></i><span>生日</span></td>
                        <td class="value">
                            <div v-show="item != 3">{{tableData.brith}}</div>
                            <div v-show="item == 3">
                                <el-date-picker type="date" :clearable="false"
                                                :picker-options="pickerOptions"
                                                v-model="tableData.brith"
                                                @change="changeTime">
                                </el-date-picker>
                                <el-button icon="check" @click="submit(3)"></el-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td @click="edit(4)"><i class="el-icon-edit"></i><span>手机号</span></td>
                        <td class="value">
                            <div v-show="item != 4">{{tableData.phone}}</div>
                            <el-input v-show="item == 4" class="info-input" v-model="tableData.phone" >
                                <el-button slot="append" icon="check" @click="submit(4)"></el-button>
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;<span>邮箱</span></td>
                        <td class="value">
                            <div>{{tableData.email}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;<span>部门</span></td>
                        <td class="value">
                            <div>{{tableData.depart}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;<span>职位</span></td>
                        <td class="value">
                            <div>{{tableData.position}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;&nbsp;<span>入职时间</span></td>
                        <td class="value">
                            <div>{{tableData.entrytime}}</div>
                        </td>
                    </tr>
                </table>

                <div class="word-cloud" style="height: 400px;">
                    <div id="wordCloud" style="width: 90%;height: 100%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import myUpload from '../upload/upload.vue';
    import {info,getWordCloud,save,getDataUrl}   from "../../widgets/Api"
    import echarts from 'echarts';
    import WordCloud from "echarts-wordcloud";
    import Cookie from "js-cookie"

    export default {

        data(){
            return {
                url: "",
                item: 0,
                width: "",
                dataUrl: "",
                tableData: {
                    name: "",
                    sex: "",
                    type: "",
                    color: "",
                    brith: "",
                    age: "",
                    avatar: "",
                    phone: "",
                    email: "",
                    depart: "",
                    position: "",
                    entrytime: "",
                    comment: "暂无我的简介",
                    wordcloud: []
                },
                tableData1: {
                    name: "",
                    sex: "",
                    type: "",
                    color1: "gray",
                    color2: "gray",
                    brith: "",
                    age: "",
                    avatar: "",
                    phone: "",
                    email: "",
                    depart: "",
                    position: "",
                    comment: "",
                    wordcloud: []
                },
                isShow: true,
                show: false,
                isShowUpload: true,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    //smail: '*'
                },
                imgDataUrl: '', // the datebase64 url of created image
                cloudOption: {
                    //animation: true,
                    title : {
                        text: '同事印象',
                        show: true,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: 'rgba(0,0,0,0.8)'
                        }
                    },
                    tooltip: {
                        show: true
                    },
                    series: [{
                        type: 'wordCloud',
                        gridSize: 1,
                        //shape: "pentagon",
                        sizeRange: [12, 35], // 文字大小范围(px)
                        maskImage: {},
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgb(' + [
                                            Math.round(Math.random() * 255),
                                            Math.round(Math.random() * 255),
                                            Math.round(Math.random() * 255)
                                        ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#eee'
                            }
                        },
                        //sizeRange: [12, 50],
                        data: []
                    }]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        components: {
            myUpload
        },
        methods: {
            changeTime(val){
                this.tableData.brith = val;
            },
            init(){
                const h = this.$createElement;
                this.$notify({
                    title: '',
                    message: h('i', { class: 'el-icon-edit', style: "color: #65CEA7"}, "点击带绿色图标可进行编辑"),
                    offset: 100,
                    duration: 5000
                });
            },
            selectSex(id){
                if(id == "男"){
                    this.tableData1.color2 = "gray";
                    this.tableData1.color1 = "#00CCFE";
                    this.tableData.color = "#00CCFE";
                    this.tableData1.type = "male";
                }else{
                    this.tableData1.color2 = "#F94EB7";
                    this.tableData1.color1 = "gray";
                    this.tableData.color = "#F94EB7";
                    this.tableData1.type = "female";
                }
                this.tableData1.sex = id;
            },
            submit(id){
                switch (id){
                    case 1:
                        this.tableData1.name = this.tableData.name;
                        this.save({name: this.tableData1.name});
                        break;
                    case 2:
                        this.tableData.sex = this.tableData1.sex;
                        this.tableData.type = this.tableData1.type;
                        this.save({sex: this.tableData1.sex});
                        break;
                    case 3:
                        this.tableData1.brith = this.tableData.brith;
                        this.save({brith: this.tableData1.brith});
                        break;
                    case 4:
                        this.tableData1.phone = this.tableData.phone;
                        this.save({phone: this.tableData1.phone});
                        break;
                    case 5:
                        this.tableData1.comment = this.tableData.comment;
                        this.save({comment: this.tableData1.comment});
                        break;
                }
                this.item = 0;
            },
            save(field){
                save({params: field}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){

                    }
                })
            },
            edit(id){
                this.item = id;
                if(id == 2){
                    if(this.tableData.color == "#00CCFE"){
                        this.tableData1.color1 = "#00CCFE";
                        this.tableData1.color2 = "gray";
                    }else{
                        this.tableData1.color2 = "#F94EB7";
                        this.tableData1.color1 = "gray";
                    }
                }
            },
            draw(){
                let wordcloud = echarts.init(document.getElementById("wordCloud"));
                let maskImage = new Image();
                maskImage.src = this.dataUrl;
                this.cloudOption.series[0].maskImage = maskImage;
                maskImage.onload = () => {
                    wordcloud.setOption(this.cloudOption);
                }
            },
            getDataUrl(){

                getDataUrl({params: {uid: Cookie.get("_uid")}}).then(({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.dataUrl = data;
                        this.draw();
                    }
                });
            },
            getWordCloud(){
                let uid = Cookie.get("_uid");
                getWordCloud({params: {uid: uid}}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        if(data.length>0){
                            this.cloudOption.series[0].data = data;
                        }else{
                            this.cloudOption.series[0].textRotation = [0];
                            this.cloudOption.series[0].data = [{
                                name: "暂无同事印象",
                                value: "100"
                            }];
                        }
                    }
                })
            },
            toggleShow() {
                this.show = !this.show;
            },
            removeImg(){
                if(this.imgDataUrl){
                    //this.imgDataUrl = ''
                    this.toggleShow();
                }
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
                this.isShowUpload = false;
            },
            /**
             * upload success
             *
             * [param] jsonData   服务器返回数据，已进行json转码
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);
            },
            getInfo(){
                info().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.tableData.name = data.name;
                        if(data.sex == "男"){

                            this.tableData.type = "male";
                            this.tableData.color = "#00CCFE";
                        }else{
                            this.tableData.type = "female";
                            this.tableData.color = "#F94EB7";
                        }
                        this.tableData.sex = data.sex;
                        this.tableData.age = new Date().getFullYear() - data.brith.substring(0,4) + "岁";
                        this.tableData.brith = data.brith;
                        this.tableData.phone = data.phone;
                        this.tableData.email = data.email;
                        this.tableData.depart = data.depart;
                        this.tableData.position = data.position;
                        this.tableData.entrytime = data.entrytime;
                        if(data.comment){
                            this.tableData.comment = data.comment;
                        }
                        this.tableData.wordcloud = data.wordcloud;
                        if(data.avatar){
                            this.imgDataUrl = data.avatar;
                            this.isShow = false;
                        }

                    }
                })
            }
        },
        mounted(){
            this.url = "http://mis.flitrue.site/api/user/saveAvatar?uid="+Cookie.get("_uid");
            this.init();
            this.getInfo();
            this.getWordCloud();
            this.getDataUrl();
            this.width = document.getElementById("tabs").offsetWidth - 250 + "px";
            window.onresize = () => {
                this.draw();
            }
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    @import "info";
</style>