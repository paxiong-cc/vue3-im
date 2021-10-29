<template>
  <article class="basic-data">
    <div class="title">基础数据</div>
    <div ref="meteor-box" class="data-box">
      <!-- 流星动效 -->
      <Meteor :config="svgConfig" class="meteor" />
      <!-- 列表数据 -->
      <ul class="count-list">
        <li v-for="(item, idx) in list" :key="idx">
          <div>
            <!-- 数据 -->
            <div v-for="(_item, _idx) in ['top', 'bottom']" :key="_idx" class="count-item">
              <div class="img-box">
                <div :class="`icon-${item[_item].type}`"></div>
              </div>
              <div class="describe">
                <div class="count-box">
                  <!-- <CountTo :startVal='0' separator="" :endVal='item[_item].total' :duration='3000' class="count-to"></CountTo> -->
                  <div class="tag-box" :class="[item[_item].type == 2 ? 'decrease' : '', item[_item].type == 1 ? 'increase' : '']">
                    <span class="tag">{{ item[_item].type == 2 ? '-' : '+' }}</span>
                    <span>{{ item[_item].tag }}</span>
                  </div>
                </div>
                <span class="item-title">{{ item[_item].title }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </article>
</template>

<script>
import Meteor from './components/Meteor'
import CountTo from 'vue-count-to'

export default {
  components: {
    Meteor
    // CountTo
  },

  data() {
    return {
      // svg配置
      svgConfig: {
        width: 0,
        height: 0,
        path: ''
      },

      // 列表数据
      list: [
        {
          top: { type: 1, total: 20, tag: 10500, title: '小区数量' }, // type 0-保持 1-新增 2-下降
          bottom: { type: 2, total: 10000, tag: 10, title: '平台活跃率' }
        },
        {
          top: { type: 1, total: 200000, tag: 5, title: '小区数量' },
          bottom: { type: 0, total: 20, tag: 0, title: '平台活跃率' }
        },
        {
          top: { type: 1, total: 200, tag: 150, title: '小区数量' },
          bottom: { type: 2, total: 20, tag: 25, title: '平台活跃率' }
        },
        {
          top: { type: 2, total: 20, tag: 15, title: '小区数量' },
          bottom: { type: 1, total: 20, tag: 25, title: '平台活跃率' }
        },
        {
          top: { type: 2, total: 20, tag: 15, title: '小区数量' },
          bottom: { type: 1, total: 20, tag: 25, title: '平台活跃率' }
        },
        {
          top: { type: 1, total: 20, tag: 15, title: '小区数量' },
          bottom: { type: 2, total: 20, tag: 25, title: '平台活跃率' }
        }
      ],

      typeList: ['top', 'maintain', 'bottom'] // type 0-保持 1-新增 2-下降
    }
  },

  mounted() {
    setTimeout(() => {
      this.getBoxSize()
    }, 10)
  },

  methods: {
    // 获取当前组件尺寸
    getBoxSize() {
      const meteor = this.$refs['meteor-box']
      const width = meteor.clientWidth
      const height = meteor.clientHeight
      const path = `M0 0 L${width} 0 L${width} ${height} L0 ${height} Z`
      this.svgConfig.width = width
      this.svgConfig.height = height
      this.svgConfig.path = path
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-theme: #23C5F3; // 主题色

/* 标题 */
.title {
  display: flex;
  align-items: center;
  padding-left: 15px;
  width: 200px;
  height: 28px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 4px;
  color: $screen-theme;
  background: url('../../homePic/basic_data_title.png') no-repeat left center/200px 28px;
}

/* 数据内容 */
.data-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;
  width: 100%;
  height: 170px;
  background: url('../../homePic/basic_data_bg.png') no-repeat left center/100% 170px;

  .meteor {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .count-list {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex: 1;
      position: relative;
      box-sizing: border-box;
      height: 100%;

      &:after {
        display: block;
        position: absolute;
        right: 0;
        width: 2px;
        height: 140px;
        background: -webkit-linear-gradient(top, rgba(14,32,51,1) 0%, rgba(21,96,119,1) 20%, rgba(25,131,158,1) 35%, rgba(28,159,188,1) 47%, rgba(28,159,188,1) 59%, rgba(25,131,158,1) 72%, rgba(21,96,119,1) 85%, rgba(14,32,51,1) 100%);
        content: '';
      }

      &:last-of-type {
        &:after {
          display: none;
        }
      }
    }
  }
}

/* 每一项数据布局 */
.data-box .count-item {
  display: flex;
  position: relative;

  .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    width: 60px;
    height: 60px;
    background: url('../../homePic/data_circle.png') no-repeat left center/60px 60px;

    /* 保持 */
    .icon-0 {
      margin-top: 1px;
      width: 40px;
      height: 40px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMTE1NGVjZS0xNDQ0LTkxNGItODRiZS02NmQ1MmQ4MmZhZDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FFNzU1RTk3RkI1MTFFQkI2OTZGNzk3MjVEQzBDRkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0FFNzU1RTg3RkI1MTFFQkI2OTZGNzk3MjVEQzBDRkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDY3YWViYWUtMmMxMS02MjQ0LTg3MDMtYjFlMmYyNWY1ODRlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmMxMTU0ZWNlLTE0NDQtOTE0Yi04NGJlLTY2ZDUyZDgyZmFkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PocoNXIAAAFtSURBVHja7JexSsQwGICTeAgn6Cp44CByoC7iII5uPoCja9/A9/EN7hncdPM2HXQSXNwOB8X2Er8fUiw1rde6HPgHPv4k/ZN8pE24syEEs8zFmSUvKqiCKqiCKqiCKqiCrWXQ8uyMn2LH8/n8wHtfED2EoigM0UgEaVtYh/08z8fSJj4Rp8SZ5BBdzC+xzCHjVom3cJ1l2X1XwXMED2ETivBdDMJGojSoWxjCSPoju9LH4w+ipNmYX2LjHAMYwQ7rXXYSZNAFrFUnroiVIsl6jFXhH1Tm3YbTJkHXIjhcRKZeT8nWc1N0PiSJ12LadrMeU/WmnL6CPiX122vrIvmnHaS8Ne1Yqn+R763PK247JFdwIqdMrpm4QKgtXrblMG3VdvEF3mOOS3yX8gmtwDPLPfQRnMArHMFn9Zqp7IiPV8YG7MFYrh36HolTmMUxLiHn4jVzBzdNHlb/F6ugCqqgCqqgCqqgCv5rwS8BBgBmtBSu0IHENwAAAABJRU5ErkJggg==') no-repeat center/40px 40px
    }

    /* 上升 */
    .icon-1 {
      width: 40px;
      height: 40px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMTE1NGVjZS0xNDQ0LTkxNGItODRiZS02NmQ1MmQ4MmZhZDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FFMjREMDg3RkI1MTFFQkI2OTZGNzk3MjVEQzBDRkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0FFMjREMDc3RkI1MTFFQkI2OTZGNzk3MjVEQzBDRkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDY3YWViYWUtMmMxMS02MjQ0LTg3MDMtYjFlMmYyNWY1ODRlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmMxMTU0ZWNlLTE0NDQtOTE0Yi04NGJlLTY2ZDUyZDgyZmFkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppzm4JsAAAGSSURBVHjaYvz//z/DYAZMDIMcjDpw1IEDDViIVah28x9R6m6pM9UCqXlA9U+JUEvfEARaOBtINQHx5kEXxUDHdQOpFCjXEMjfMWgcCHRMMZAqQRN2B4ovHXAHAh0RBaR6cEhHQUN2YBwItNwRSBEKpRKgukK6OxBoqR6Q2kek8j6g+hi6ORBomSyQOkGitsVAfV40dyDQEl6o4zjJ8NtWoH4TWofgESCWoiDpHgE6UoVo1aD2IDFY9cZfEH3gP3XAayAWJsZeRmIbrL9//z4OpCyoWPE8Y2VllaZaXQx0oDqV2wHCQAdSr7Hw69cvGSAlD8SMQAxqOfwFYmUg3k6E9kRo2mWB6mcG4sdcXFwENRIdxdhaM4cFXoNy9CcitOvafhC9Qk5rhoWSOPrx44ckkUrFaN4exOHAwdNgpdiBHAPgwO/fvw9uB3779o14xYKD3YEMow4cdSD1Hfj169dBH4LE6mcdqBD8RKTSzwPiwA3JHU9cJ+U2AJnFeJTtBuLT5NrBODrCOurAUQcOcQcCBBgA76cBntLgAiMAAAAASUVORK5CYII=') no-repeat center/40px 40px
    }

    /* 下降 */
    .icon-2 {
      margin-top: 2px;
      width: 40px;
      height: 40px;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMTE1NGVjZS0xNDQ0LTkxNGItODRiZS02NmQ1MmQ4MmZhZDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTI4Q0NEOTg3RkI2MTFFQjk0NTY4QTA4NDQ4OTVBODQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTI4Q0NEOTc3RkI2MTFFQjk0NTY4QTA4NDQ4OTVBODQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDY3YWViYWUtMmMxMS02MjQ0LTg3MDMtYjFlMmYyNWY1ODRlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmMxMTU0ZWNlLTE0NDQtOTE0Yi04NGJlLTY2ZDUyZDgyZmFkMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtPeXtYAAAGOSURBVHjaYvz//z/DYAZMDIMcjDpw1IHDwYGqQHwEiD9hwdeB2J8SwxkpLGZ4gfg5EHMTUKcOxLcGIgRliXAcCCgOVBT/JVLd74Fy4H8qqxstZkYdOOrAYedAFko0//5NfPHGyso66kAM8OvXr39EKv3HxcVFfwf+/PnzEZFKn9G8NfPw4cMGICUH0gOtuv4AsRAQBxOhfTsQPwbFNFLAPJeXly+nmgNv3rxJ9e6furo6I9Wi+MePH7ZA6jAV3ZdI9QbriRMnPIHUNio4rsrCwqKdJi3qffv2RQGppRQ4rs3Jyamapk3+LVu2FACpfjIcN8/HxyeZLn2SVatWNQGpWhK0rA8LCwuia6dpwYIF04FUBhFKjyQkJNjSvbEAtDTz27dvm4GYAQ++C8ROA9XtBIPu7u79QMoBi9RLUL+5tLT084A6EAQaGxtvAykVtB6fSn19/YMBa24hg69fv5pAO+diUCGbrq6uB5Say0jNAczs7GwVaL3bPHXq1EXUMJNxdIR11IGjDhziDgQIMACpCaYhyPxEcAAAAABJRU5ErkJggg==') no-repeat center/40px 40px
    }
  }

  .describe {
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-weight: 600;

    .count-box {
      display: flex;
      position: relative;

      .count-to {
        font-size: 28px;
        color: $screen-theme;
      }

      .tag-box {
        margin-left: 10px;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 0 5px;
        height: 20px;
        line-height: 20px;
        min-width: 50px;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        color: #fff;
        background: #052575;

        .tag {
          margin-right: 2px;
        }
      }
    }

    .item-title {
      font-size: 12px;
      letter-spacing: 1px;
      color: #fff;
    }

    &:hover {
      .count-to {
        transform: scale(1.2);
        transform-origin: center bottom;
      }
    }
  }

  &:nth-of-type(odd) {
    margin-bottom: 12px;
  }
}

/* 颜色切换 */
.decrease {
  color: red !important
}

.increase {
  color: #40EC11 !important
}
</style>
