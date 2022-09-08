<template>
<div class="com-container">
  <div class="com-chart" ref="ref_seller"></div>
</div>
</template>

<script>
export default {
  name: 'Seller',
  data() {
    return {
    chartInstance:null,
    allData:null,
    }
  },
  mounted() {
    this.initChart (),
    this.getData()
  },
  methods: {
     //初始化
     initChart() {
         this.chartInstance = this.$echarts.init(this.$refs.ref_seller)
     },
     //获取数据
     async getData(){
       const {data:ret} = await this.$http.get('seller')
       this.allData = ret
     },
     //更新数据
     updataChart(){
 

      this.chartInstance.setOption(option)
     }
  },
}
</script>

<style scoped lang="less">

</style>
