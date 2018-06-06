<template>
    <div>
        <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{prop: 'buytime', order: 'descending'}"
                >
            <el-table-column
                    prop="id"
                    label="设备编号"
                    sortable
                    width="130">
            </el-table-column>

            <el-table-column
                    prop="name"
                    label="设备名称"
                    sortable
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="version"
                    label="型号"
                    sortable
                    width="150">

            </el-table-column>

            <el-table-column
                    prop="code"
                    sortable
                    label="序列号"
                    width="150">
            </el-table-column>

            <el-table-column
                    prop="price"
                    label="价格"
                    sortable
                    width="100">
                <template slot-scope="scope">
                    ¥{{ scope.row.price}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="buytime"
                    sortable
                label="领用日期">
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.usetime }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="230">
                <template slot-scope="scope">
                    <div class="handler">
                        <el-button
                                size="small"
                                type="success"
                                @click="detail(scope.$index, scope.row)">查看详情</el-button>
                        <el-button
                                size="small"
                                type="info"
                                @click="repair(scope.$index, scope.row)">维修</el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="handle(scope.$index, scope.row)">退还</el-button>
                    </div>
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

        <el-dialog title="维修申请" size="tiny" :modal="false" v-model="show1" :modal-append-to-body="false">
            <el-form label-width="100px">

                <el-form-item label="问题描述">
                    <el-input type="textarea" v-model="desc1"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show1 = false">取 消</el-button>
                <el-button type="primary" @click="submit1">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="退还申请" size="tiny" :modal="false" v-model="show2" :modal-append-to-body="false">
            <el-form label-width="100px">

                <el-form-item label="退还原因">
                    <el-input type="textarea" v-model="desc2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show2 = false">取 消</el-button>
                <el-button type="primary" @click="submit2">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {deviceInfop,deviceBack,deviceRepair} from "../../widgets/Api"
    import _ from "lodash"
    import Cookie from "js-cookie"

    export default {
        data(){
            return {
                index: 0,
                row: {},
                tid: 0,
                title: "",
                show1: false,
                show2: false,
                desc1: "",
                desc2: "",
                pagenow: 1,
                pagesize: 20,
                total: 0,
                tableData: []
            }
        },
        methods: {
            detail(index, row){
                this.$router.push({name: "deviceDetail",params: {id: row.id}});
            },
            handleCurrentChange(val) {
                this.pagenow = val;
                this.getInfo(val);
            },
            getInfo(){
                let uid = Cookie.get("_uid");
                deviceInfop({params: {uid: uid}}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        _.map(data, item => {
                            item.name = item.brand + item.category
                        });
                        this.total = data.length;
                        this.tableData = data;
                    }
                });
            },
            repair(index, row){
                this.show1 = true;
                this.row = row;
            },
            handle(index, row){
                this.show2 = true;
                this.tid = row.tid;
                this.index = index;
            },
            submit1(){
                let data = {
                    did: this.row.id,
                    desc: this.desc1
                };
                deviceRepair({params: data}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.show1 = false;
                        this.$message({
                            type: "success",
                            message: "申请成功！"
                        });
                        this.getInfo();
                    }
                });
            },
            submit2(){
                let data = {
                    tid: this.tid,
                    content: this.desc2
                };
                deviceBack({params: data}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.show2 = false;
                        this.$message({
                            type: "success",
                            message: "设备退还成功！"
                        });
                        this.getInfo();
                    }
                });
            },
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
</style>