<template>
    <div class="charts-pie"></div>
</template>

<script>
    import ECharts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/legendScroll'
    export default {
        data() {
            return {
                charts: null
            }
        },
        watch: {
            options: {
                handler(val) {
                    this.charts.setOption(val)
                },
                deep: true
            }
        },
        mounted() {
          this.init()
        },
        props: ['dataNum','dataName'],
        methods: {

            init(){
                this.charts = ECharts.init(this.$el, {color: ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8', '#cda819', '#32a487']})
                let option = {
                    title: {
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        y:'25%',
                        data: this.dataName,
                    },

                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['40%', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },

                            },
                            data:this.dataNum.sort(function (a, b) { return a.value - b.value; }),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
                // option 是做测试用的，可以去掉直接通过prop传值修改
                option = Object.assign(option, this.Object)

                this.charts.setOption(option)
            },
            // genData(count) {
            //     var nameList = [
            //         '赵','史', '唐', '费', '廉', '岑',
            //     ];
            //     var legendData = [];
            //     var seriesData = [];
            //     var selected = {};
            //     for (var i = 0; i < 50; i++) {
            //        let name = Math.random() > 0.65
            //             ? makeWord(4, 1) + '·' + makeWord(3, 0)
            //             : makeWord(2, 1);
            //         legendData.push(name);
            //         seriesData.push({
            //             name: name,
            //             value: Math.round(Math.random() * 100000)
            //         });
            //         selected[name] = i < 6;
            //     }
            //
            //     return {
            //         legendData: legendData,
            //         seriesData: seriesData,
            //         selected: selected
            //     };
            //
            //     function makeWord(max, min) {
            //         var nameLen = Math.ceil(Math.random() * max + min);
            //         var name = [];
            //         for (var i = 0; i < nameLen; i++) {
            //             name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
            //         }
            //         return name.join('');
            //     }
            // }

        },
        name: "charts-pie"
    }
</script>

<style scoped>
    .charts-pie {
        width: 100%;
        height: 260px;
    }
</style>
