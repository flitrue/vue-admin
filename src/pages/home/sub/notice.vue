<template>
    <div id="notice">
        <div id="notice1">
            <li><a href="#" target="_blank">第六次中日财长对话：深化双边财金务实合作</a></li>
            <li><a href="#" target="_blank">产教融合培育工匠精神 浙江工匠培训学院正式揭牌</a></li>
            <li><a href="#" target="_blank">没有人一开始就是高手，都是从菜鸟开始</a></li>
            <li><a href="#" target="_blank">每一天都是新的需要好好珍惜</a></li>
            <li><a href="#" target="_blank">怨天尤人是没有任何作用的</a></li>
            <li><a href="#" target="_blank">今天你写代码了吗</a></li>
            <li><a href="#" target="_blank">因给裁判“点赞” 贾秀全遭罚停赛3场</a></li>
            <li><a href="#" target="_blank">分享的胸怀和互助的精神最终成就了你</a></li>
            <li><a href="#" target="_blank">浪漫玫瑰之约 定陶第二届玫瑰风情节盛大开幕</a></li>
        </div>
        <div id="notice2"></div>
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
            let speed=40
            this.$nextTick(() => {
                let notice=document.getElementById("notice");
                let notice2=document.getElementById("notice2");
                let notice1=document.getElementById("notice1");
                notice2.innerHTML=notice1.innerHTML

                let MyMar=setInterval(function (){
                    if(notice.scrollTop>=notice1.offsetHeight){
                        notice.scrollTop=0;
                    }
                    else{
                        notice.scrollTop=notice.scrollTop+1;
                    }
                },speed)
                notice.onmouseover=function(){clearInterval(MyMar)}
                notice.onmouseout=function(){
                    MyMar=setInterval(function (){
                        if(notice.scrollTop>=notice1.offsetHeight){
                            notice.scrollTop=0;
                        }
                        else{
                            notice.scrollTop=notice.scrollTop+1;
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
    #notice{
        font-size: 12px;
        overflow:hidden;
        height:100px;
        position:relative;
        #notice1{
            height:auto;
            text-align:left;
        }
        #notice2{
            height:auto;
            text-align:left;
        }

        #notice2 li{
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
    #notice1 li{
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