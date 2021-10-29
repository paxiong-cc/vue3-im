<template>
  <view-slot>
    <template v-slot:title>
      商城销售额统计
    </template>
    <template v-slot:body>
      <div class="property-total">销售总额（今年）：22010 万元</div>
      <div class="view-box" id="sale"></div>
    </template>
  </view-slot>
</template>

<script>
import ViewSlot from '../../../ViewSlot'

export default {
  components: {
    ViewSlot
  },

  props: {
    // 数值
    values: {
      type: Object,
      default: () => {
        return {
          product: [0, 932, 901, 934, 1290, 1330, 1200, 500, 600, 700, 800, 900],
          service: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
        }
      }
    }
  },

  data() {
    return {
      month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    }
  },

  mounted() {
    setTimeout(() => {
			this.init()
		}, 10)
  },

  methods: {
    // 初始化
    init() {
      const view = echarts.init(document.getElementById('sale'))
      view.setOption(this.getOption())
    },

    // 获取option参数
    getOption() {
      // 参数
      const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['商品', '服务'],
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            itemGap: 20,
            itemWidth: 30,
            itemHeight: 15,
        },
        grid: {
          top: 50,
          left: 0,
          right: 30,
          bottom: 15,
          containLabel: true
        },
        xAxis: {
          name: '月',
          nameTextStyle: {
            color: '#495B7F',
            fontWeight: 600
          },
          type: 'category',
          // 轴线
          axisLine: {
              lineStyle: {
                  color: '#222D48',
                  width: 3
              }
          },
          // 刻度线
          axisTick: { show: false },
          // 分割线
          splitLine: {
              // show: true,
              lineStyle: {
                  color: '#17223C',
                  width: 2
              }
          },
          // 刻度线字体
          axisLabel: {
              show: true,
              textStyle: {
                color: '#495B7F',
                fontWeight: 600
              }
          },
          offset: 10,
          boundaryGap: false,
          data: this.month
        },
        yAxis: {
          name: '金额：万元',
          nameTextStyle: {
            color: '#495B7F',
            fontWeight: 600
          },
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#222D48',
              width: 3
            }
          },
          // 刻度线
          axisTick: { show: false },
          // 分割线
          splitLine: {
            show: false,
            // lineStyle: {
            //   color: '#17223C',
            //   width: 2
            // }
          },
          // 刻度线字体
          axisLabel: {
            show: true,
            textStyle: {
              color: '#495B7F',
              fontWeight: 600
            }
          },
        },
        series: [
          {
            name: '商品',
            smooth: true,
            symbol: 'roundRect',
            symbolSize: 14,
            itemStyle : {  
              normal : {
                color:'#F25C22',
                lineStyle:{  
                    color:'#F25C22',
                    width: 4
                },
                borderColor:'#CDB3AD',
                borderWidth:2
              }
            },  
            type: 'line',
            data: this.values.product
          },
          {
            name: '服务',
            smooth: true,
            symbol: 'roundRect',
            symbolSize: 14,
            itemStyle : {  
              normal : {
                color:'#228FFE',
                lineStyle:{  
                  color:'#228FFE',
                  width: 4
                },
                borderColor:'#CDB3AD',
                borderWidth:2
              }
            },
            type: 'line',
            data: this.values.service
          }
        ]
      };
      return option
    }
  }
}
</script>

<style lang="scss" scoped>
.property-total {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  color: #fff;
}

.view-box {
  flex: 1;
  width: 100%;
}
</style>