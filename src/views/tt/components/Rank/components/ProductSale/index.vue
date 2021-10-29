<template>
  <view-slot :height="270">
    <template v-slot:title>
      商城销售额排行
    </template>
    <template v-slot:body>
      <div class="line-box">
        <div>
          <div class="total-box">销售总额(今年)：<span class="total">{{ line.total }} 元</span></div>
          <div v-for="(item, idx) in line.data" :key="idx" class="line-item">
            <div class="name">{{ item.name }}</div>
            <div class="line">
              <div
                class="in-line"
                :style="{ width: `${((item.count/line.total * 100).toFixed(2))}%`, background: colorList[idx] }"
              ></div>
            </div>
            <div class="describe">{{(((item.count/line.total) * 100).toFixed(2))}}%&nbsp;/&nbsp;{{ item.count }} 元</div>
            <div></div>
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

  props: {

  },

  data() {
    return {
      line: {
        total: 1000,
        data: [
          { name: '粮油酒水', count: 230 },
          { name: '家用百货', count: 100 },
          { name: '粮油酒水', count: 30 },
          { name: '粮油酒水', count: 20 },
          { name: '粮油酒水', count: 13 },
          { name: '粮油酒水', count: 1 }
        ]
      },
      colorList: ['#6285E2', '#EA68A2', '#FAAD14', '#2C63FD', '#FB4D4B', '#14C7FA']
    }
  },

  mounted() {
    // this.init()
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
$screen-theme: #23C5F3; // 主题色

.line-box {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  position: relative;
  transform: translateZ(0);

  .total-box {
    position: relative;
    left: -20px;
    margin-bottom: 9px;
    font-size: 14px;
    font-weight: 600;
    color: $screen-theme;

    .total {
      font-size: 20px;
    }
  }

  .line-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .name {
      width: 75px;
      font-size: 14px;
      color: $screen-theme;
    }

    .line {
      position: relative;
      margin-top: 3px;
      margin-right: 20px;
      width: 200px;
      height: 10px;
      background: rgba(255, 255, 255, .1);

      .in-line {
        position: absolute;
        top: 0;
        left: 0;
        height: 10px;
      }
    }

    .describe {
      font-size: 14px;
      color: #fff
    }
  }
}
</style>
