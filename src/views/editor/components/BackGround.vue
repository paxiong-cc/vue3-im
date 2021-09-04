<template>
  <div>
    <Upload @beforeUpload="beforeUpload" action="" />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import Upload from '@/components/Upload/index.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/interfaces'

export default defineComponent({
  name: 'Home',

  components: {
    Upload
  },

  setup() {
    const store = useStore<GlobalDataProps>()

    const beforeUpload = (file: File) => {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function() {
        store.commit('setBackPic', this.result)
        console.log(this.result)
      }
    }

    return {
      beforeUpload
    }
  }
})

</script>

<style lang='scss' scoped>
</style>
