<template>
    <div class="schedule-calendar-body">
        <sc-week :startWeek="startWeek"></sc-week>
        <sc-month :year="year"
                  :month="month"
                  :startWeek="startWeek"
                  :direction="direction"
                  :data="data"></sc-month>
    </div>
</template>
<script>
import scWeek from './scWeek'
import scMonth from './scMonth'

export default {
    components: {
        scWeek,
        scMonth
    },
    props: {
        year: Number,
        month: Number,
        startWeek: Number,
        direction: String,
        data: Array
    },
}
</script>
<style lang="less" type="text/css" rel="stylesheet/less" scoped>
@import './variables.less';

.schedule-calendar- {
    &body {
        position: relative;
        flex: 1;
        width: 100%;
        background: @sc-body-color;
    }
}
</style>
