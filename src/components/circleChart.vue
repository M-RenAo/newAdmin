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

        props: ['dataNum'],
        created(){
        },
        watch: {
            dataNum: function (){
                this.init()
            },
        },
        mounted() {
          this.init()
        },
        methods: {
            init(){
                var that=this
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
                        data: this.dataNum,
                        formatter:function (name) {
                            var total = 0;
                            var target;
                            for (var i = 0, l = that.dataNum.length; i < l; i++) {
                                total += that.dataNum[i].value;
                                if (that.dataNum[i].name == name) {
                                    target = that.dataNum[i].value;
                                }
                            }
                            return name +' '+target+ ' (' + (total==0?0:((target/total)*100).toFixed(2)) + '%'+')';
                        },
                    },

                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['20%', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },

                            },
                            data:this.dataNum,
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
                // // option 是做测试用的，可以去掉直接通过prop传值修改
                // option = Object.assign(option, this.Object)
                // console.log(option)

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
