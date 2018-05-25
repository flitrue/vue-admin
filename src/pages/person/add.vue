<template>
    <div class="mypanel">
        <el-row>
            <el-col :span="2">
                <div style="min-height: 36px;background: white;"> </div>
            </el-col>
            <el-col :xs="20" :sm="20" :md="16" :lg="15">
                <el-form ref="form" :model="form" label-width="100px">

                    <el-form-item label="姓名">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input v-model="form.name"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-col :span="11">
                            <el-date-picker type="date" :clearable="false" :picker-options="pickerOptions" v-model="form.brith" @change="changeTime"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="邮箱">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input type="email" v-model="form.email"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="手机号">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input v-model="form.phone"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="部门">
                        <el-select v-model="form.depart" placeholder="请选择部门">
                            <el-option
                                    v-for="item in options"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="职位">
                        <el-col :xs="24" :sm="10" :md="10" :lg="10">
                            <el-input v-model="form.position"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="个人简介">
                        <el-input type="textarea" v-model="form.comment"></el-input>
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
    import {personAdd,departInfo} from "../../widgets/Api"

    export default {
        data() {
            return {
                form: {
                    name: "",
                    sex: "男",
                    brith: "",
                    depart: "",
                    position: "",
                    comment: "",
                    email: "",
                    phone: ""
                },
                options: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        methods: {
            changeTime(val){
                this.form.brith = val;
            },
            onSubmit(){
                console.log(this.form);
                personAdd(this.form).then( ({data: {code, data, msg}}) => {
                    if(code ==0){
                        this.$message({
                            type: "success",
                            message: msg
                        })
                    }
                });
            },
            getDepart(){
                departInfo().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.options = data;
                    }
                })
            }
        },
        mounted(){
            this.form.brith = new Date().toLocaleDateString().replace(/\//g,"-");
            this.getDepart();
            this.$nextTick(() => {

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