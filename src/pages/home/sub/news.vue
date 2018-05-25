<template>
    <div id="demo">
        <div id="demo1">
            <li><a href="#" target="_blank">百家网媒重庆行走进白鹤梁 记者在水下40米处探秘“水下碑林”</a></li>
            <li><a href="#" target="_blank">只有努力才会有美好的明天</a></li>
            <li><a href="#" target="_blank">衡水打造综合交通枢纽 形成进出雄安新区“南大门”</a></li>
            <li><a href="#" target="_blank">每一天都是新的需要好好珍惜</a></li>
            <li><a href="#" target="_blank">怨天尤人是没有任何作用的</a></li>
            <li><a href="#" target="_blank">儿子讲述母亲作为飞虎队中国女护士的传奇故事</a></li>
            <li><a href="#" target="_blank">大火箭运抵文昌发射场 6月发射实践十八号卫星</a></li>
            <li><a href="#" target="_blank">雪山新村 浴火重生的“天空之城”</a></li>
            <li><a href="#" target="_blank">13岁男孩经常熬夜打游戏 一年长高不到1厘米</a></li>
        </div>
        <div id="demo2"></div>
    </div>
</template>

<script type="text/javascript">

    export default {
        data(){
            return {
                mes: "hello"
            }
        },
        mounted(){
            let speed=40;
            this.$nextTick(() => {
                let demo=document.getElementById("demo");
                let demo2=document.getElementById("demo2");
                let demo1=document.getElementById("demo1");
                demo2.innerHTML=demo1.innerHTML

                let MyMar=setInterval(function (){
                    if(demo.scrollTop>=demo1.offsetHeight){
                        demo.scrollTop=0;
                    }
                    else{
                        demo.scrollTop=demo.scrollTop+1;
                    }
                },speed)
                demo.onmouseover=function(){clearInterval(MyMar)}
                demo.onmouseout=function(){MyMar=setInterval(function (){
                    if(demo.scrollTop>=demo1.offsetHeight){
                        demo.scrollTop=0;
                    }
                    else{
                        demo.scrollTop=demo.scrollTop+1;
                    }
                },speed)}
            });
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    *{
        margin:0px;
        padding:0px;
        border:0px;
    }
    #demo{
        font-size: 12px;
        overflow:hidden;
        height:100px;
        position:relative;
        #demo1{
            height:auto;
            text-align:left;
        }
        #demo2{
            height:auto;
            text-align:left;
        }

        #demo2 li{
            list-style: square;
            height:22px;
            text-align:left;
            text-indent:15px;
            color: #6bc5a4;
            a{
                color: black;
            }
        }
    }
    #demo1 li{
        list-style: square !important;
        height:22px;
        text-align:left;
        text-indent:15px;
        color: #6bc5a4;
        a{
            color: black;
        }
    }
</style>