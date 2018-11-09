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
                        formatter: "{name}",
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
