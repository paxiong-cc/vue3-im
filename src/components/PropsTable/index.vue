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
          v-bind="item.extraProps"
          v-on="item.events"
        >
          <template v-if="item.options">
            <component
              v-for="(_item, _idx) in item.options"
              :is="item.subComponent"
              :key="_idx"
              :value="_item.value"
            >
              <RenderVnode :vNode="_item.text" />
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
import RenderVnode from './RenderVnode'
import ColorPicker from '../ColorPicker/index.vue'

export default defineComponent({
  name: 'PropsTable',

  components: {
    RenderVnode,
    ColorPicker
  },

  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      default: () => {
        return {}
      }
    }
  },

  emits: ['change'],

  setup(props, context) {
    const finalProps = computed(() => {
      const keyList = Object.keys(props.props || {})
      const finalProps: PropsToForms = {}

      for (const key of keyList) {
        const newKey = key as keyof PropsToForms
        if (!Reflect.has(mapPropsToForms, newKey)) {
          continue
        }

        const mapPropsItem = mapPropsToForms[newKey]
        if (mapPropsItem) {
          const { eventName = 'change', initalTransform, afterTransform } = mapPropsItem
          mapPropsItem.value = initalTransform ? initalTransform(props.props[newKey]) : props.props[newKey]
          mapPropsItem.events = {
            [eventName]: (e: any) => { context.emit('change', { newKey, value: afterTransform ? afterTransform(e) : e }) }
          }
        }

        finalProps[newKey] = mapPropsItem
      }

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
