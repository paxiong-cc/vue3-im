import useHotKey from '@/hooks/useHotKeys'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/interfaces'
import { HotkeysEvent, KeyHandler } from 'hotkeys-js'

const preventDefault = (cb: KeyHandler) => {
  return (e: KeyboardEvent, event: HotkeysEvent) => {
    e.preventDefault()
    cb(e, event)
  }
}

export default function initHotKeys() {
  const store = useStore<GlobalDataProps>()
  // 复制图层
  useHotKey('ctrl+c', () => {
    store.commit('copyComponent')
  })
  // 粘贴图层
  useHotKey('ctrl+v', () => {
    store.commit('pasteComponent')
  })
  // 取消选中
  useHotKey('esc', () => {
    store.commit('cacelComponentSelect')
  })
  // 删除元素
  useHotKey('backspace, delete', () => {
    store.commit('deleteComponent')
  })

  useHotKey('up', preventDefault(() => {
    store.commit('moveComponent', { direction: 'top', amount: -1 })
  }))
  useHotKey('down', preventDefault(() => {
    store.commit('moveComponent', { direction: 'top', amount: 1 })
  }))
  useHotKey('left', () => {
    store.commit('moveComponent', { direction: 'left', amount: -1 })
  })
  useHotKey('right', () => {
    store.commit('moveComponent', { direction: 'left', amount: 1 })
  })
  useHotKey('ctrl+z', preventDefault(() => {
    store.commit('redo')
  }))
  useHotKey('ctrl+shift+z', preventDefault(() => {
    store.commit('undo')
  }))
}
