import { onMounted, onUnmounted } from 'vue'

const useHotKey = (key: string, cb: () => any): void => {
  const handler = (event: KeyboardEvent) => {
    if (event.key === key) {
      cb()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handler)
  })
}

export default useHotKey
