<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          <ComponentList :list="defaultTextTemplates" @onItemClick="addItem"/>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area">
            <PText
                v-for="component in components"
                :key="component.id"
                :id="component.id"
                v-bind="component.props"
            />
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">

      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ComponentData } from '@/store/interfaces'
import PText from '@/components/PText/index.vue'
import ComponentList from '@/components/ComponentList/index.vue'
import { defaultTextTemplates } from '@/utils/data'

export default defineComponent({
  components: {
    PText,
    ComponentList
  },

  setup() {
    const store = useStore<GlobalDataProps>()
    const components = computed(() => store.state.editor.components)
    const addItem = (item: ComponentData) => {
      store.commit('addComponent', item)
    }
    return {
      components,
      defaultTextTemplates,
      addItem
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
</style>
