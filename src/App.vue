<template>
    <div id="app" class="fillcontain" style="position:absolute; left:0; top:0; width:100%;height:100%;">

		    <router-view ></router-view>
    </div>
</template>

<script>
    import Vue from "vue";
    Vue.filter('MoneyFormat', function(money) {
        if (money && money != null) {
            money = String(money);
            var left = money.split('.')[0], right = money.split('.')[1];
            right = right ? '.' + right:'';
            var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
            return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
        } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
            return '0';
        } else {
            return '';
        }
    })
    export default {

    }
</script>

<style lang="less">
	@import './style/common';
</style>
