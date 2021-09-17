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
        <a-layout-content :class="{ 'clear-shadow': clearShadow }" class="preview-container">
          <div style="display: flex; justify-content: space-between">
            <p>画布区域</p>
            <div @click="save" style="margin-left: 20px">预览</div>
          </div>
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

    <!-- 预览 -->
    <Preview v-model="showPreView" :url="url" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
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
import html2canvas from 'html2canvas'
import Preview from './components/Preview.vue'

export default defineComponent({
  components: {
    PText,
    ComponentList,
    // PropsTable,
    MountList,
    BackGround,
    EditGroup,
    EditWrapper,
    Preview
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
    const clearShadow = ref(false)
    const showPreView = ref(false)
    const url = ref('')

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
        const previewList = getParentElement(e.target as HTMLElement, 'preview-list')
        if (previewList) {
          store.commit('selectCurrentElement', '')
        }
      }
    }

    // 点击元素外自动取消选中
    onMounted(() => {
      document.addEventListener('click', handleClick)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClick)
    })

    // 保存画布图片
    const save = async() => {
      function getCanvasBlob(canvas: HTMLCanvasElement) {
        return new Promise<Blob | null>(resolve => {
          canvas.toBlob(blob => {
            resolve(blob)
          })
        })
      }

      clearShadow.value = true
      await nextTick()

      // 获取页面DOM生成cavas
      const canvas = await html2canvas(document.querySelector('#canvas-area') as HTMLElement, { width: 375, useCORS: true, scale: 1 })
      // 生成的canvas二进制
      const canvasBlob = await getCanvasBlob(canvas)

      // const file = new File([canvasBlob], 'name')
      // const formData = new FormData()
      // formData.append(file.name, file)

      url.value = canvas.toDataURL()
      clearShadow.value = false
      showPreView.value = true
    }

    return {
      components,
      defaultTextTemplates,
      selectItemProps,
      clearShadow,
      selectItemId,
      activeKey,
      editComponents,
      getBackPic,
      url,
      showPreView,
      selectItem,
      moveDown,
      save,
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

.preview-container.clear-shadow .preview-list  * {
  box-shadow: none !important;
}
</style>
