<template>
  <div class="editor-container">
    <a-layout>
      <!-- 组件选择 -->
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          <ComponentList :list="defaultTextTemplates" @onItemClick="addItem"/>
        </div>
      </a-layout-sider>

      <!-- 编辑页面 -->
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area" :style="{ backgroundImage: `url(${getBackPic})` }">
            <edit-wrapper
              v-for="component in editComponents"
              :key="component.id"
              :active="selectItemId === component.id"
              :props="component.props"
              :id="component.id"
              :select-id="selectItemId"
               @click="selectItem(component.id)"
               @moveDown="moveDown"
            >
              <component
                v-bind="component.props"
                :is="component.name"
              ></component>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>

      <!-- 选项列表 -->
      <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="组件属性">
            <template v-if="selectItemProps && !selectItemProps.isHidden && !selectItemProps.isLocked">
              <!-- <PropsTable :props="selectItemProps.props" @change="contentChange" /> -->
              <EditGroup :props="selectItemProps.props"  @change="contentChange"/>
              <pre>
                {{ selectItemProps && selectItemProps.props }}
              </pre>
            </template>
            <template v-else-if="selectItemProps && selectItemProps.isLocked">
              该组件被锁定
            </template>
            <template v-else>
              该组件暂被隐藏
            </template>
          </a-tab-pane>

          <a-tab-pane key="2" tab="背景设置">
            <BackGround />
          </a-tab-pane>

          <a-tab-pane key="3" tab="组件列表">
            <MountList @selectItem="selectItem" :template-list="components" />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ComponentData } from '@/store/interfaces'
import PText from '@/components/PText/index.vue'
import BackGround from './components/BackGround.vue'
import PropsTable from '@/components/PropsTable/index.vue'
import ComponentList from '@/components/ComponentList/index.vue'
import { defaultTextTemplates } from '@/utils/data'
import MountList from '@/components/MountList/index.vue'
import EditGroup from '@/components/EditGroup/index.vue'
import EditWrapper from '@/components/EditWrapper/index.vue'
import initHotKeys from '@/plugins/hotKeys'
import initContextMenu from '@/plugins/contextMenu'
import { getParentElement } from '@/utils/commonMethods'

export default defineComponent({
  components: {
    PText,
    ComponentList,
    // PropsTable,
    MountList,
    BackGround,
    EditGroup,
    EditWrapper
  },

  setup() {
    initContextMenu()
    initHotKeys()
    const store = useStore<GlobalDataProps>()

    // 获取数据
    const components = computed(() => store.state.editor.components)
    // 编辑页面数据
    const editComponents = computed(() => store.state.editor.components.filter(item => !item.isHidden))
    // 获取画布选中组件的属性
    const selectItemProps = computed<ComponentData | null>(() => store.getters.getCurrentComponent)
    const getBackPic = computed(() => store.getters.getBackPic)
    // const selectItemId = ref<string>('')
    const selectItemId = computed(() => store.getters.getCurrentElement)
    const activeKey = ref('1')

    // 添加组件
    const addItem = (item: ComponentData) => {
      store.commit('addComponent', item)
    }
    // 画布选中组件
    const selectItem = (id: string) => {
      // 获取组件属性
      store.commit('selectCurrentElement', id)
    }
    // 内容修改
    const contentChange = (e: any) => {
      store.commit('updateComponent', e)
    }

    // 移动结束
    const moveDown = (obj: { left?: number, top?: number, width?: number, height?: number }) => {
      store.commit('setPosition', obj)
    }

    const handleClick = (e: MouseEvent) => {
      const wrapperElement = getParentElement(e.target as HTMLElement, 'edit-wrapper')
      if (!wrapperElement) {
        store.commit('selectCurrentElement', '')
      }
    }

    // 点击元素外自动取消选中
    onMounted(() => {
      document.addEventListener('click', handleClick)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClick)
    })

    return {
      components,
      defaultTextTemplates,
      selectItemProps,
      selectItemId,
      activeKey,
      editComponents,
      getBackPic,
      selectItem,
      moveDown,
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
  min-height: 600px;
  border: 1px solid #efefef;
  background: #fff no-repeat;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
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
#canvas-area {
  background-size: 100% auto;
}
</style>
