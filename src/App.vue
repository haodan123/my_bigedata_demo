<script setup>
import { RouterView } from 'vue-router'
import { requestGet } from '@/api/index.js'
import { onMounted } from 'vue'
const getToken = async () => {
  const { data: res } = await requestGet('/pgz-api/example/lbLogin', {
    account: '13086429696',
    password: '13086429696'
  })
  const token = res.data.token
  localStorage.setItem('token', token)
}
onMounted(() => {
  // getToken()
})
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss"></style>
