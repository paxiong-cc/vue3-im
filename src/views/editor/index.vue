<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          <ComponentList :list="defaultTextTemplates" @onItemClick="addItem"/>
        </div>
        <Upload action="" />
      </a-layout-sider>

      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <PText
              :class="[selectItemId === component.id ? 'edit-wrapper' : '']"
              v-for="component in components"
              :key="component.id"
              v-bind="component.props"
              @click="selectItem(component.id)"
            />
          </div>
        </a-layout-content>
      </a-layout>

      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <PropsTable :props="selectItemProps && selectItemProps.props" @change="contentChange" />
        <pre>
          {{ selectItemProps && selectItemProps.props }}
        </pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ComponentData } from '@/store/interfaces'
import PText from '@/components/PText/index.vue'
import PropsTable from '@/components/PropsTable/index.vue'
import ComponentList from '@/components/ComponentList/index.vue'
import { defaultTextTemplates } from '@/utils/data'
import Upload from '@/components/Upload/index.vue'

export default defineComponent({
  components: {
    PText,
    ComponentList,
    PropsTable,
    Upload
  },

  setup() {
    const store = useStore<GlobalDataProps>()

    // 获取数据
    const components = computed(() => store.state.editor.components)
    // 获取画布选中组件的属性
    const selectItemProps = computed<ComponentData | null>(() => store.getters.getCurrentComponent)
    const selectItemId = ref<string>('')

    // 添加组件
    const addItem = (item: ComponentData) => {
      store.commit('addComponent', item)
    }
    // 画布选中组件
    const selectItem = (id: string) => {
      selectItemId.value = id
      // 获取组件属性
      store.commit('selectCurrentElement', id)
    }
    // 内容修改
    const contentChange = (e: any) => {
      store.commit('updateComponent', e)
    }

    return {
      components,
      defaultTextTemplates,
      selectItemProps,
      selectItemId,
      selectItem,
      addItem,
      contentChange
    }
  }
})

</script>

<style lang='scss' scoped>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid #1890ff !important;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>
