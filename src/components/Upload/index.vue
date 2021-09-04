<template>
  <div class="file-upload">
    <!-- 按钮 -->
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
    <!-- 上传列表 -->
    <!-- <ul>
      <li
        v-for="(file, idx) in fileList"
        :class="`uploaded-file upload-${file.status}`"
        :key="file.uid"
      >
        <span class="filename">{{ file.name }}</span>
        <button @click="deleteFileItem(idx)">Del</button>
      </li>
    </ul> -->
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref, PropType } from 'vue'
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'
import axios from 'axios'
import { UploadFile } from './index'
import { v4 } from 'uuid'

type BeforeUpload = (file: File) => void
type fn = () => void

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
    },

    // 上传前回调
    beforeUpload: {
      type: Function as PropType<BeforeUpload>,
      required: false
    },

    // 上传成功回调
    uploadSuccess: {
      type: Function as PropType<fn>,
      required: false
    },

    // 上传失败回调
    uploadError: {
      type: Function as PropType<fn>,
      required: false
    }
  },

  setup(props, context) {
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

    // 上传前调用
    const beforeUpload = (file: File) => {
      context.emit('beforeUpload', file)
    }

    // 上传成功回调
    const uploadSuccess = () => {
      context.emit('uploadSuccess')
    }

    // 上传失败回调
    const uploadError = () => {
      context.emit('uploadError')
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

        // 上传前回调
        beforeUpload(uploadedFile)

        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            fileItem.status = 'success'
            fileItem.resp = res.data
            // 上传成功回调
            uploadSuccess()
          })
          .catch(() => {
            fileItem.status = 'error'
            // 上传失败回调
            uploadError()
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
