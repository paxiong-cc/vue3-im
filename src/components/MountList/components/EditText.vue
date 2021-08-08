<template>
  <div @click="tapInput" class="inline-edit" ref="wrapper">
    <input
      v-model="innerValue"
      v-if="isEditing"
      placeholder="文本不能为空"
      ref="inputRef"
      class="ant-input"
    />
    <slot v-else :text="innerValue"><span>{{innerValue}}</span></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import useMouseOut from '@/hooks/useMounseOut'

export default defineComponent({
  name: 'Home',

  props: {
    text: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const innerValue = ref(props.text)
    const isEditing = ref(false)
    const wrapper = ref<null | HTMLElement>(null)
    const isOutside = useMouseOut(wrapper)

    watch(isOutside, (newValue) => {
      newValue
        ? isEditing.value = false
        : isEditing.value = true
      console.log(newValue, 555)
    })

    const tapInput = () => {
      isEditing.value = true
    }

    return {
      isEditing,
      innerValue,
      wrapper,
      tapInput
    }
  }
})

</script>

<style lang='scss' scoped>
</style>
