import { Module } from 'vuex'
import { GlobalDataProps, ComponentData, EditorProps } from '../interfaces'
import { TextComponentProps } from '@/components/PText/interface'
import { v4 as uuidv4 } from 'uuid'

const componentData: ComponentData[] = [
  { id: uuidv4(), text: '组件一', name: 'p-text', props: { text: 'hello', fontSize: '12px' }, isHidden: false, isLocked: false },
  { id: uuidv4(), text: '组件二', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  { id: uuidv4(), text: '组件三', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  { id: uuidv4(), text: '组件四', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  { id: uuidv4(), text: '组件五', name: 'p-text', props: { text: 'hello3', fontSize: '15px', lineHeight: '3', textAlign: 'left', fontFamily: '"SimSun","STSong"' }, isHidden: false, isLocked: false }
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
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
    }
  },

  getters: {
    getCurrentComponent: (state) => {
      return state.components.find(item => item.id === state.currentElement) || null
    }
  }
}

export default editor
