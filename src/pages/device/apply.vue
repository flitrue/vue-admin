<template>
    <div>
       <el-row>
           <el-col>
               <el-button type="primary" @click="show = true">申请设备</el-button>
           </el-col>
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
                           prop="category"
                           label="申请类型"
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

        <el-dialog title="设备申请" size="tiny" :modal="false" v-model="show" :modal-append-to-body="false">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="设备类型">
                    <el-cascader
                            placeholder="请选择类型"
                            :options="categorys"
                            change-on-select
                            v-model="form.category"
                    ></el-cascader>
                </el-form-item>

                <el-form-item label="规格要求">
                    <el-input type="textarea" v-model="form.desc"></el-input>
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
    import {applyInfo,applyAdd} from "../../widgets/Api"

    export default {
        data(){
            return {
                value: "",
                show: false,
                form: {
                    category: [],
                    desc: ""
                },
                categorys: [
                    {
                        value: '电脑',
                        label: '电脑',
                        children: [{
                            value: '笔记本',
                            label: '笔记本'
                        }, {
                            value: '台式机',
                            label: '台式机'
                        }, {
                            value: '一体机',
                            label: '一体机'
                        }]
                    }, {
                        value: '手机',
                        label: '手机',
                    }, {
                        value: '打印机',
                        label: '打印机'
                    }, {
                        value: '工具',
                        label: '工具',
                    }],
                tableData: []
            }
        },
        methods: {
            submit(){
                applyAdd({params: this.form}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: msg
                        });
                        this.show = false;
                        this.getData();
                    }
                });
            },
            getData(){
                applyInfo().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        for(let i=0;i<data.length;i++){
                            if(parseInt(data[i].status) == 0){
                                data[i].status = "未处理";
                            }else if(parseInt(data[i].status) == 1){
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