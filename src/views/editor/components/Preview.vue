<template>
  <!-- <a-modal v-model:visible="showPreView" title="Basic Modal" @ok="handleOk"> -->
  <a-modal v-model:visible="showPreView" title="Basic Modal" okText="点击下载" @ok="handleOk">
    <img id="preview" style="width: 375px" :src="url">
  </a-modal>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },

    url: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  setup(props, context) {
    const showPreView = ref<boolean>(false)

    watch(() => props.modelValue, (val) => {
      if (val) {
        showPreView.value = val as boolean
      }
    })

    watch(() => showPreView.value, (val) => {
      if (!val) {
        context.emit('update:modelValue', false)
      }
    })

    const handleOk = () => {
      var link = document.createElement('a')
      link.href = props.url
      link.download = 'download.png'
      link.click()
    }

    return {
      showPreView,
      handleOk
    }
  }
})

</script>

<style lang='scss' scoped>
</style>
