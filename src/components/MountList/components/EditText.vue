<template>
  <div @click="handleClick" class="inline-edit" ref="wrapper">
    <input
      v-model="innerValue"
      v-if="isEditing"
      placeholder="文本不能为空"
      ref="inputRef"
      class="ant-input"
    />
    <slot v-else :text="innerValue"><span>{{ innerValue }}</span></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, nextTick } from 'vue'
import useMouseOut from '@/hooks/useMounseOut'
import useHotKey from '@/hooks/useHotKey'

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
    const inputRef = ref<null | HTMLElement>(null)
    const isEditing = ref(false)
    const wrapper = ref<null | HTMLElement>(null)
    const isOutside = useMouseOut(wrapper)

    watch(isOutside, (newValue) => {
      isEditing.value = !newValue
    })

    watch(isEditing, async(newValue) => {
      if (!newValue) {
        return
      }

      await nextTick()

      if (inputRef.value) {
        inputRef.value.focus()
      }
    })

    watch(() => props.text, (newValue) => {
      innerValue.value = newValue
    })

    useHotKey('Enter', () => {
      if (isEditing.value) {
        isEditing.value = false
      }
    })

    useHotKey('Escape', () => {
      if (isEditing.value) {
        isEditing.value = false
        innerValue.value = props.text
      }
    })

    const handleClick = () => {
      isEditing.value = true
    }

    return {
      isEditing,
      inputRef,
      innerValue,
      handleClick,
      wrapper
    }
  }
})

</script>

<style lang='scss' scoped>
</style>
