<template>
  <div>
    <div
      v-for="(item, idx) in finalProps"
      :key="idx"
      class="prop-item"
    >
      <span class="label" v-if="item.text">{{ item.text }}</span>
      <div class="prop-component">
        <component
          :is="item.component"
          :value="item.value"
          :props="item.extraProps"
        >
          <template v-if="item.options">
            <component
              v-for="(_item, _idx) in item.options"
              :is="item.subComponent"
              :key="_idx"
            >
              {{ _item.value }}
            </component>
          </template>
        </component>
      </div>
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
          mapPropsItem.value = mapPropsItem.initalTransform ? mapPropsItem.initalTransform(props.props[newKey]) : props.props[newKey]
        }
        finalProps[newKey] = mapPropsItem
      })
      console.log(finalProps)
      return finalProps
    })

    return {
      finalProps
    }
  }
})

</script>

<style lang='scss' scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
</style>
