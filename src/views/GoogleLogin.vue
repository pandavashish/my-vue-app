<template>
  <div>
    <h2>Login with Google</h2>
    <div id="google-signin-btn"></div>

    <div v-if="user" class="mt-4">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <img :src="user.picture" alt="Profile" width="100" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const CLIENT_ID = '474617880759-tnf2rg8r4ru089min1ocg31t0t4q64fb.apps.googleusercontent.com'
const user = ref(null)

const handleCredentialResponse = (response) => {
  const jwt = response.credential
  const payload = parseJwt(jwt)
  console.log(payload);
  // user.value = {
  //   name: payload.name,
  //   email: payload.email,
  //   picture: payload.picture
  // }
  // console.log("User Info", user.value)
}

const parseJwt = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  )
  return JSON.parse(jsonPayload)
}

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
    auto_select: false, // important to avoid auto redirect
    ux_mode: "popup", // ← this makes sure login is in same page
  })

  window.google.accounts.id.renderButton(
    document.getElementById('google-signin-btn'),
    {
      theme: 'outline',
      size: 'large',
    }
  )
})
</script>
