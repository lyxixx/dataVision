<template>
  <div class="com-container">
    <div class="title" @click="showMenu = !showMenu">
      <span class="before-icon">▎</span>
      <span :style="titleColor">{{ showTitle }}</span>
      <span class="iconfont title-icon">&#xe6eb;</span>
      <div class="select-con">
        <div
          class="select-item"
          v-show="showMenu"
          @click.prevent="handleSelect(item.key)"
          v-for="item in selectTypes"
          :key="item.key"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div class="com-chart" ref="ref_Trend"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getThemeValue } from '@/utils/theme_utils'
export default {
  name: "Trend",
  data() {
    return {
      chartInstance: null,
      allData: null,
      showMenu: false,

      // 默认显示的数据类型
      activeName: "map",
      titleFontSize: 0,
    };
  },
  watch: {
    theme() {
      // 销毁当前的图表
      this.chartInstance.dispose();
      // 以最新主题初始化图表对象
      this.initChart();
      // 屏幕适配
      this.screenAdapter();
      // 渲染数据
      this.updataChart();
    },
  },
  created() {
    // console.log(this.$socket);
    //   this.$socket.registerCallBack('trendType',this.getData);
  },

  mounted() {
    this.initChart();
    this.getData();
    // this.$socket.send({
    //   action:'getData',
    //   socketType:'trendData',
    //   chartName:'trend',
    //   value:''

    // })
    window.addEventListener("resize", this.screenAdapter);
  },
  computed: {
    ...mapState(["theme"]),
    selectTypes() {
      if (!this.allData) return [];
      // 过度掉当前选中的 类别
      return this.allData.type.filter((item) => item.key !== this.activeName);
    },
    showTitle() {
      if (!this.allData) return "";
      return this.allData[this.activeName].title;
    },
    // 设置给标题的样式
  
     titleColor() {
      return {
        color: getThemeValue(this.theme).titleColor,
      }
    },
  },
  destroyed() {
    clearInterval(this.timerId);
    window.removeEventListener("resize", this.screenAdapter);
  },

  methods: {
    handleSelect(currentType) {
      this.activeName = currentType;
      this.updataChart();
    },
    //初始化
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.ref_Trend, this.theme);
      //图表初始化配置
      var initOption = {
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "3%",
          top: "35%",
          right: "4%",
          bottom: "1%",
          // 把x轴和y轴纳入 grid
          containLabel: true,
        },
        // 工具提示
        tooltip: {
          // 当鼠标移入坐标轴的显示提示
          trigger: "axis",
        },
      };
      this.chartInstance.setOption(initOption);
    },
    //获取数据
    async getData() {
      const { data: ret } = await this.$http.get("Trend");
      // console.log(ret);
      this.allData = ret;
      this.updataChart();
    },
    //更新数据
    updataChart() {
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ];
      // 全透明的颜色值
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ];
      const timeArr = this.allData.common.month;
      const valueArr = this.allData[this.activeName].data;
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: this.activeName,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              // 0% 颜色
              {
                offset: 0,
                color: colorArr1[index],
              },
              // 100% 颜色
              {
                offset: 1,
                color: colorArr2[index],
              },
            ]),
          },
        };
      });
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      const option = {
        xAxis: {
          data: timeArr,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInstance.setOption(option);
    },

    startInterval() {
      this.timerId = setInterval(() => {}, 3000);
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.ref_Trend.offsetWidth / 100) * 3.6;

      var adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          // 间距
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 1.3,
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style lang="less">
.title {
  position: absolute;
  left: 50px;
  top: 20px;
  z-index: 999;
  color: white;
  cursor: pointer;

  .before-icon {
    position: absolute;
    left: -20px;
  }
  .title-icon {
    margin-left: 10px;
  }
}
</style>