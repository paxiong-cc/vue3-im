import { Module } from 'vuex'
import { GlobalDataProps, ComponentData, EditorProps, Record } from '../interfaces'
import { TextComponentProps } from '@/components/PText/interface'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import { message } from 'ant-design-vue'
// message.config({
//   duration: 1
// })

export const componentData: ComponentData[] = [
  { id: uuidv4(), text: '组件1', name: 'p-text', props: { width: '100px', height: '50px', text: 'hello', fontSize: '12px', position: 'absolute', top: '100px', left: '100px' }, isHidden: false, isLocked: false }
  // { id: uuidv4(), text: '组件二', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件三', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件四', name: 'p-text', props: { text: 'hello' }, isHidden: false, isLocked: false },
  // { id: uuidv4(), text: '组件五', name: 'p-text', props: { text: 'hello3', fontSize: '15px', lineHeight: '3', textAlign: 'left', fontFamily: '"SimSun","STSong"' }, isHidden: false, isLocked: false }
]

type Direction = 'top' | 'left'

function addRecord(state: EditorProps, record: Record) {
  state.historyCompnent = cloneDeep(state.components)
  state.historyRecords = state.historyRecords.slice(0, state.recordPointer + 1)
  state.historyRecords.push(record)
  state.recordPointer = state.historyRecords.length - 1
}

function insert(state: EditorProps, idx: number, record: Record): ComponentData[] {
  const current: ComponentData = record.component as ComponentData
  let newComponentData: ComponentData[] = []
  newComponentData = newComponentData.concat(state.components.slice(0, idx), [current], state.components.slice(idx + 1))
  return newComponentData
}

// function curryAddRecord(state: EditorProps) {
//   return function(record: Record) {
//     state.recordPointer += 1
//     state.historyRecords.push(record)
//   }
// }

// const generateRecord = curryAddRecord(editor.state as EditorProps)

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    backPic: '',
    components: componentData,
    currentElement: '', // id
    copyComponent: '',
    historyRecords: [],
    recordPointer: -1,
    historyCompnent: []
  },

  mutations: {
    addComponent(state, item: ComponentData) {
      const cloneItem = cloneDeep(item)
      addRecord(state, { type: 'add', idx: state.components.length, component: cloneItem })
      state.components.push(cloneItem)
    },

    selectCurrentElement(state, id: string) {
      state.currentElement = id
    },

    updateComponent(state, { newKey, value }) {
      const item = state.components.find(item => item.id === state.currentElement)
      if (item && newKey) {
        const oldValue = item.props[newKey as keyof TextComponentProps]
        item.props[newKey as keyof TextComponentProps] = value
        addRecord(state, { type: 'change', elementId: state.currentElement, props: { [newKey as keyof TextComponentProps]: oldValue } })
      }
    },

    // 设置背景图片
    setBackPic(state, src: string) {
      state.backPic = src
    },

    // 拖动改变位置
    setPosition(state, positions) {
      const item = state.components.find(item => item.id === state.currentElement)
      const record = cloneDeep(positions)
      Object.keys(record).forEach(key => {
        record[key] = item?.props[key as keyof TextComponentProps]
      })
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

      addRecord(state, { type: 'change', elementId: state.currentElement, props: record })
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
        addRecord(state, { type: 'add', idx: state.components.length, component: cloneDeep(state.copyComponent) })
        state.components.push(state.copyComponent)
      }
    },

    // 取消元素选择
    cacelComponentSelect(state) {
      state.currentElement = ''
    },

    // 删除元素
    deleteComponent(state) {
      let deleteItem
      let index = -1
      state.components = state.components.filter((item, idx) => {
        if (item.id !== state.currentElement) {
          return true
        } else {
          deleteItem = item
          index = idx
          return false
        }
      })

      addRecord(state, { type: 'delete', idx: index, component: deleteItem })
    },

    // 移动元素
    moveComponent(state, { direction, amount }) {
      const component = state.components.find(item => item.id === state.currentElement) as ComponentData

      if (component) {
        const oldValue = component.props[direction as Direction]
        component.props[direction as Direction] = (parseInt(component.props[direction as Direction] as string) || 0) + amount + 'px'
        addRecord(state, { type: 'change', elementId: state.currentElement, props: { [direction as keyof Record]: oldValue + 'px' } })
      }
    },

    // 回退
    redo(state) {
      // 判断当前索引对应的值是否有记录
      const record = state.historyRecords[state.recordPointer]

      if (record) {
        state.recordPointer--
        const elementId = record.elementId

        switch (record.type) {
          case 'add':
            state.components = state.components.filter(item => item.id !== record?.component?.id)
            break

          case 'delete':
            state.components = insert(state, record.idx || 0, record)
            break

          case 'change':
            if (elementId) {
              const item = state.components.filter(item => item.id === elementId)[0]
              const props = record.props

              if (props) {
                Object.keys(props).forEach(key => {
                  item.props[key as keyof TextComponentProps] = props[key as keyof TextComponentProps]
                })
              }
            }
            break
        }
      }
    },

    // 重做
    undo(state) {
      state.components = cloneDeep(state.historyCompnent)
      state.recordPointer = state.historyRecords.length - 1
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
