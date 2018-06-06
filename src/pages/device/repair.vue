<template>
    <div>
        <el-row>
            <el-col>
                <el-table
                        :data="tableData"
                        border
                        stripe
                        :default-sort = "{prop: 'buytime', order: 'descending'}"
                >
                    <el-table-column
                            prop="id"
                            label="申请编号"
                            width="150">
                    </el-table-column>

                    <el-table-column
                            prop="status"
                            sortable
                            label="状态"
                            width="150">
                    </el-table-column>

                    <el-table-column
                            prop="time"
                            sortable
                            width="200"
                            label="申请时间">
                        <template slot-scope="scope">
                            <el-icon name="time"></el-icon>
                            <span style="margin-left: 5px">{{ scope.row.time }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="desc"
                            label="描述">
                        <template slot-scope="scope">
                            {{ scope.row.desc}}
                        </template>
                    </el-table-column>

                    <!--<el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                            <div class="handler">
                                <el-button
                                        size="small"
                                        type="success"
                                        @click="detail(scope.$index, scope.row)">查看详情</el-button>
                            </div>
                        </template>
                    </el-table-column>-->
                </el-table>
            </el-col>
        </el-row>

    </div>
</template>

<script type="text/javascript">
    import {getRepair} from "../../widgets/Api"

    export default {
        data(){
            return {
                tableData: []
            }
        },
        methods: {
            getData(){
                getRepair().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        for(let i=0;i<data.length;i++){
                            if(data[i].status == 0){
                                data[i].status = "未处理";
                            }else if(data.status == 1){
                                data[i].status = "处理中";
                            }else{
                                data[i].status = "已处理";
                            }
                        }
                        this.tableData = data;
                    }
                });
            }
        },
        mounted(){
            this.getData();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>

</style>