<template>
  <div
    class="edit-wrapper"
    ref="element"
    @mousedown="startMove"
    :class="{ active: active }"
    :style="styles"
  >
    <slot></slot>
    <div class="resizers">
      <div class='resizer top-left'></div>
      <div class='resizer top-right'></div>
      <div class='resizer bottom-left'></div>
      <div class='resizer bottom-right'></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue'
import { ComponentData } from '@/store/interfaces'
import { pick as _pick } from 'lodash-es'
import { context } from 'ant-design-vue/lib/vc-image/src/PreviewGroup'

export default defineComponent({
  name: 'Home',

  props: {
    active: {
      type: Boolean,
      default: true
    },

    props: {
      type: Object as PropType<ComponentData>
    }
  },

  setup(props, context) {
    const styles = _pick(props.props, ['position', 'top', 'left', 'width', 'height'])
    const element = ref<HTMLElement | null>(null)

    // 移动
    const startMove = (e: MouseEvent) => {
      // 鼠标与元素偏移
      const gap = {
        x: 0,
        y: 0
      }

      let elementWidth = 0

      if (element.value) {
        const { left, top, width } = element.value.getBoundingClientRect()
        elementWidth = width
        gap.x = e.clientX - left
        gap.y = e.clientY - top
      }

      // 获取当前元素的top, left
      const caculateMovePosition = (e: MouseEvent) => {
        const container = document.getElementById('canvas-area') as HTMLElement

        // const left = e.clientX - gap.x - container.offsetLeft >= 0
        //   ? e.clientX - gap.x - container.offsetLeft + elementWidth <= container.offsetWidth
        //     ? e.clientX - gap.x - container.offsetLeft
        //     : parseInt(String(container.offsetWidth - elementWidth))
        //   : 0

        const left = e.clientX - gap.x - container.offsetLeft >= 0
          ? e.clientX - gap.x - container.offsetLeft
          : 0

        const top = e.clientY - gap.y - container.offsetTop + container.scrollTop >= 0
          ? e.clientY - gap.y - container.offsetTop + container.scrollTop
          : 0

        return {
          left,
          top
        }
      }

      const mouseMove = (e: MouseEvent) => {
        const { left, top } = caculateMovePosition(e)
        if (element.value) {
          element.value.style.top = top + 'px'
          element.value.style.left = left + 'px'
        }
      }
      const mouseUp = (e: MouseEvent) => {
        const { left, top } = caculateMovePosition(e)
        context.emit('moveDown', { left, top })
        document.removeEventListener('mousemove', mouseMove)
        document.removeEventListener('mouseup', mouseUp)
      }

      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
    }

    return {
      styles,
      element,
      startMove
    }
  }
})

</script>

<style lang='scss' scoped>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
}
.edit-wrapper > * {
  position: static !important;
  width: 100% !important;
  height: 100% !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.hidden {
  display: none;
}
.edit-wrapper.active {
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .resizers {
  display: none;
}
.edit-wrapper.active .resizers {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  // width: 100%;
  // height: 100%;
}
.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #1890ff;
  position: absolute;
}
.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize;
}
.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
