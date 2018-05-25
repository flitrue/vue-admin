<template>
    <div id="tabs" class="mypanel">
        <div class="box">
            <div class="person">
                <div style="cursor: pointer">
                    <div>
                        <img :src="imgDataUrl" onerror="this.src='/static/avatar.jpg'" title="点击更换头像">
                    </div>
                </div>
                <div class="person-comment">
                    <p>
                        <span>简介: </span>
                        {{tableData.comment}}
                    </p>

                </div>
            </div>
            <div class="info" :style="'width:'+ width">
                <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                    <tr>
                        <td class="header"><span>姓名</span></td>
                        <td class="value header">
                            <div>{{tableData.name}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td><span>性别</span></td>
                        <td class="value">
                            <div><i class="sex fa" :class="'fa-'+tableData.type" :style="'color:'+ tableData.color"></i></div>
                        </td>
                    </tr>
                    <tr>
                        <td><span>生日</span></td>
                        <td class="value">
                            <div>{{tableData.brith}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td><span>手机号</span></td>
                        <td class="value">
                            <div>{{tableData.phone}}</div>
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

                <div class="word-cloud" style="width: 100%;height: 200px;">
                    <div class="addword">
                        <el-button type="text" @click="show = true">添加印象</el-button>
                    </div>
                    <div id="wordCloud" style="width: 90%;height: 100%;"></div>
                </div>
            </div>
        </div>
        <el-dialog title="添加同事印象" v-model="show" size="tiny" :modal="false" :modal-append-to-body="false">
            <div>
                <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        :closable="true"
                        :type="tag.type"
                        :close-transition="false"
                        @close="handleClose(tag)"
                >
                    {{tag.name}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model.trim="inputValue"
                        ref="saveTagInput"
                        size="mini"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="addWordCloud">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {getWordCloud,save,personOne,addWordCloud} from "../../../widgets/Api"
    import echarts from 'echarts';
    import WordCloud from "echarts-wordcloud";

    export default {

        data(){
            return {
                colors: ["gray","danger","primary","success","warning"],
                inputVisible: false,
                inputValue: '',
                tags: [],
                item: 0,
                show: false,
                width: "",
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
                    comment: "暂无简介",
                    wordcloud: []
                },
                imgDataUrl: '', // the datebase64 url of created image
                cloudOption: {
                    tooltip: {},
                    animation: true,
                    title : {
                        text: '同事印象',
                        show: true,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: 'rgba(0,0,0,0.8)'
                        }},
                    series: {
                        type: 'wordCloud',
                        gridSize: 2,
                        //shape: "pentagon",
                        tooltip: {
                            show: false
                        },
                        markImage: {},
                        textStyle: {
                            normal: {
                                color: function () {
                                    let color = 'rgb(' + [
                                            Math.round(Math.random() * 255),
                                            Math.round(Math.random() * 255),
                                            Math.round(Math.random() * 255)
                                        ].join(',') + ')';
                                    return color;
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#eee'
                            }
                        },
                        //sizeRange: [12, 50],
                        data: []
                    }
                }
            }
        },
        methods: {
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            addTag(value){
                if (value) {
                    let obj = {
                        name: value,
                        type: this.colors[this.tags.length]
                    };
                    this.tags.push(obj);
                }
            },
            handleInputConfirm() {
                let value = this.inputValue;
                this.addTag(value);
                this.inputVisible = false;
                this.inputValue = '';
            },
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },
            init(){

            },
            draw(){
                let wordcloud = echarts.init(document.getElementById("wordCloud"));
                wordcloud.setOption(this.cloudOption);
            },
            addWordCloud(){
                let data = {
                    uid: this.$route.params.id,
                    wordcloud: this.tags
                };
                addWordCloud({params: data}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.show = false;
                        this.getWordCloud();
                    }
                });
            },
            getWordCloud(){
                let uid = this.$route.params.id;
                getWordCloud({params: {uid: uid}}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        if(data.length > 0){
                            this.cloudOption.series.data = data;
                        }else{
                            this.cloudOption.series.textRotation = [0];
                            this.cloudOption.series.textStyle.normal.color = "red";
                            this.cloudOption.series.data = [{
                                name: "暂无同事印象",
                                value: "100"
                            }];
                        }
                        this.draw();
                    }
                })
            },
            getInfo(){
                let uid = this.$route.params.id;
                personOne({params: {uid: uid}}).then( ({data: {code, data, msg}}) => {
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
                        if(data.brith){
                            this.tableData.age = new Date().getFullYear() - data.brith.substring(0,4) + "岁";
                        }
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

                    }
                })
            },
        },
        mounted(){
            this.getInfo();
            this.getWordCloud();
            this.width = document.getElementById("tabs").offsetWidth - 250 + "px";
            window.onresize = () => {
                this.draw();
            }
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    @import "../info";
    #tabs{
        height: 550px;
    }
    .word-cloud{
        position: relative;
    }
    .addword{
        position: absolute;
        right: 50px;
        top: 5px;
        cursor: pointer;
        z-index: 9999;
    }
    .el-tag{
        margin-left: 10px;
    }
    .button-new-tag{
        margin-left: 10px;
        height: 24px;
        line-height: 21px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag{
        width:78px;margin-left:10px;
    }
</style>