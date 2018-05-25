<template>
    <div id="tabs" class="mypanel">

        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <info></info>
            </el-tab-pane>
            <el-tab-pane label="我的下属" name="second">
                <div class="box">
                    <branch></branch>
                </div>
            </el-tab-pane>
            <el-tab-pane label="资产信息" name="third">
                <div class="box">
                    <asset :width="width"></asset>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="false" label="我的消息" name="fourth">
                <div>

                </div>
            </el-tab-pane>
            <el-tab-pane label="我的设置" name="fifth">
                <setting></setting>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script type="text/javascript">
    import _ from "lodash"
    import {branch,info,setting,asset} from "./index"

    export default {
        data(){
            return {
                activeName: 'first',
                width: ""
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
        components: {
            branch,info,setting,asset
        },
        mounted(){
            this.width = document.getElementById("tabs").offsetWidth - 30 + "px";
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>

</style>