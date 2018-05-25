<template>
    <div>
        <a href="https://mis.flitrue.com/api/device/excel" target="_blank"><el-button type="primary" style="margin-bottom: 10px;">导出为Excel</el-button></a>
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
                    width="150">
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
                <template scope="scope">
                    ¥{{ scope.row.price}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="buytime"
                    sortable
                    width="150"
                    label="购买日期">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.buytime }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="200">
                <template scope="scope">
                    <div class="handler">
                        <el-button
                                size="small"
                                type="success"
                                @click="detail(scope.$index, scope.row)">查看详情</el-button>
                        <el-button
                                   size="small"
                                   type="info"
                                   @click="edit(scope.$index, scope.row)">编辑</el-button>
                        <!--<el-button
                                   size="small"
                                   type="danger"
                                   @click="del(scope.$index, scope.row)">删除</el-button>-->
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
    </div>
</template>

<script type="text/javascript">
    import {deviceInfo,deviceDel} from "../../widgets/Api"
    import _ from "lodash"

    export default {
        data(){
            return {
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
                deviceInfo().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        _.map(data, item => {
                            item.name = item.brand + item.category
                        });
                        this.total = data.length;
                        this.tableData = data;
                    }
                });
            },
            edit(index,row){
                this.$router.push({name: "deviceEdit",params: {id:row.id}});
            },
            del(index, row){
                this.$confirm('确认要删除？').then(_ => {
                    deviceDel({did: row.id}).then( ({data: {code, data, msg}}) => {
                        if(code == 0) {
                            this.getInfo();
                    }
                    });
                });
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
</style>