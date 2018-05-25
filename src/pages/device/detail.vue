<template>
    <div>
        <div class="info">
            <el-row :gutter="10">
                <el-col :span="12">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                        <tr>
                            <td class="header" @click="edit(1)"><span>设备名</span></td>
                            <td class="value header">
                                <div>{{tableData.name}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td @click="edit(2)"><span>{{category}}类型</span></td>
                            <td class="value">
                                <div>{{tableData.category}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td @click="edit(3)"><span>{{category}}品牌</span></td>
                            <td class="value">
                                <div>{{tableData.brand}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td><span>{{category}}型号</span></td>
                            <td class="value">
                                <div>{{tableData.version}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td @click="edit(4)"><span>序列号</span></td>
                            <td class="value">
                                <div>{{tableData.code}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td><span>价格</span></td>
                            <td class="value">
                                <div>{{tableData.price}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td><span>标签</span></td>
                            <td class="value">
                                <el-tag v-show="tableData.tags"
                                        v-for="tag in tableData.tags"
                                        :key="tag.name"
                                        :closable="true"
                                        :type="tag.type"
                                        :close-transition="false"
                                        @close="handleClose(tag)"
                                >
                                    {{tag.name}}
                                </el-tag>
                            </td>
                        </tr>

                    </table>
                </el-col>
                <el-col :span="12">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                        <tr>
                            <td class="header" @click="edit(1)"><span>领用部门</span></td>
                            <td class="value header">
                                <div>{{tableData.depart}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="header" @click="edit(1)"><span>领用人</span></td>
                            <td class="value header">
                                <div>{{tableData.user}} <i class="fa fa-search" @click="show = true"></i></div>
                            </td>
                        </tr>
                        <tr>
                            <td @click="edit(2)"><span>领用时间</span></td>
                            <td class="value">
                                <div>{{tableData.usetime}}</div>
                            </td>
                        </tr>
                    </table>
                </el-col>
            </el-row>
        </div>


        <div class="panel">
            <div class="panel-title">更多信息</div>

            <div class="panel-body" v-html="tableData.remarks"></div>
        </div>

        <el-dialog
                title="选择领用人"
                v-model="show"
                size="tiny"
                :modal-append-to-body="false"
                >
            <el-tree :data="data" :props="defaultProps"
                     :highlight-current="true"
                     @node-click="handleNodeClick">

            </el-tree>
            领用人：{{form.user}}
            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="assgin">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script type="text/javascript">
    import {deviceDetail,name,deviceTransfer} from "../../widgets/Api"
    import moment from "moment"

    export default {
        data(){
            return {
                colors: ["gray","danger","primary","success","warning"],
                category: "",
                tableData: {
                    name: "",
                    brand: "",
                    category: "",
                    code: "",
                    version: "",
                    price: "",
                    tags: [],
                    remarks: "",
                    user: "",
                    depart: ""
                },
                show: false,
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                form: {
                    uid: "",
                    user: "",
                    depart: ""
                }
            }
        },
        methods: {
            getData(){
                let did = this.$route.params.id;
                deviceDetail({params: {did}}).then( ({data: {code ,data, msg}}) => {
                    if(code == 0){
                        data.category = data.category.join(" / ")
                        this.tableData = data;
                        if(data.tags[0] != ""){
                            let arr = [];
                            for(let i=0;i<data.tags.length;i++){
                                let obj = {
                                    name: data.tags[i],
                                    type: this.colors[i]
                                };
                                arr.push(obj);
                            }
                            if(arr[0] != ""){
                                this.tableData.tags = arr;
                            }
                        }else{
                            this.tableData.tags = [];
                        }
                    }
                });
            },
            getName(){
                name().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.data = data;
                    }
                });
            },
            handleNodeClick(data) {
                if(data.depart){
                    this.form.uid = data.id;
                    this.form.depart = data.depart;
                    this.form.user = data.name;
                }
            },
            assgin(){
                this.tableData.user = this.form.user;
                this.tableData.depart = this.form.depart;
                this.tableData.usetime = moment().format("YYYY-MM-DD HH:mm:ss");
                this.show = false;
                this.submit();
            },
            submit(){
                this.form.did = this.$route.params.id;
                deviceTransfer({params: this.form}).then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.$message({
                            type: "success",
                            message: "设备转让成功！"
                        })
                    }
                })
            }
        },
        mounted(){
            this.getData();
            this.getName();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .info{
        background-color: white;
    }
    // 表格样式
    tr{
        cursor: pointer;
    }
    td{
        width: 25%;
        height: 40px;
        vertical-align: middle;
        border-right: 1px solid #dfe6ec;
        border-bottom: 1px solid #dfe6ec;
        padding-left: 18px;
        i{
            font-size: 10px;
            color: #65CEA7;
        }
        span{
            margin: 10px;
        }
    }
    .edit{
        font-size: 10px;
        color: #65CEA7;
        margin-right: 10px;
    }

    .header{
        border-top: 1px solid #dfe6ec;
    }
    .value{
        width: 75%;
        border-right: 0px;
    }
    .sex{
        font-size: 24px;
    }
    .info-input{
        width: 200px;
    }

    .remarks{
        margin: 20px 0;
        padding: 10px 15px;
        background-color: white;
    }
</style>