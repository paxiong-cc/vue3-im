<template>
  <div
    v-for="(item, idx) in templateList"
    :key="idx"
    :class="{ 'selected': selectId === item.id }"
    class="component-item"
    @click="selectItem(item.id)"
  >
    <a-tooltip :title="item.isHidden ? '显示': '隐藏'" @click="updateHidden(item)">
      <a-button shape="circle">
        <template v-slot:icon v-if="item.isHidden"><EyeOutlined /> </template>
        <template v-slot:icon v-else><EyeInvisibleOutlined /> </template>
      </a-button>
    </a-tooltip>
    <a-tooltip :title="item.isLocked ? '解锁' : '锁定'" @click="updateLocked(item)">
      <a-button shape="circle">
        <template v-slot:icon v-if="!item.isLocked"><UnlockOutlined /> </template>
        <template v-slot:icon v-else><LockOutlined /> </template>
      </a-button>
    </a-tooltip>
    <EditText :text="item.text" :is-locked="item.isLocked" style="flex: 1" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, PropType } from 'vue'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined, DragOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ComponentData } from '@/store/interfaces'
import EditText from './components/EditText.vue'

export default defineComponent({
  name: 'Home',

  components: {
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    EditText
    // DragOutlined
  },

  props: {
    templateList: {
      type: Object as PropType<ComponentData>,
      required: true
    }
  },

  emits: ['select-item'],

  setup(props, context) {
    const store = useStore<GlobalDataProps>()
    const selectId = computed(() => store.state.editor.currentElement)

    // 更新组件显隐
    const updateHidden = (item: ComponentData) => {
      item.isHidden = !item.isHidden
      store.commit('updateComponent', item)
    }

    // 更新组件锁定
    const updateLocked = (item: ComponentData) => {
      item.isLocked = !item.isLocked
      store.commit('updateComponent', item)
    }

    // 选中组件
    const selectItem = (id: string) => {
      context.emit('select-item', id)
    }

    return {
      selectId,
      updateHidden,
      updateLocked,
      selectItem
    }
  }
})

</script>

<style lang='scss' scoped>
.selected {
  border: 1px solid blue;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%
}
</style>
