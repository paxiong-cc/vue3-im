<template>
  <component :is="tag" :style="styleProps" class="l-text-component" @click="handleClick">
    {{ text }}
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useComponentCommon from './methods'
import { transformToComponentProps } from '../interface/common'
import { textDefaultProps, textStylePropNames } from './interface'
const defaultProps = transformToComponentProps(textDefaultProps)

export default defineComponent({
  name: 'PText',

  props: {
    tag: {
      type: String,
      default: 'text'
    },
    ...defaultProps
  },

  setup(props) {
    // 抽离并且获得 styleProps 以及点击事件
    const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames)
    return {
      styleProps,
      handleClick
    }
  }
})
</script>

<style scoped>
h2.l-text-component, p.l-text-component {
  margin-bottom: 0;
}

button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}

.l-text-component {
  box-sizing: border-box;
  white-space: pre-wrap;
  /* position: relative !important; */
}
</style>
