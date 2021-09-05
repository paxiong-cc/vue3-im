import { Module } from 'vuex'
import { GlobalDataProps, ComponentData, EditorProps } from '../interfaces'
import { TextComponentProps } from '@/components/PText/interface'
import { v4 as uuidv4 } from 'uuid'

const componentData: ComponentData[] = [
  { id: uuidv4(), text: '组件一', name: 'p-text', props: { width: '100px', height: '50px', text: 'hello', fontSize: '12px', position: 'absolute', top: '100px', left: '100px' }, isHidden: false, isLocked: false }
  // { id: uuidv4(), text: '组件二', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件三', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件四', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件五', name: 'p-text', props: { text: 'hello3', fontSize: '15px', lineHeight: '3', textAlign: 'left', fontFamily: '"SimSun","STSong"' }, isHidden: false, isLocked: false }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    backPic: '',
    components: componentData,
    currentElement: '' // id
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

    setBackPic(state, src: string) {
      state.backPic = src
    },

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
    }
  },

  getters: {
    getCurrentComponent: (state) => {
      return state.components.find(item => item.id === state.currentElement) || null
    },

    getBackPic: (state) => {
      return state.backPic
    }
  }
}

export default editor
