<template>
    <div>
        <div class="panel">
            <div class="panel-title">
                修改密码
            </div>
            <div class="panel-body">

                <el-row :gutter="10">
                    <el-col :xs="24" :sm="16" :md="10" :lg="8">
                        <el-form ref="ruleForm" :label-position="labelPosition" :rules="rules" label-width="100px" :model="formLabelAlign">
                            <el-form-item prop="oldpwd" label="旧密码">
                                <el-input type="password" v-model.trim="formLabelAlign.oldpwd"></el-input>
                            </el-form-item>
                            <el-form-item prop="newpwd1" label="新密码">
                                <el-input type="password" v-model.trim="formLabelAlign.newpwd1"></el-input>
                            </el-form-item>
                            <el-form-item prop="newpwd" label="确认密码">
                                <el-input type="password" v-model.trim="formLabelAlign.newpwd"></el-input>
                            </el-form-item>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submit_form">确定</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {modifyPwd} from "../../widgets/Api"

    export default {
        data(){
            let validatePass1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formLabelAlign.newpwd !== '') {
                        this.$refs.ruleForm.validateField('newpwd');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formLabelAlign.newpwd1) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    oldpwd: '',
                    newpwd1: '',
                    newpwd: ''
                },
                rules: {
                    oldpwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
                    newpwd1: [{validator: validatePass1,required: true, trigger: 'blur'}],
                    newpwd: [{validator: validatePass2,required: true, trigger: 'blur' }],
                }
            }
        },
        methods: {
            submit_form(){
                this.$refs["ruleForm"].validate((valid) => {
                    if (valid) {
                        modifyPwd({params: this.formLabelAlign}).then( ({data: {code, data, msg}}) => {
                            if(code == 0){
                                this.$message({
                                    type: "success",
                                    message: msg
                                });
                                this.formLabelAlign.oldpwd = "";
                                this.formLabelAlign.newpwd1 = "";
                                this.formLabelAlign.newpwd = "";
                            }
                        });
                    }
                });
            }
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>

</style>