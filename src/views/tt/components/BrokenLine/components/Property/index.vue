<template>
  <view-slot>
    <template v-slot:title>
      物业缴费趋势图
    </template>
    <template v-slot:body>
      <div class="property-total">已收总额（今年）：22010 万元</div>
      <div class="view-box" id="property"></div>
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
      default: () => [0, 932, 901, 934, 1290, 1330, 1200, 500, 600, 700, 800, 900]
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
      const view = echarts.init(document.getElementById('property'))
      view.setOption(this.getOption())
    },

    // 获取series,只展示最大和最小刻度点
    getSeriesData(arr) {
      // 找到最小值索引
      const findMinIdx = function(arr) {
          const minValue = Math.min(...arr)
          const idx = arr.findIndex(item => item === minValue)
          return idx
      }

      // 找到最大值索引
      const findMaxIdx = function(arr) {
          const maxValue = Math.max(...arr)
          const idx = arr.findIndex(item => item === maxValue)
          return idx
      }

      const minIdx = findMinIdx(arr)
      const maxIdx = findMaxIdx(arr)
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
          if (i === minIdx || i === maxIdx) {
              newArr.push(arr[i])
              continue;
          }
          newArr.push({
              value: arr[i],
              symbol: 'circle',
              symbolSize: 2,
              itemStyle : {  
                  normal : {
                      borderWidth:0
                  }
              },
          })
      }
      return newArr
    },

    // 获取option参数
    getOption() {
      // 动态计算刻度表宽度
      function textSize(text,fontSize) {
        var span = document.createElement("span");
        var result = {
            "width": span.offsetWidth,
            "height": span.offsetHeight
        };
        span.style.visibility = "hidden";
        span.style.fontSize = fontSize || "14px";
        span.style.fontWeight = 600
        document.body.appendChild(span);

        if (typeof span.textContent != "undefined")
            span.textContent = text || "国";
        else span.innerText = text || "国";

        result.width = span.offsetWidth - result.width;
        result.height = span.offsetHeight - result.height;
        span.parentNode.removeChild(span);
        return result;
      }

      function toHSpeed(speed,fix) {
          if(isNaN(speed))
              return speed;
          if(!fix&&fix!=0)
              fix=2;
          if(speed>=125000000)
          {
              speed/=125000000;
              speed=speed.toFixed(fix)+"Gbps"
          }
          else if(speed>=125000)
          {
              speed/=125000;
              speed=speed.toFixed(fix)+"Mbps"
          }
          else if(speed>=125)
          {
              speed/=125;
              speed=speed.toFixed(fix)+"Kbps"
          }
          else
          {
              speed*=8;
              speed=speed.toFixed(fix)+"bps"
          }
          return speed
      }

      // 参数
      const option = {
        //  tooltip: {
        //     trigger: 'axis',
        // },
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
              boundaryGap: false,
              data: this.month,
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
                  show: false,
                //   lineStyle: {
                //       color: '#17223C',
                //       width: 2
                //   }
              },
              // 刻度线字体
              axisLabel: {
                  show: true,
                  textStyle: {
                      color: '#495B7F',
                      fontWeight: 600
                  }
              },
              offset: 10
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
                //   lineStyle: {
                //       color: '#17223C',
                //       width: 2
                //   }
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
          series: [{
              data: this.getSeriesData(this.values),
              type: 'line',
              // 指示点
              symbol: 'roundRect',
              symbolSize: 14,
              showSymbol: true,
              // 指示标
              markPoint: {
                  symbol: 'path://m 0,0 h 48 v 20 h -18 l -6,5 l -6,-5 h -18 z',
                  symbolSize: function(val){
                      return [textSize(toHSpeed(val, 2),"18px").width+5,50]
                  },
                  symbolOffset: ['0', '-75%'],
                  symbolKeepAspect: true,
                  data: [
                      {
                          type: 'max',
                          name: '最大值',
                          itemStyle: {color: '#F25C22'},
                          label: {color: '#fff', verticalAlign: 'middle', fontWeight: 600, fontSize: 14}
                          
                      },
                      {type: 'min', name: '最小值', itemStyle: {color: '#F25C22'}, label: {color: '#fff', verticalAlign: 'middle', fontWeight: 600, fontSize: 14}}
                  ]
              },
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
              smooth: true,
              // 渐变色
              areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                        offset: 0, color: 'rgba(245,94,34, 0.6)' // 0% 处的颜色
                      }, {
                          offset: 0.7, color: 'rgba(245,94,34, 0.1)' // 100% 处的颜色
                      }, {
                          offset: 1, color: 'rgba(245,94,34, 0.0)' // 100% 处的颜色
                      }]
                  ),
                  global: false // 缺省为 false
              }
          }]
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