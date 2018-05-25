<template>
    <div class="chart">
        <div id="barChart"></div>
    </div>
</template>

<script type="text/javascript">
    import echarts from "echarts"

    export default {
        props: ["width"],
        data(){
            return {

            }
        },
        methods: {
            init(){
                this.getData();
                this.drawBarChart();
            },
            drawBarChart(){
                let xAxisData = ['笔记本','台式机','打印机','订书机','苹果笔记本','苹果台式机','测速器'];
                let option = {
                    title: {
                        text:'资产统计',
                        textStyle: {
                            color: '#000',
                            fontSize: 16,
                        },
                        subtext: '总资产：2000',
                    },
                    legend: {
                        data: ['资产额', '设备数'],
                        top: 4,
                        right: '10%',
                    },
                    toolbox: {
                        feature: {
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    grid: [
                        {
                            show: false,
                            left: '4%',
                            top: 60,
                            bottom: 60,
                            containLabel: true,
                            width: '46%',
                        }, {
                            show: false,
                            left: '50.5%',
                            top: 80,
                            bottom: 60,
                            width: '0%',
                        }, {
                            show: false,
                            right: '4%',
                            top: 60,
                            bottom: 60,
                            containLabel: true,
                            width: '46%',
                        }, ],
                    xAxis: [
                        {
                            gridIndex: 0,
                            inverse: true,
                            type: 'value',
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            position: 'top',
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }, {
                            gridIndex: 1,
                            show: false,
                        }, {
                            gridIndex: 2,
                            type: 'value',
                            axisLine: {
                                show: false,
                            },
                            axisTick: {
                                show: false,
                            },
                            position: 'top',
                            axisLabel: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            }
                        }],
                    yAxis: [{
                        gridIndex: 0,
                        type: 'category',
                        inverse: true,
                        position: 'right',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                        },
                        data: xAxisData,
                    }, {
                        gridIndex: 1,
                        type: 'category',
                        inverse: true,
                        position: 'left',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#6BC5A4',
                                fontSize: 12,
                            }
                        },
                        data: xAxisData.map(function(value) {
                            return {
                                value: value,
                                textStyle: {
                                    align: 'center',
                                }
                            }
                        })
                    }, {
                        gridIndex: 2,
                        type: 'category',
                        inverse: true,
                        position: 'left',
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        data: xAxisData
                    }],
                    series: [{
                        name: '资产额',
                        type: 'bar',
                        barGap: 10,
                        barWidth: 10,
                        label: {
                            normal: {
                                show: true,
                                position: "left"
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                    offset: 0,
                                    color: 'transparent'
                                }, {
                                    offset: 0.4,
                                    color: 'rgba(169, 110, 61, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(169, 110, 61, 0.7)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(169, 110, 61, 1)'
                                }])
                            }
                        },
                        data: [320, 302, 341, 374, 390, 420,123],
                    },
                        {
                            name: '设备数',
                            type: 'bar',
                            barGap: 10,
                            barWidth: 10,
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            label: {
                                normal: {
                                    show: true,
                                    position: "right"
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                        offset: 1,
                                        color: 'transparent'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(19, 10, 1, 0.3)'
                                    }, {
                                        offset: 0.4,
                                        color: 'rgba(19, 10, 1, 0.7)'
                                    }, {
                                        offset: 0,
                                        color: 'rgba(19, 10, 1, 1)'
                                    }])
                                }
                            },
                            data: [20, 2, 1, 4, 10, 23, 2],
                        }
                    ]
                };
                let barChart  = echarts.init(document.getElementById("barChart"));
                barChart.setOption(option);
            },
            getData(){

            }
        },
        mounted(){
            this.init();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    #barChart{
        height: 400px;
        width: 600px;
    }
    .chart{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>