<template>
    <div>
        <div class="home">

            <div>
                <i v-show="false" class="fa fa-sitemap" aria-hidden="true"></i>
                <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                </el-input>
                <el-tree :data="data" :props="defaultProps"
                         :highlight-current="true"
                         @node-click="handleNodeClick"
                         :filter-node-method="filterNode"
                         ref="tree2">
                </el-tree>
            </div>
        </div>

    </div>
</template>

<script>
    import {name} from "../../widgets/Api"

    export default {
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                filterText: ""
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            handleNodeClick(data) {
                if(data.depart){
                    this.$router.push({name: "staffDetail", params: {id: data.id}});
                }
            },
            getName(){
                name().then( ({data: {code, data, msg}}) => {
                    if(code == 0){
                        this.data = data;
                    }
                });
            },
        },
        mounted(){
            this.getName();
        }
    }
</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .home{
        background-color: white;
        border-radius: 2px;
        padding: 2% 20%;
    }

    .el-select{
        width: 110px;
    }
</style>