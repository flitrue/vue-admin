<template>
    <div class="register-body">
        <el-row type="flex" justify="center">
            <el-col :xs="18" :sm="18" :md="18" :lg="18">
                <div class="registerWarp">
                    <div class="register-form">
                        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
                            <el-steps :space="'33%'" :active="active" :align-center="true" :center="true" finish-status="success">
                                <el-step title="步骤一" description="请使用企业邮箱注册"></el-step>
                                <el-step title="步骤二" description="选择入职部门和应聘职位"></el-step>
                                <el-step title="步骤三" description="填写必要的用户信息"></el-step>
                            </el-steps>
                            <div class="register-content">
                                <div class="register-step" v-if="active==1">
                                    <el-row :gutter="10" type="flex" justify="center">
                                        <div class="register-step1">
                                            <el-form-item prop="email">
                                                <el-input v-model.trim="form.email" placeholder="企业邮箱：" class="form-input"></el-input>
                                            </el-form-item>
                                            <el-form-item prop="code">
                                                <el-input v-model.number="form.code" placeholder="验证码：" class="form-input code"></el-input>
                                                <el-button class="form-code" @click="submit_code" :disabled="isCode">{{codeText}}</el-button>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button size="large" class="form-submit" :disabled="isStep1" @click="submit_step1">下一步</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-row>
                                </div>
                                <div class="register-step" v-if="active==2">
                                    <el-row :gutter="10" type="flex" justify="center">
                                        <div class="register-step2">
                                            <el-form-item prop="depart">
                                                <el-select v-model="form.depart" placeholder="请选择入职部门">
                                                    <el-option
                                                            v-for="item in options"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>

                                            <el-form-item prop="position">
                                                <el-input v-model.trim="form.position" placeholder="应聘职位"></el-input>
                                            </el-form-item>

                                            <el-form-item>
                                                <el-button size="large" class="form-submit" @click="submit_step2">下一步</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-row>
                                </div>
                                <div class="register-step" v-if="active==3">
                                    <el-row :gutter="10" type="flex" justify="center">
                                        <div class="register-step3">

                                            <el-form-item label="姓名" prop="name">
                                                <el-input v-model.trim="form.name" placeholder="请输入姓名："></el-input>
                                            </el-form-item>
                                            <el-form-item label="性别" prop="sex">
                                                <el-radio-group v-model="form.sex">
                                                    <el-radio label="男"></el-radio>
                                                    <el-radio label="女"></el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item label="生日" prop="brith">
                                                <el-date-picker type="date" placeholder="选择日期：" :picker-options="pickerOptions" :clearable="false" v-model="form.brith" @change="changeDate"></el-date-picker>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button size="large" class="form-submit" :disabled="isStep3" @click="submit_step3">完成</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-row>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import {sendMail,step1R,departInfo,register} from "../../widgets/Api";
    import _ from "lodash"

    export default {
        data(){
            return {
                active: 1,
                form: {
                    name: "",
                    sex: "男",
                    brith: "",
                    email: "",
                    code: "",
                    depart: "",
                    position: ""
                },
                rules: {
                    email: [{required: true, message: '请输入企业邮箱！', trigger: 'blur'}],
                    code: [{type: 'number',required: true, message: '请输入验证码！',trigger: 'blur'}],
                    depart: [{ required: true, message: '请选择入职部门', trigger: 'change' }],
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    position: [{ required: true, message: '请输入应聘职位', trigger: 'blur' }],
                    sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                codeText: "发送验证码",
                isCode: false,
                isStep1: false,
                isStep3: false,
                isSubmit: false,
                options: [],
            }
        },
        methods: {
            changeDate(val){
              this.form.brith = val;
            },
            submit_code(){
                let time = 60;
                this.isCode = true;
                this.codeText = "重新发送("+time+"s)";
                let jishi = setInterval( () => {
                    time--;
                    this.codeText = "重新发送("+time+"s)";
                    if(time == 0){
                        this.isCode = false;
                        this.codeText = "发送验证码";
                        clearInterval(jishi);
                    }
                },1000)
                sendMail({params: {email: this.form.email}}).then( ({data:{code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            message: msg,
                            type: "success"
                        });
                    }else{
                        this.$message({
                            message: msg,
                            type: "warning"
                        });
                    }
                });
            },
            submit_step1(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.isStep1 = true;
                        step1R({params: {code: this.form.code, email: this.form.email}}).then( ({data:{code, data, msg}}) => {
                            if(code == 0){
                                this.$message({
                                    message: msg,
                                    type: "success"
                                });
                                this.active = 2;
                            }else{
                                this.isStep1 = false;
                                this.$message({
                                    message: msg,
                                    type: "warning"
                                });
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            submit_step2(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.active = 3;
                    }
                });
            },
            submit_step3(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        register(this.form).then( ({data: { code, data, msg}}) => {
                            if(code == 0){
                                this.$message({
                                    message: msg,
                                    type: "success"
                                });
                                this.$router.push({name: "login"});
                            }else{
                                this.$message({
                                    message: msg,
                                    type: "warning"
                                });
                            }
                        });
                    }
                });
            },
            getDepart(){
                departInfo().then( ({data: {code, data, msg}}) => {
                    let arr = [];
                    data.forEach( data => {
                        let obj = {
                            value: "",
                            label: ""
                        };
                        obj.value = data.id;
                        obj.label = data.name;
                        arr.push(obj);
                    });

                    this.options = arr;
                });
            }
        },
        mounted(){
            this.form.brith = new Date().toLocaleDateString().replace(/\//g,"-");
            this.getDepart();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss">
    .register-body{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url(./images/login_bg.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .registerWarp{
            position: relative;
            padding: 25px 15px;
            margin: 100px auto;
            background-color: #fff;
            border-radius: 5px;
            .form-input {
                input,select {
                    width: 100%;
                    font-size: 12px;
                    height: 40px;
                    border: 1px solid #eaeaec;
                    background: #eaeaec;
                    border-radius: 5px;
                    color: #555;
                }
            }
            .form-code{
                color: #6bc5a4;
                border-color: #6bc5a4;
            }
            .form-code:hover{
                color: #6bc5a4;
                border-color: #6bc5a4;
            }
            .form-submit {
                width: 100%;
                color: #fff;
                border-color: #6bc5a4;
                background: #6bc5a4;
                &:active, &:hover {
                    border-color: #6bc5a4;
                    background: #6bc5a4;
                }
            }
            .form-input.code{
                width: 50%;
                input{
                    width: 100%;
                }
            }
            .register-step{
                min-height: 300px;
            }
            .register-step1{
                padding-top: 60px;
                margin-right: 80px;
            }
            .register-step2{
                padding-top: 60px;
                margin-right: 80px;
            }
            .register-step3{
                padding-top: 60px;
            }
        }
        .register-content{
            margin: 10px;
        }
    }
</style>