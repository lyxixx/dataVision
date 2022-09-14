<template>
  <div class="com-container">
    <div class="com-chart" ref="ref_seller"></div>
  </div>
</template>

<script>
export default {
  name: "Seller",
  data() {
    return {
      chartInstance: null,
      allData: null,
      xData: [],
      currentPage: 1,
      totalPage: 0,
      timerId: null,
    };
  },
  mounted() {
    this.initChart(), this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter()
  },
  destroyed() {
    clearInterval(this.timerId);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //初始化
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.ref_seller, "chalk");
  //图表初始化配置
      var initOption = {
        title: {
          text: "▎ 商家销售统计",
         
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0,
            lineStyle: {
              color: "#2D3443",
            },
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
            },
            itemStyle: {
               color:new this.$echarts.graphic.LinearGradient(0,0,1,0,[
                //百分之0状态下的颜色
                {offset: 0, color:'#5052EE'},
                {offset: 1, color:"#AB6EE5"}
              ])
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);


      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    //获取数据
    async getData() {
      const { data: ret } = await this.$http.get("seller");
      this.allData = ret;
      this.allData.sort((a, b) => {
        return a.value - b.value;
      });
      this.totalPage =
        this.allData.length % 5 === 0
          ? this.allData.length / 5
          : this.allData.length / 5 + 1;
      this.updataChart();
      this.startInterval();
    },
    //更新数据
    updataChart() {
      var start = (this.currentPage - 1) * 5;
      var end = this.currentPage * 5;
      var showData = this.allData.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      const option = {
        yAxis: {
          data: sellerNames,
        },
        series: [
          {
            data: sellerValues,
          },
        ],
      };
      this.chartInstance.setOption(option);
    },

    startInterval() {
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updataChart();
      }, 3000);
    },
    screenAdapter(){
      //console.log(this.$refs.ref_seller.offsetWidth);
      let titleFontSize = this.$refs.ref_seller.offsetWidth/100 *3.6
        var adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
      
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            itemStyle: {
              barBorderRadius: [0, titleFontSize/2, titleFontSize/2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize()
    }
  },
};
</script>

<style scoped lang="less">
</style>
