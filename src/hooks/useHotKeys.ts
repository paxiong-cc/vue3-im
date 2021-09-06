import hotkeys, { KeyHandler } from 'hotkeys-js'
import { onMounted, onUnmounted } from 'vue'

const useHotKey = (key: string, callback: KeyHandler) => {
  onMounted(() => {
    hotkeys(key, callback)
  })

  onUnmounted(() => {
    hotkeys.unbind(key, callback)
  })
}

export default useHotKey

