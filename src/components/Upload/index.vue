<template>
  <div class="file-upload">
    <!-- <button @click="triggerUpload" :disabled="isLoadingFlag">
      <span v-if="isLoadingFlag">正在上传</span>
      <span v-else>点击上传</span>
    </button> -->
    <div
      class="upload-area"
      @click="triggerUpload"
    >
      <slot v-if="isLoadingFlag" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    >
    <ul>
      <li
        v-for="(file, idx) in fileList"
        :class="`uploaded-file upload-${file.status}`"
        :key="file.uid"
      >
        <span class="filename">{{ file.name }}</span>
        <button @click="deleteFileItem(idx)">Del</button>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref } from 'vue'
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import { UploadFile } from './index'
import { v4 } from 'uuid'

export default defineComponent({
  components: {
    // DeleteOutlined,
    // LoadingOutlined,
    // FileOutlined
  },

  props: {
    action: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileList = ref<UploadFile[]>([])

    const isLoadingFlag = computed(() => fileList.value.some(item => item.status === 'loading'))
    const lastFileData = computed(() => {
      const lastFile = fileList.value.slice(-1)[0]
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })

    // 点击上传文件
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    // 选择文件
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files

      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)

        const fileItem = reactive<UploadFile>({
          uid: v4(),
          size: uploadedFile.size,
          name: uploadedFile.name,
          status: 'loading',
          raw: uploadedFile
        })
        fileList.value.push(fileItem)

        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            console.log(res)
            fileItem.status = 'success'
            fileItem.resp = res.data
          })
          .catch(err => {
            console.log(err)
            fileItem.status = 'error'
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }

    // 删除某一项
    const deleteFileItem = (idx: number) => {
      fileList.value.splice(idx, 1)
    }

    return {
      fileInput,
      fileList,
      isLoadingFlag,
      lastFileData,
      triggerUpload,
      handleFileChange,
      deleteFileItem
    }
  }
})

</script>

<style lang='scss' scoped>
.upload {
  &-loading {
    color: yellow
  }

  &-success {
    color: green
  }

  &-error {
    color: red
  }
}
</style>
