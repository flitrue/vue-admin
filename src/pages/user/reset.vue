<template>
    <div class="register-body">
        <el-row type="flex" justify="center">
            <el-col :gutter="10" :span="5">
                <div class="registerWarp">
                    <div class="register-form">
                        <el-form ref="ruleForm" :model="form" :rules="rules">
                            <el-form-item prop="email">
                                <el-input v-model.trim="form.email" placeholder="企业邮箱：" class="form-input"></el-input>
                            </el-form-item>
                            <el-form-item prop="code">
                                <el-input v-model.number="form.code" placeholder="验证码：" class="form-input code"></el-input>
                                <el-button class="form-code" @click="submit_code" :disabled="isCode">{{codeText}}</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="large" class="form-submit" :disabled="isSubmit" @click="submit">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="return">
                        <router-link to="/user/login">返回登录</router-link>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import {sendMail,reset} from "../../widgets/Api";

    export default {
        data(){
            return {
                active: 1,
                form: {
                    email: "",
                    code: ""
                },
                rules: {
                    email: [{required: true, message: '请输入企业邮箱！', trigger: 'blur'}],
                    code: [{type: 'number',required: true, message: '请输入验证码！',trigger: 'blur'}]
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                codeText: "发送验证码",
                isCode: false,
                isSubmit: false,
            }
        },
        methods: {
            submit_code(){
                let time = 60;
                this.isCode = true;
                this.codeText = "重新发送("+time+"s)";
                let jishi = setInterval(function () {
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
                    }
                });
            },
            submit(){
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        this.isSubmit = true;
                        reset({params: {code: this.form.code,email: this.form.email}}).then( ({data:{code, data, msg}}) => {
                            if(code == 0){
                                this.$message({
                                    message: "密码重置成功,请到邮箱查看。",
                                    type: "success"
                                });
                                this.$router.push({name: "login"});
                            }
                        });
                    }
                });

            }
        },
        mounted(){

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
        }
        .register-content{
            margin: 10px;
        }
        .return{
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 14px;
            padding: 5px;
            color: #6bc5a4;
            a{
                color: #6bc5a4;
            }
        }
    }
</style>