<template>
  <div class="flex flex-start-center" @click="userInfoStore.age++">{{ userInfoStore.age }}</div>
  <el-upload
    ref="upload"
    drag
    class="upload-demo"
    :limit="1"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :auto-upload="false"
    action="#"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <template #tip>
      <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { useUserInfo } from '@/store/userInfo'
const userInfoStore = useUserInfo()
// ref<InstanceType<typeof 组件> 获取组件实例类型
const state = reactive({
  form: {
    pictures: '',
  },
  upload: null as InstanceType<typeof ElUpload> | null,
})

/**
 * 文件状态改变
 */
const handleChange: UploadProps['onChange'] = async (file) => {
  const mimeTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/jpeg',
  ]
  console.log(mimeTypes, 'mimeTypes')
  if (!mimeTypes.includes(file?.raw?.type as string)) {
    ElMessage.error('仅支持word、pdf、excel、jpg、jpeg格式上传！')
    handleRemove()
    return false
  }
  const isLt50M = (file.size as number) / 1024 / 1024 < 50
  if (!isLt50M) {
    ElMessage.error('上传文件大小不能超过 50MB!')
    handleRemove()
    return false
  }
  // const formData = new FormData()
  // formData.append('file', file.raw as UploadRawFile)
  // const data = await uploadFile(formData)
}

/**
 * 删除文件列表
 */
const handleRemove = () => {
  state.form.pictures = ''
  state.upload?.clearFiles()
}

const { upload } = toRefs(state)
</script>

<style scoped></style>
