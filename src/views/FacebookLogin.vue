<template>
  <div>
    <h2>Login with Facebook</h2>

    <button class="facebook-login-btn" @click="redirectToFacebook">
      <i class="fab fa-facebook me-2"></i> Login with Facebook
    </button>
  </div>
</template>

<script setup>
const redirectToFacebook = () => {
  const appId = '1341568866636370' // ✅ Your Facebook App ID
  const redirectUri = encodeURIComponent('http://localhost:5173/facebook-callback') // ✅ Must match your app settings
  const state = 'your_custom_state'
  const scope = 'email,public_profile'

  const fbLoginUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`
  window.location.href = fbLoginUrl
}
</script>

<style scoped>
.facebook-login-btn {
  background-color: white;
  color: #1877f2;
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

.facebook-login-btn:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.facebook-login-btn i {
  font-size: 20px;
}
</style>
