<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item)"
    >
      <PText style="position: relative" v-bind="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import PText from '../PText/index.vue'
import { ComponentData } from '@/store/interfaces'
import { TextComponentProps } from '../PText/interface'

export default defineComponent({
  name: 'ComponentList',

  components: {
    PText
  },

  props: {
    list: {
      type: Array as PropType<TextComponentProps[]>,
      required: true
    }
  },

  emits: ['on-item-click'],

  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        name: 'p-text',
        id: uuidv4(),
        props,
        isHidden: false,
        isLocked: false,
        text: '组件一'
      }
      context.emit('on-item-click', componentData)
    }

    return {
      onItemClick
    }
  }
})
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
