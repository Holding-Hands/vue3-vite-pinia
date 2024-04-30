<template>
  <div>1111</div>
</template>

<script setup lang="ts">
import { login } from '@/api/login/login'

const params = {
  name: 'coderwhy',
  password: '123456',
}
login(params).then((res) => {
  console.log(res)
})
</script>

<style scoped lang="scss"></style>
