import { Module } from 'vuex'
import { GlobalDataProps, ComponentData, EditorProps } from '../interfaces'
import { TextComponentProps } from '@/components/PText/interface'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import { message } from 'ant-design-vue'
message.config({
  duration: 1
})

const componentData: ComponentData[] = [
  { id: uuidv4(), text: '组件1', name: 'p-text', props: { width: '100px', height: '50px', text: 'hello', fontSize: '12px', position: 'absolute', top: '100px', left: '100px' }, isHidden: false, isLocked: false }
  // { id: uuidv4(), text: '组件二', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件三', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件四', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件五', name: 'p-text', props: { text: 'hello3', fontSize: '15px', lineHeight: '3', textAlign: 'left', fontFamily: '"SimSun","STSong"' }, isHidden: false, isLocked: false }
]
type Direction = 'top' | 'left'

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    backPic: '',
    components: componentData,
    currentElement: '', // id
    copyComponent: ''
  },

  mutations: {
    addComponent(state, item: ComponentData) {
      state.components.push(item)
    },

    selectCurrentElement(state, id: string) {
      state.currentElement = id
    },

    updateComponent(state, { newKey, value }) {
      const item = state.components.find(item => item.id === state.currentElement)
      if (item && newKey) {
        item.props[newKey as keyof TextComponentProps] = value
      }
    },

    // 设置背景图片
    setBackPic(state, src: string) {
      state.backPic = src
    },

    // 拖动改变位置
    setPosition(state, positions) {
      const item = state.components.find(item => item.id === state.currentElement)
      if (item) {
        if (positions.top) {
          item.props.top = positions.top + 'px'
        }

        if (positions.left) {
          item.props.left = positions.left + 'px'
        }

        if (positions.width) {
          item.props.width = positions.width + 'px'
        }

        if (positions.height) {
          item.props.height = positions.height + 'px'
        }
      }
    },

    // 复制图层
    copyComponent(state) {
      if (state.currentElement) {
        const component = state.components.find(item => item.id === state.currentElement) || null
        if (component) {
          const element = cloneDeep(component)
          element.text = '组件' + (state.components.length + 1)
          element.id = uuidv4()
          state.copyComponent = element
          message.success('拷贝成功')
        }
      }
    },

    // 粘贴图层
    pasteComponent(state) {
      if (state.copyComponent) {
        state.components.push(state.copyComponent)
      }
    },

    // 取消元素选择
    cacelComponentSelect(state) {
      state.currentElement = ''
    },

    // 删除元素
    deleteComponent(state) {
      state.components = state.components.filter(item => item.id !== state.currentElement)
    },

    // 移动元素
    moveComponent(state, { direction, amount }) {
      const component = state.components.find(item => item.id === state.currentElement) as ComponentData
      if (component) {
        component.props[direction as Direction] = (parseInt(component.props[direction as Direction] as string) || 0) + amount + 'px'
      }
    }
  },

  getters: {
    getCurrentComponent: (state) => {
      return state.components.find(item => item.id === state.currentElement) || null
    },

    getBackPic: (state) => {
      return state.backPic
    },

    getCurrentElement: (state) => {
      return state.currentElement
    }
  }
}

export default editor
