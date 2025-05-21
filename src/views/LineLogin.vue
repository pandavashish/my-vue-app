<!-- src/views/LineLogin.vue -->
<template>
  <div class="text-center mt-5">
    <h2>Login with LINE</h2>

    <button @click="loginWithLine" class="line-login-btn">
      <i class="fab fa-line me-2"></i> Login with LINE
    </button>
  </div>
</template>

<script setup>
const loginWithLine = () => {
  const clientId = '2007453147' // Replace with your actual LINE client ID
  const redirectUri = encodeURIComponent('http://localhost:5173/line-callback') // Match your LINE console settings
  const state = Math.random().toString(36).substring(2)
  const scope = 'profile openid email'
  const nonce = Math.random().toString(36).substring(2)

  const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&nonce=${nonce}`
  window.location.href = url
}
</script>

<style scoped>
.line-login-btn {
  background-color: white;
  color: #00c300;
  border: 1px solid #dadce0;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3);
  transition: background 0.3s;
}

.line-login-btn:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.line-login-btn i {
  font-size: 20px;
}
</style>
