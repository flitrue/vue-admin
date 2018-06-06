<template>
    <div>
        <el-row>
            <el-col>
                <el-table
                        :data="tableData"
                        border
                        stripe
                        @cell-click="cellClick"
                        :default-sort = "{prop: 'buytime', order: 'descending'}"
                >
                    <el-table-column
                            prop="id"
                            label="申请编号"
                            width="150">
                    </el-table-column>

                    <el-table-column
                            prop="name"
                            label="申请人"
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
                            width="200">
                        <template slot-scope="scope">
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
    import {applyInfoA,applyChange} from "../../../widgets/Api"

    export default {
        data(){
            return {
                row: {},
                value: "",
                show: 0,
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
                tableData: [],
                restaurants: [
                    {id: 0, "value": "未处理"},
                    {id: 1, "value": "处理中"},
                    {id: 2, "value": "已处理"},
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
                    id: this.row.id,
                    status: item.id
                }
                applyChange({params: data}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){

                    }
                });
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            getData(){
                applyInfoA().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        for(let i=0;i<data.length;i++){
                            if(parseInt(data[i].status) == 0){
                                data[i].status = "未处理";
                            }else if(parseInt(data[i].status) == 1){
                                data[i].status = "处理中";
                            }else if(parseInt(data[i].status) == 2){
                                data[i].status = "已处理";
                            }
                        }
                        this.tableData = data;
                    }
                });
            },
            cellClick(row,column,cell,event){
                if(column.label == "状态"){
                    this.show = row.id;
                }
                this.row = row;
            }
        },
        mounted(){
            this.getData();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .edit{
        font-size: 10px;
        color: #65CEA7;
        margin-right: 10px;
    }
</style>