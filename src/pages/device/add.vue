<template>
    <div class="mypanel">
        <el-row>
            <el-col :span="2">
                <div style="min-height: 36px;background: white;"> </div>
            </el-col>
            <el-col :xs="20" :sm="20" :md="16" :lg="15">
                <el-form ref="form" :model="form" label-width="100px">

                    <el-form-item label="设备类型">
                        <el-cascader
                                placeholder="请选择类型"
                                :options="categorys"
                                change-on-select
                                v-model="form.category"
                                @change="change"
                        ></el-cascader>
                    </el-form-item>

                    <el-form-item :label="category+'品牌'">
                        <el-select v-if="show" v-model="form.brand" placeholder="请选择品牌">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input v-if="!show" v-model="form.brand"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item :label="category+'型号'">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input v-model="form.version"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="序列号">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input v-model="form.code"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="标签">
                        <div>
                            <el-tag
                                    v-for="tag in form.tags"
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

                    </el-form-item>

                    <el-form-item label="购买时间">
                        <el-col :span="11">
                            <el-date-picker type="date" :clearable="false" :picker-options="pickerOptions" v-model="form.buytime" @change="changeTime"></el-date-picker>
                        </el-col>
                    </el-form-item>


                    <el-form :inline="true" label-width="100px">
                        <el-form-item label="价钱">
                            <el-input style="width: 120px" placeholder="" size="small" v-model="form.price">
                                <template slot="prepend">¥</template>
                            </el-input>
                        </el-form-item>

                        <!--<el-form-item label="个数">
                            <el-input-number size="small" v-model="form.num"  :min="1"></el-input-number>
                        </el-form-item>-->
                    </el-form>

                    <el-form-item label="购买途径">
                        <el-radio-group v-model="form.buyway">
                            <el-radio label="网购"></el-radio>
                            <el-radio label="线下实体店"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!--<el-form-item label="立即分配">
                        <el-switch
                                   on-text="on"
                                   off-text="off"
                                   on-color="#13ce66"
                                   off-color="gray"
                                   v-model="form.isAssign">
                        </el-switch>
                    </el-form-item>-->

                    <el-form-item>
                        <el-collapse>
                            <el-collapse-item title="添加更多信息">
                                <div ref="editor"></div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import "../../../static/UEditor/ueditor.config"
    import "../../../static/UEditor/ueditor.all.min"
    import '../../../static/UEditor/lang/zh-cn/zh-cn'
    import {deviceAdd,deviceDetail} from "../../widgets/Api"

    export default {
        data() {
            return {
                id: 'myeditor' + Math.random(10),
                ue: {},
                show: true,
                form: {
                    category: [],
                    brand: "",
                    version: '',
                    code: "",
                    price: 0,
                    num: 1,
                    buytime: "",
                    buyway: '网购',
                    isAssign: false,
                    remarks: "",
                    tags: []
                },
                colors: ["gray","danger","primary","success","warning"],
                category: "",
                categorys: [
                    {
                        value: '电脑',
                        label: '电脑',
                        children: [{
                            value: '笔记本',
                            label: '笔记本'
                        }, {
                            value: '台式机',
                            label: '台式机'
                        }, {
                            value: '一体机',
                            label: '一体机'
                        }]
                    }, {
                        value: '手机',
                        label: '手机',
                    }, {
                        value: '打印机',
                        label: '打印机'
                    }, {
                        value: '工具',
                        label: '工具',
                    }],
                options: [],
                options1: [
                    {
                        value: '苹果',
                        label: '苹果',
                    }, {
                        value: '三星',
                        label: '三星',
                    }, {
                        value: '联想',
                        label: '联想',
                    }, {
                        value: '戴尔',
                        label: '戴尔',
                    }, {
                        value: '华硕',
                        label: '华硕',
                    },
                ],
                options2: [
                    {
                        value: '苹果',
                        label: '苹果',
                    }, {
                        value: '三星',
                        label: '三星',
                    }, {
                        value: '小米',
                        label: '小米',
                    }, {
                        value: 'vivo',
                        label: 'vivo',
                    }, {
                        value: 'OPPO',
                        label: 'OPPO',
                    },
                ],
                options3: [
                    {
                        value: '惠普',
                        label: '惠普',
                    }, {
                        value: '佳能',
                        label: '佳能',
                    }, {
                        value: '兄弟',
                        label: '兄弟',
                    }, {
                        value: '爱普生',
                        label: '爱普生',
                    }, {
                        value: '三星',
                        label: '三星',
                    },
                ],
                inputVisible: false,
                inputValue: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        methods: {
            changeTime(val){
                this.form.buytime = val;
            },
            change(item){
                this.show = true;
                this.form.brand = "";
                this.category = item[0];
                switch (item[0]){
                    case "电脑":
                        this.options = this.options1;
                        break;
                    case "手机":
                        this.options = this.options2;
                        break;
                     case "打印机":
                        this.options = this.options3;
                        break;
                     case "工具":
                        this.show = false;
                        break;
                }
            },
            handleClose(tag) {
                this.form.tags.splice(this.form.tags.indexOf(tag), 1);
            },
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
                        type: this.colors[this.form.tags.length]
                    };
                    this.form.tags.push(obj);
                }
            },
            handleInputConfirm() {
                let value = this.inputValue;
                this.addTag(value);
                this.inputVisible = false;
                this.inputValue = '';
            },
            onSubmit(){
                this.form.remarks = this.ue.getContent();

                deviceAdd(this.form).then( ({data: {code, data, msg}}) => {
                    if(code ==0){
                        this.$message({
                            type: "success",
                            message: msg
                        })
                    }
                });
            }
        },
        mounted(){
            this.form.buytime = new Date().toLocaleDateString().replace(/\//g,"-");
            this.$nextTick(() => {
                this.$refs.editor.id = this.id;
                this.ue = UE.getEditor(this.id,{
                    initialFrameWidth: null,
                    initialFrameHeight: 200
                });
            });
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .mypanel{
        padding-top: 10px;
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