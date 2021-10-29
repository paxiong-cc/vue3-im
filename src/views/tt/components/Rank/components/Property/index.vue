<template>
  <view-slot :height="270">
    <template v-slot:title>
      小区缴费排行
    </template>
    <template v-slot:body>
      <div class="view-box" id="property-zhu"></div>
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

        }
      }
    }
  },

  data() {
    return {
      histogram: {
        totalArr: [200, 200, 250, 200, 200],
        itemArr: [180, 100, 160, 100, 140]
      }
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
      // eslint-disable-next-line no-undef
      const view = echarts.init(document.getElementById('property-zhu'))
      view.setOption(this.getOption())
    },

    // 获取option参数
    getOption() {
      // 参数
      const option = {
        textStyle: {
          color: '#02E8FF',
          fontSize: 14
        },
        grid: {
          containLabel: true,
          left: 15,
          right: 20,
          bottom: 20,
          top: 30
        },
        xAxis: {
          axisLabel: {
            color: '#68C3DC',
            fontSize: 14,
            interval: 0
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: ['亚洲湾一期', '亚洲湾二期', '亚洲湾三期', '亚洲湾四期', '亚洲湾五期'],
          offset: 10,
          type: 'category'
        },
        yAxis: {
          nameTextStyle: {
            color: '#02E8FF',
            padding: [0, 0, -10, 0],
            fontSize: 14
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          data: this.histogram.itemArr,
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 30,
          // 深色身
          itemStyle: {
            normal: {
              color: function(params) {
                // 自定义颜色
                var colorList = [
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#40A7D9'
                  }, {
                    offset: 1,
                    color: '#6DCDE6'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1D43F3'
                  }, {
                    offset: 1,
                    color: '#4366F3'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#D08030'
                  }, {
                    offset: 1,
                    color: '#F5A43A'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#A938E2'
                  }, {
                    offset: 1,
                    color: '#E23AF5'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#AA522F'
                  }, {
                    offset: 1,
                    color: '#F45E23'
                  }])
                ]
                return colorList[params.dataIndex]
              }
            }
          },
          label: {
            show: false
          }
        }, {
          data: [1, 1, 1, 1, 1, 1, 1, 3],
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbol: 'diamond',
          symbolOffset: [0, '50%'],
          symbolSize: [30, 15],
          // 深色底
          itemStyle: {
            normal: {
              color: function(params) {
                // 自定义颜色
                var colorList = [
                  '#6DCDE6', '#4366F3', '#F5A43A', '#DA39F2', '#F45E23'
                ]
                return colorList[params.dataIndex]
              }
            }
          }
        }, {
          data: this.histogram.itemArr,
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [30, 12],
          zlevel: 2,
          // 深色顶
          itemStyle: {
            normal: {
              color: function(params) {
                // 自定义颜色
                var colorList = [
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#40A7D9'
                  }, {
                    offset: 1,
                    color: '#6DCDE6'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1D43F3'
                  }, {
                    offset: 1,
                    color: '#4366F3'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#D08030'
                  }, {
                    offset: 1,
                    color: '#F5A43A'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#A938E2'
                  }, {
                    offset: 1,
                    color: '#E23AF5'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#AA522F'
                  }, {
                    offset: 1,
                    color: '#F45E23'
                  }])
                ]
                return colorList[params.dataIndex]
              }
            }
          }
        }, {
          data: this.histogram.totalArr,
          type: 'bar',
          barMaxWidth: 'auto',
          barWidth: 30,
          barGap: '-100%',
          zlevel: -2,
          // 浅色身
          itemStyle: {
            normal: {
              color: function(params) {
                // 自定义颜色
                var colorList = [
                  'rgba(79, 180, 222, .2)',
                  'rgba(29,67,243, .2)',
                  'rgba(205,125,48, .2)',
                  'rgba(169,56,226, .2)',
                  'rgba(180,84,46, .2)'
                ]
                return colorList[params.dataIndex]
              }
            }
          }
        }, {
          label: {
            fontSize: 12,
            color: '#68C3DC',
            show: true, // 是否显示
            position: 'top', // 文字位置
            formatter: (params) => {
              const item = this.histogram.itemArr[params.dataIndex]
              const total = this.histogram.totalArr[params.dataIndex]
              const percentage = ((item / total) * 100).toFixed(2) + '%'
              return `实缴${item}万元`
            }
          },
          data: this.histogram.totalArr,
          type: 'pictorialBar',
          barMaxWidth: '20',
          symbolPosition: 'end',
          symbol: 'diamond',
          symbolOffset: [0, '-50%'],
          symbolSize: [30, 12],
          zlevel: 10,
          // 浅色顶
          itemStyle: {
            normal: {
              color: function(params) {
                // 自定义颜色
                var colorList = [
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(79, 180, 222, .5)'
                  }, {
                    offset: 1,
                    color: 'rgba(79, 180, 222, .2)'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(29,67,243, .8)'
                  }, {
                    offset: 1,
                    color: 'rgba(29,67,243, .2)'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(205,125,48, .8)'
                  }, {
                    offset: 1,
                    color: 'rgba(205,125,48, .2)'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(169,56,226, .8)'
                  }, {
                    offset: 1,
                    color: 'rgba(169,56,226, .2)'
                  }]),
                  // eslint-disable-next-line no-undef
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(180,84,46, .8)'
                  }, {
                    offset: 1,
                    color: 'rgba(180,84,46, .2)'
                  }])
                ]
                return colorList[params.dataIndex]
              }
            }
          }
        }]
      }
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
