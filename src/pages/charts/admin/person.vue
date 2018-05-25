<template>
    <div>
        <el-row :gutter="10">
            <el-col :xs="24" :sm="10" :md="10" :lg="10">
                <div id="sexPieChart" class="charts"></div>
            </el-col>
            <el-col :xs="24" :sm="14" :md="14" :lg="14">
                <div id="trendLineChart" class="charts"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import echarts from "echarts"
    import {chartsSexScale} from "../../../widgets/Api"

    export default {
        data(){
            return {
                sexPieOption: {
                    title: {
                        show: true,
                        text: "员工男女比例",
                        left: '49%',
                        top: '49%',
                        textAlign: 'center',
                        textBaseline: 'middle',
                        textStyle: {
                            color: '#999',
                            fontWeight: 'normal',
                            fontSize: 16
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}:{c}人"
                    },
                    series: [{
                        name: '男女比例',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        center: ['50%', '50%'],
                        clockwise: false,
                        data: [{
                            value: 45,
                            name: '男'
                        }, {
                            value: 25,
                            name: '女'
                        }],
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#999',
                                    fontSize: '14px',
                                },
                                formatter: "{b}:{d}%"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 4,
                                borderColor: '#ffffff',
                            },
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }],
                    color: [
                        '#00CCFE',
                        '#F94EB7'
                    ]
                },
                trendLineOption:  {
                    backgroundColor: 'rgba(0,0,0,0)',
                    title: {
                        text: '2016年和2017年员工数量变化趋势图',
                        show: true,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: 'rgba(0,0,0,0.5)'
                        },
                        left: "center"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0.3)'
                            }
                        }
                    },
                    legend: {
                        data: ["2016年", "2017年"],
                        right: '2%',
                        textStyle: {
                            fontSize: 12,
                            color: 'rgba(255,255,255,1)'
                        }
                    },
                    grid: {
                        left: '2%',
                        right: '4%',
                        top: "10%",
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        show: true,
                        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                        axisLabel: {
                            //interval:0,
                            textStyle: {
                                color: "#000000"
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(1,102,137,0.8)',
                                width: 1,
                                type: 'dotted',
                                shadowBlur: 15,
                                shadowColor: 'rgba(230,230,230,0.9)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                opacity: 0.9
                            }
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        show: true,
                        name: "员工数  ",
                        splitNumber: 2,
                        nameTextStyle: {
                            color: "#000000",
                        },
                        min: 0,
                        minInterval: 1,
                        axisTick: {
                            show: true
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(1,102,137,0.8)'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#000000"
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        }
                    }],
                    color: ["rgba(0,136,212,1)","rgba(0,136,112,1)","rgba(219,50,51,1)","rgba(241, 196, 15,1)","rgba(160, 199, 84,1)"],
                    series: [{
                        name: '2016',
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        data: [0,1,2,1,1,2,1,2,3,2,1,1]
                    }, {
                            name: '2017',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            data: [0,1,3,0,2,2,2,2,4,2,2,2]
                        }]
                }
            }
        },
        methods: {
            drawSexChart(){
                let sex = echarts.init(document.getElementById("sexPieChart"));
                sex.setOption(this.sexPieOption);
            },
            drawTrendChart(){
                let trend = echarts.init(document.getElementById("trendLineChart"));
                trend.setOption(this.trendLineOption);
            },
            getData(){
                chartsSexScale().then( ({data: {code,data,msg}}) => {
                    if(code == 0){
                        this.sexPieOption.series[0].data[0].value = data.male;
                        this.sexPieOption.series[0].data[1].value = data.female;
                        this.drawSexChart();
                    }
                });
            },
            init(){
                this.getData();
                this.drawTrendChart();
            }
        },
        mounted(){
            this.init();
        }
    }

</script>

<style lang="scss" type="text/css" rel="stylesheet/scss" scoped>
    .el-col{
        background-color: white;
    }
    .charts{
        position: relative;
        height: 300px;
        width: 100%;
        background-color: white;
    }
</style>