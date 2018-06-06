<template>
    <div>
        <el-table
                :data="tableData"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    label="入职时间"
                    width="180">
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.entrytime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <div @click="detail(scope.row.id)"><el-tag>{{ scope.row.name }}</el-tag></div>
                    <el-popover trigger="hover" placement="top">
                        <div style="text-align: center">
                            <img style="width:60px;height: 60px;" :src="scope.row.avatar" alt="头像">
                        </div>
                        <div slot="reference" class="name-wrapper">

                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                    prop="position"
                    label="职位"
                    width="180">
            </el-table-column>

            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="250">
                <template slot-scope="scope">
                    <div class="handler">
                        <el-button
                                size="small"
                                type="info"
                                @click="sendemail(scope.$index, scope.row)">发送邮件</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="发送邮件" v-model="show" size="tiny" :modal="false">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="主题">
                    <el-input v-model="form.subject"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {under,sendEmail} from "../../widgets/Api"

    export default {
        data(){
            return {
                show: false,
                tableData: [],
                form: {
                    email: "",
                    subject: "",
                    content: ""
                }
            }
        },
        methods: {
            detail(id){
                this.$router.push({name: "staffDetail",params: {id: id}});
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            getData(){
                under().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.tableData = data;
                    }
                });
            },
            submit(){

                sendEmail({params: this.form}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: msg
                        });
                        this.show = false;
                        this.form = {};
                    }
                });
            },
            sendemail(index, row){
                this.show = true;
                this.form.email = row.email;
            }
        },
        mounted(){
            this.getData();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>

</style>