<template>
  <div id="login">
    <h1 class="title">xxx后台管理系统</h1>
    <div class="content">
      <el-form ref="formRef" class="el-form" :model="form" :rules="rules">
        <!--  账号-->
        <el-form-item label="账 号" prop="username">
          <el-input v-model="form.username" size="large" placeholder="请输入账号" />
        </el-form-item>

        <!--   密码-->
        <el-form-item label="密 码" prop="password" style="margin-top: 45px">
          <el-input v-model.number="form.password" size="large" show-password placeholder="请输入密码" />
        </el-form-item>

        <!--   按钮-->
        <div class="footer-btn">
          <el-button type="primary" @click="handleLogin">登 录</el-button>
          <el-button type="info" @click="handleResetForm">重 置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { handleError } from '@/tools/message.ts'

const router = useRouter()
const state = reactive({
  form: {
    username: 'admin', // 账号
    password: 123456 as null | number, // 密码
  },
})

// 使用ref获取对表单的引用
const formRef = ref<FormInstance>()

const validate = (msg) => (_rule: any, value: any, callback: any) => {
  callback([null, undefined, ''].includes(value) ? new Error(msg) : '')
}

const rules = {
  username: [{ validator: validate('请输入账号!'), trigger: ['blur', 'trigger'], required: true }],
  password: [{ validator: validate('请输入密码!'), trigger: ['blur', 'trigger'], required: true }],
}

/**
 * 重置表单
 */
const handleResetForm = () => {
  formRef?.value?.resetFields()
}

const handleLogin = async () => {
  const isValid = formRef?.value?.validate()
  if (isValid) {
    try {
      if (state.form.username === 'admin' && state.form.password === 123456) {
        ElMessage.success('登陆成功！')
        router.push('/main')
        return
      }
      ElMessage.error('请输入正确的账号或密码！')
    } catch (error) {
      handleError(error || '系统错误！')
    }
  }
}

const { form } = toRefs(state)
</script>

<style scoped lang="scss">
#login {
  position: relative;
  background: #1a1b1d;
  height: 100vh;

  .title {
    padding: 10px 0;
    text-align: center;
    color: #3b85ff;
    font-size: 36px;
    height: 100px;
    line-height: 100px;
  }

  .content {
    background: #fff;
    width: 600px;
    height: 488px;
    position: absolute;
    border-radius: 6px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .el-form {
    height: 288px;
    width: 396px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    // 设置绑定的文字字体大小(账号，密码)
    label {
      font-size: 20px;
      color: #939393;
      margin-bottom: 15px;
    }
  }

  // 设置输入框的样式
  .el-input--small .el-input__inner {
    border: none;
    border-bottom: 1px solid #e0e0e0;
    color: #383838;
    font-size: 22px;
    padding: 0 0 0 35px;
  }

  // 按钮样式
  .el-button--mini,
  .el-button--small {
    font-size: 20px;
  }

  .footer-btn {
    display: flex;
    justify-content: center;
    margin-top: 100px;
    font-size: 20px;
  }
}
</style>
