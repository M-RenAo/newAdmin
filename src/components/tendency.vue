<template>
    <div class="line1">
        <div id="line1" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
            var resizeWorldMapContainer = function () {
                document.getElementById('line1').style.width = window.innerWidth+'px';
            }
            resizeWorldMapContainer();
            this.myChart = echarts.init(document.getElementById('line1'));
            this.initData();
        },
        props: ['sevenDate', 'sevenDay','max','dataName'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#675bba', '#d14a61','#5fe488','#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487'];
                const option = {
                    color: colors,
                    title: {
                        text: '',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:this.dataName
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.sevenDay
                    },
                    yAxis:
                        {
                          type: 'value',
                          name: '数量',
                          min: 0,
                          dataMax:function(value) {
                              return value.max;
                          },
                          // max: function(value) {
                          //     return Math.ceil(value.max/10)*10;
                          // },
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                        },
                    series: [
                        {
                            name:this.dataName[0],
                            type:'line',
                            data:this.sevenDate[0],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:this.dataName[1],
                            type:'line',
                            data:this.sevenDate[1],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:this.dataName[2],
                            type:'line',
                            data:this.sevenDate[2],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:this.dataName[3],
                            type:'line',
                            data:this.sevenDate[3],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },{
                            name:this.dataName[4],
                            type:'line',
                            data:this.sevenDate[4],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:this.dataName[5],
                            type:'line',
                            data:this.sevenDate[5],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:this.dataName[6],
                            type:'line',
                            data:this.sevenDate[6],
                            // yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                    ]
              };
                this.myChart.setOption(option);
            }
        },
        watch: {
            sevenDate: function (){
                this.initData()
            },
            sevenDay: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
    }
</style>
