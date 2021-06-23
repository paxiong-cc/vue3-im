<template>
  <div>
    <div
      v-for="(item, idx) in finalProps"
      :key="idx"
      class="prop-item"
    >
      <component v-if="item" :is="item.component" :value="item.value">

      </component>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue'
import { TextComponentProps } from '../PText/interface'
import { mapPropsToForms, PropsToForms } from './index'

export default defineComponent({
  name: 'PropsTable',

  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      default: () => {
        return {}
      }
    }
  },

  setup(props) {
    const finalProps = computed(() => {
      const keyList = Object.keys(props.props || {})
      const finalProps: PropsToForms = {}

      keyList.forEach(key => {
        const newKey = key as keyof PropsToForms
        const mapPropsItem = mapPropsToForms[newKey]
        if (mapPropsItem) {
          mapPropsItem.value = props.props[newKey]
        }
        finalProps[newKey] = mapPropsItem
      })
      return finalProps
    })

    return {
      finalProps
    }
  }
})

</script>

<style lang='scss' scoped>
</style>
