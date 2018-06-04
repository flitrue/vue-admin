<template>
    <div>
        <a href="http://mis.flitrue.site/api/person/excel" target="_blank"><el-button type="primary" style="margin-bottom: 10px;">导出为Excel</el-button></a>
        <el-table
                :data="tableData"
                border
                stripe

                @cell-click="cellClick"
                :default-sort = "{prop: 'buytime', order: 'descending'}"
        >
            <el-table-column
                    prop="name"
                    label="姓名"
                    sortable
                    width="100">
                <template scope="scope">
                    <a href="javascript: ;" @click="detail(scope.row.id)">{{scope.row.name}}</a>
                </template>
            </el-table-column>

            <el-table-column
                    label="状态"
                    sortable
                    width="100">
                <template scope="scope">
                    <span v-show="show !== scope.row.id"><i class="edit el-icon-edit"></i>{{ scope.row.status }}</span>
                    <span v-show="show === scope.row.id" style="position: relative">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="scope.row.status"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        @select="handleSelect"
                                ></el-autocomplete>
                            </span>

                </template>
            </el-table-column>

            <el-table-column
                    prop="email"
                    label="邮箱"
                    sortable
                    width="200">
            </el-table-column>

            <el-table-column
                    prop="sex"
                    label="性别"
                    sortable
                    width="100">
            </el-table-column>

            <el-table-column
                    prop="depart"
                    label="部门"
                    sortable
                    width="130">
            </el-table-column>

            <el-table-column
                    prop="position"
                    sortable
                    label="职位"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="entrytime"
                    sortable
                    label="入职时间">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.entrytime }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="80">
                <template scope="scope">
                    <el-popover placement="right" title="" width="50px" trigger="hover" content="">
                        <el-button type="primary" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="info" size="mini" @click="sendemail(scope.$index, scope.row)">发送邮件</el-button>

                        <i class="fa fa-ellipsis-h" slot="reference" aria-hidden="true"></i>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="pagenow"
                            :page-size="pagesize"
                            layout="total, prev, pager, next"
                            :total="total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>

        <el-dialog title="发送邮件" v-model="show1" size="tiny" :modal="false">
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
                <el-button @click="show1 = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {personInfo,personExcel,sendEmail,personStatusChange} from "../../widgets/Api"
    import _ from "lodash"

    export default {
        data(){
            return {
                pagenow: 1,
                pagesize: 20,
                total: 0,
                tableData: [],
                show: false,
                show1: false,
                form: {
                    email: "",
                    subject: "",
                    content: ""
                },
                restaurants: [
                    {id: 0, "value": "审核中"},
                    {id: 1, "value": "在职"},
                    {id: 2, "value": "离职"},
                ]
            }
        },
        methods: {
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                cb(restaurants);
            },
            handleSelect(item) {
                this.show = 0;

                let data = {
                    uid: this.row.id,
                    status: item.id
                }
                personStatusChange({params: data}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){

                    }
                });
            },
            cellClick(row,column,cell,event){
                console.log("peoplelist", column);
                if(column.label == "状态"){
                    this.show = row.id;
                }
                this.row = row;
            },
            detail(id){
                this.$router.push({name: "personDetail",params: {id: id}});
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleCurrentChange(val) {
                this.pagenow = val;
                this.getInfo(val);
            },
            getInfo(){
                personInfo().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        _.map(data.info, item => {
                            if(item.status == 0){
                                item.status = "审核中";
                            }else if( item.status == 1){
                                item.status = "在职";
                            }else if( item.status == 2){
                                item.status = "离职";
                            }
                        });
                        this.total = data.info.length;
                        this.tableData = data.info;
                    }
                });
            },
            edit(index,row){
                this.$router.push({name: "personEdit",params: {id:row.id}});
            },
            downExcel(){
                personExcel().then( () => {

                });
            },
            submit(){

                sendEmail({params: this.form}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: msg
                        });
                        this.show1 = false;
                        this.form = {};
                    }
                });
            },
            sendemail(index, row){
                this.show1 = true;
                this.form.email = row.email;
            }
        },
        mounted(){
            this.getInfo();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss">
    .el-table__header-wrapper{
        user-select: none;
    }
    .edit{
        font-size: 10px;
        color: #65CEA7;
        margin-right: 10px;
    }
</style>