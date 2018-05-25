<template>
    <el-row>
        <div class="panel">
            <div class="panel-body">
                <div ref="chartsA" style="height: 500px"></div>
            </div>
        </div>
    </el-row>
</template>
<script type="text/javascript">
    import {deviceAssetsCount} from "../../../widgets/Api"
    import _ from "lodash"

    export default{
        data(){
            return {
                echarts_instance: null,
                departBarOption:  {
                    backgroundColor: 'rgba(0,0,0,0)',
                    title: {
                        text: '各部门下的资产额统计表',
                        show: true,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 16,
                            color: 'rgba(0,0,0,0.5)'
                        },
                        left: "center"
                    },
                    tooltip: {
                        //trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: 'rgba(0,0,0,0.3)'
                            }
                        }
                    },
                    legend: {
                        show: false,
                        data: ["2016年"],
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
                        show: true,
                        data: [],
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
                        name: "资产额  ",
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
                    label: {
                        normal: {
                            show: true,
                            position: "top"
                        },
                        emphasis: {
                            show: true,
                            position: "top"
                        }
                    },
                    color: ["rgba(0,136,212,1)","rgba(0,136,112,1)","rgba(219,50,51,1)","rgba(241, 196, 15,1)","rgba(160, 199, 84,1)"],
                    series: [{
                        name: '资产额',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    let colorList = [
                                        '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                                        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        data: []
                    }]
                }
            }
        },
        created(){
            this.getAssetsCount()
        },
        methods: {
            get_echarts_instance(){
                //按需引入 ECharts 图表和组件，这里先全部引入
                require(['echarts'], (echarts) => {
                    this.echarts_instance = echarts
                    this.create_chartsA()
                })
            },
            create_chartsA(){
                let _dom = this.$refs.chartsA
                let myChart = this.echarts_instance.init(_dom)

                myChart.setOption(this.departBarOption);

            },
            create_chartsB(){
                let _dom = this.$refs.chartsB
                let myChart = this.echarts_instance.init(_dom)
                var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
                var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
                var yMax = 500;
                var dataShadow = [];

                for (var i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }

                let option = {
                    grid: {
                        left: '16px',
                        right: '16px',
                        bottom: '16px',
                        top: '16px',
                        containLabel: true
                    },
                    xAxis: {
                        data: dataAxis,
                        axisLabel: {
                            inside: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        z: 10
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside'
                        }
                    ],
                    series: [
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0.05)'}
                            },
                            barGap: '-100%',
                            barCategoryGap: '40%',
                            data: dataShadow,
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new this.echarts_instance.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new this.echarts_instance.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: data
                        }
                    ]
                };
                myChart.setOption(option)
                // Enable data zoom when user click bar.
                var zoomSize = 6;
                myChart.on('click', function (params) {
                    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                    myChart.dispatchAction({
                        type: 'dataZoom',
                        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                    });
                });

            },
            getAssetsCount(){
                deviceAssetsCount().then( ({data: {code, data, msg}}) => {
                    if(code == 0){

                        _.map(data, item => {
                            this.departBarOption.xAxis[0].data.push(item.name);
                            this.departBarOption.series[0].data.push(item.count);
                        });
                        this.get_echarts_instance();
                    }
                })
            }
        },
        components: {

        },
        destroyed(){
            this.echarts_instance = null
        }
    }
</script>
