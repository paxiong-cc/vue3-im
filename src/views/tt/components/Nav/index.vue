<template>
  <!-- 顶部导航 -->
  <nav class="nav">
    <!-- 左侧 -->
    <div class="nav-left">
      <div class="top">
        <div class="date">2020-01-25 09:27:16 星期一</div>
        <div class="high-lights">
          <ul class="lignt-box">
            <li v-for="key in 3" :key="key" :class="`light-left-item-${key}`"></li>
          </ul>
        </div>
      </div>
      <div class="select">asd</div>
    </div>

    <!-- 标题 -->
    <div class="nav-body">
      <div class="inside">
        <div class="circle-left">
          <div v-for="key in 4" :key="key" :class="`circle-${key}`"></div>
        </div>
        <div class="company-title">魅居科技</div>
        <ul class="circle-right">
          <li v-for="key in 4" :key="key" :class="`circle-${key}`"></li>
        </ul>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="nav-right">
      <div class="high-lights">
        <ul class="lignt-box">
          <li v-for="key in 3" :key="key" :class="`light-right-item-${key}`"></li>
        </ul>
      </div>
      <div class="personal">
        <router-link to=''>管理平台</router-link>
        <img class="icon" src="" alt="">
        <img class="user" src="" alt="">
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      timer: null
    }
  },

  mounted() {
    this.animateLeft()
    this.animateRight()

    this.timer = setInterval(() => {
      this.animateLeft()
      this.animateRight()
    }, 2600)
  },

  beforeUnmount() {
    clearInterval(this.timer)
  },

  methods: {
    // 左侧动画
    animateLeft() {
      const hl2 = document.querySelector('.light-left-item-2')
      const hl3 = document.querySelector('.light-left-item-3')

      setTimeout(() => {
        hl2.style.visibility = 'visible'
      }, 800)

      setTimeout(() => {
        hl3.style.visibility = 'visible'
      }, 1600)

      setTimeout(() => {
        hl2.style.visibility = 'hidden'
        hl3.style.visibility = 'hidden'
      }, 2400)
    },

    // 右侧动画
    animateRight() {
      const hr2 = document.querySelector('.light-right-item-2')
      const hr3 = document.querySelector('.light-right-item-3')

      setTimeout(() => {
        hr2.style.visibility = 'visible'
      }, 800)

      setTimeout(() => {
        hr3.style.visibility = 'visible'
      }, 1600)

      setTimeout(() => {
        hr2.style.visibility = 'hidden'
        hr3.style.visibility = 'hidden'
      }, 2400)
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-theme: #23C5F3; // 主题色

/* 导航 */
.nav {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 140px;
}

@keyframes high-opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.6;
  }
}
/* 左侧 */
.nav-left {
 .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    width: 410px;
    height: 28px;
    background: url('../../homePic/nav_left.png') no-repeat left center/410px 28px;

    .date {
      margin-left: 15px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 2px;
      color: $screen-theme
    }

    .high-lights {
      display: flex;
      position: relative;
      margin-right: 25px;
      width: 10px;
      height: 10px;

      .lignt-box {
        animation: high-opacity 1.2s linear infinite alternate;

        @for $i from 1 through 3 {
          .light-left-item-#{$i} {
            display: block;
            position: absolute;
            right: 0;
            @if $i!=1 {
              right: #{(25 * ($i - 1))}px;
              opacity: #{1 - ($i * 2)/10};
              visibility: hidden;
            }
            width: 36px;
            height: 16px;
            background: url('../../homePic/highlight_left.png') no-repeat center/36px 16px;
          }
        }
      }
    }
 }
}

/* 右侧 */
.nav-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 405px;
  height: 28px;
  background: url('../../homePic/nav_right.png') no-repeat center/405px 28px;

  .high-lights {
    display: flex;
    position: relative;
    margin-left: 25px;
    width: 10px;
    height: 10px;

    .lignt-box {
      width: 10px;
      animation: high-opacity 1.2s linear infinite alternate;

      @for $i from 1 through 3 {
        .light-right-item-#{$i} {
          display: block;
          position: absolute;
          @if $i!=1 {
            left: #{(25 * ($i - 1))}px;
            opacity: #{1 - ($i * 2)/10};
            visibility: hidden;
          }
          width: 36px;
          height: 16px;
          background: url('../../homePic/highlight_right.png') no-repeat center/36px 16px;
        }
      }
    }
  }

  .personal {
    a {
      margin-right: 20px;
      text-decoration: none;
      color: $screen-theme;

      &:hover {
        color: #6ADEFC
      }
    }
  }
}

/* 标题 */
@for $i from 1 through 5 {
  @keyframes circle-opacity-#{$i} {
    from {
      opacity: #{(5 + $i) / 10};
    }
    to {
      opacity: 0.1;
    }
  }
}

.nav-body {
  position: absolute;
  top: -20px;
  left: 50%;
  width: 1205px;
  height: 140px;
  background: url('../../homePic/nav.png') no-repeat center/1205px 140px;
  transform: translateX(-602px);

  .inside {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 140px;

    .circle-left {
      display: flex;
      align-items: center;
      position: absolute;
      top: 30px;
      left: 140px
    }

    .company-title {
      margin-bottom: 30px;
      width: 200px;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      letter-spacing: 4px;
      color: $screen-theme;
    }

    .circle-right {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      position: absolute;
      top: 30px;
      right: 140px
    }

    @for $i from 1 through 5 {
      .circle-#{$i} {
        margin-right: 12px;
        width: #{$i * 2 + 4}px;
        height: #{$i * 2 + 4}px;
        border-radius: 50%;
        background: #1FA7D6;
        animation: circle-opacity-#{$i} 1.4s linear infinite alternate;
        animation-delay: #{1 - ($i/10) * 3}s;
      }
    }
  }
}
</style>
