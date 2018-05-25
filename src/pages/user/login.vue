<template>
    <div class="login-body">
        <div class="loginWarp"
             v-loading="load_data"
             element-loading-text="正在登陆中...">
            <div class="login-title">
                <img src="./images/login_logo.png"/>
            </div>
            <div class="login-form">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="0">
                    <el-form-item prop="email" class="login-item">
                        <el-input v-model.trim="form.email" placeholder="请输入邮箱或手机号：" class="form-input"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" class="login-item">
                        <el-input type="password" v-model="form.password" placeholder="请输入密码：" class="form-input"></el-input>
                    </el-form-item>
                    <el-form-item class="login-item">
                        <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="login-other">
                <router-link to="/user/register">注册</router-link> |
                <router-link to="/user/reset">重置密码</router-link>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Cookie from "js-cookie"
    import {mapActions} from "vuex"
    import {login,info} from "../../widgets/Api"

    export default{
        data(){
            return {
                form: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [{required: true, message: '请输入邮箱或手机号！', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码！', trigger: 'blur'}]
                },
                //请求时的loading效果
                load_data: false
            }
        },
        mounted(){
            document.onkeydown = (event) => {
                let e = event || window.event || arguments.callee.caller.arguments[0]
                if (e && e.keyCode == 13) {
                    this.submit_form()
                }
            }
        },
        methods: {
            ...mapActions(['set_user_info']),
            submit_form() {
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        this.load_data = true
                        //登录提交
                        login({params: this.form}).then(({data:{code, data, msg}}) => {

                            if(code == 0){
                                Cookie.set("_email",data.email);
                                Cookie.set("_uid",data.id);
                                this.$message({
                                    message: msg,
                                    type: 'success'
                                })
                                this.getInfo();
                                setTimeout(() => {
                                    this.$router.push({name: 'home'})
                                }, 500)
                            }
                            this.load_data = false
                        });
                    } else {
                        return false
                    }
                })
            },
            getInfo(){
                info({}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.set_user_info({
                            user: data,
                            is_login: true
                        });
                    }
                });
            }
        },
        destroyed(){
            document.onkeydown = null
        }
    }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss">
    .login-body {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url(./images/login_bg.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        .loginWarp {
            position: relative;
            width: 300px;
            padding: 25px 15px;
            margin: 100px auto;
            background-color: #fff;
            border-radius: 5px;
            .login-title {
                margin-bottom: 25px;
                text-align: center;
            }
            .login-item {
                .el-input__inner {
                    margin: 0 !important;
                }
            }
            .form-input {
                input {
                    font-size: 12px;
                    height: 40px;
                    border: 1px solid #eaeaec;
                    background: #eaeaec;
                    border-radius: 5px;
                    color: #555;
                }
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
            .login-other{
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
    }
</style>