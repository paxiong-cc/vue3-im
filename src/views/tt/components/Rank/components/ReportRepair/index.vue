<template>
  <view-slot :height="270">
    <template v-slot:title>
      报事报修统计
    </template>
    <template v-slot:body>
      <div class="view-box">
        <!-- 效果图 -->
        <div class="circle-view">
          <div class="out-circle"></div>
          <div class="in-circle"></div>
          <div id="report" class="report"></div>
        </div>
        <!-- 数据 -->
        <div class="property-data">
          <div class="property-total">报事报修统计(今年)：<span class="total">1000&nbsp;条</span></div>
          <div v-for="(item, idx) in property" :key="idx" class="data-item">
            <div class="icon" :style="{ background: item.itemStyle.color }"></div>
            <div class="name">{{ item.name }}</div>
            <div class="percentage">33.33%</div>
            <div class="count">{{ item.value }}&nbsp;条</div>
          </div>
        </div>
      </div>
    </template>
  </view-slot>
</template>

<script>
import ViewSlot from '../../../ViewSlot'

export default {
  components: {
    ViewSlot
  },

  data() {
    return {
      property: [
        { value: 1048, name: '待处理', itemStyle: { color: '#F25C22' } },
        { value: 735, name: '处理中', itemStyle: { color: '#228FFE' } },
        { value: 580, name: '已处理', itemStyle: { color: '#FFB400' } }
      ]
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
      const view = echarts.init(document.getElementById('report'))
      view.setOption(this.getOption())
    },

    // 获取option参数
    getOption() {
      // 参数
      const option = {
        tooltip: {
          trigger: 'item'
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '报事报修',
            textAlign: 'center',
            fill: '#fff',
            fontSize: 16,
            fontWeight: 600
          }
        },
        series: [
          {
            name: '报事报修',
            type: 'pie',
            radius: ['75%', '100%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: this.property
          }
        ]
      }
      return option
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-theme: #23C5F3; // 主题色

@keyframes round {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.view-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;

  /* 效果图 */
  .circle-view {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 190px;
    height: 190px;

    .out-circle {
      position: absolute;
      width: 190px;
      height: 190px;
      background: url(data:image/png;base64,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) no-repeat 50%/190px 190px;
      animation: round 10s linear infinite;
    }

    .in-circle {
      position: absolute;
      width: 150px;
      height: 150px;
      background: url(data:image/png;base64,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) no-repeat 50%/150px 150px;
      animation: round 20s linear infinite;
    }

    .report {
      width: 120px;
      height: 120px;
    }
  }

  /* 数据 */
  .property-data {
    margin-left: 40px;

    .property-total {
      margin-bottom: 20px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
      color: $screen-theme;

      .total {
        font-size: 20px;
      }
    }

    .data-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      color: #fff;

      .icon {
        margin-right: 10px;
        border-radius: 4px;
        width: 14px;
        height: 14px;
        background: #fff;
      }

      .percentage {
        margin: 0 10px
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
