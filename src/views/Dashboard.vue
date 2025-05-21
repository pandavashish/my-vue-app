<template>
  <div>
    <h2>Dashboard</h2>
    <p v-if="user">Welcome, {{ user.name }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../axios'

const user = ref(null)

onMounted(async () => {
  try {
    const res = await api.get('user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    user.value = res.data
  } catch (err) {
    console.error(err)
    alert('Unauthorized or token expired')
  }
})
</script>
