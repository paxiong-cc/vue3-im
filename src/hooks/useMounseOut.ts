import { ref, Ref, onMounted, onUnmounted } from 'vue'

const useMouseOut = (elementRef: Ref<null | HTMLElement>): Ref<boolean> => {
  const isOut = ref(false)
  const handler = (e: MouseEvent) => {
    if (!(elementRef.value && e.target)) {
      return false
    }

    if (elementRef.value.contains(e.target as HTMLElement)) {
      isOut.value = false
    } else {
      isOut.value = true
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isOut
}

export default useMouseOut
