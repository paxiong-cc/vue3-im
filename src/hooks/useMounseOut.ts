import { ref, Ref, onMounted, onUnmounted } from 'vue'

const useMouseOut = (elementRef: Ref<null | HTMLElement>): Ref<boolean> => {
  console.log(555)
  console.log(elementRef)
  const isOut = ref(false)
  const handler = (e: MouseEvent) => {
    console.log(333)
    if (!(elementRef.value && e.target)) {
      return false
    }
    console.log(444)

    if (elementRef.value.contains(e.target as HTMLElement)) {
      isOut.value = false
    } else {
      isOut.value = true
    }
  }

  onMounted(() => {
    console.log(222)
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isOut
}

export default useMouseOut
