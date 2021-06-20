import { Module } from 'vuex'
import { GlobalDataProps, ComponentData, EditorProps } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'

const componentData: ComponentData[] = [
  { id: uuidv4(), name: 'p-text', props: { text: 'hello', color: 'red', fontSize: '12px' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello' }},
  { id: uuidv4(), name: 'p-text', props: { text: 'hello' }}
]

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: componentData,
    currentElement: ''
  }
}

export default editor
