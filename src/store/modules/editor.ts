import { Module } from 'vuex'
import { GlobalDataProps, ComponentData, EditorProps } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'

const componentData: ComponentData[] = [
  { id: uuidv4(), name: 'p-text', props: { text: 'hello', fontSize: '12px' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello3', fontSize: '15px', lineHeight: '3', textAlign: 'left' }}
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: componentData,
    currentElement: ''
  },

  mutations: {
    addComponent(state, item: ComponentData) {
      state.components.push(item)
    },

    selectCurrentElement(state, id: string) {
      state.currentElement = id
    }
  },

  getters: {
    getCurrentComponent: (state) => {
      return state.components.find(item => item.id === state.currentElement) || null
    }
  }
}

export default editor
