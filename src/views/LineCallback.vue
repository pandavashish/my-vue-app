<template>
  <div class="text-center mt-5">
    <h2>LINE Login Callback</h2>
    <div v-if="user">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>User ID:</strong> {{ user.userId }}</p>
      <img :src="user.picture" alt="Profile" width="100" />
    </div>
    <div v-else>
      <p>Logging in or failed to fetch user data...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const user = ref(null)

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  if (!code) {
    console.error('No authorization code found in URL.')
    return
  }

  try {
    const data = new URLSearchParams()
    data.append('grant_type', 'authorization_code')
    data.append('code', code)
    data.append('redirect_uri', 'https://ashishpandav.netlify.app/line-callback') // ✅ Must match exactly
    data.append('client_id', '2007459241') // ✅ Your LINE client ID
    data.append('client_secret', '461e56d95db1d599ff4b6e8d69c53d5c') // ✅ Your LINE client secret

    const tokenRes = await axios.post('https://api.line.me/oauth2/v2.1/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const accessToken = tokenRes.data.access_token

    const profileRes = await axios.get('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    user.value = {
      name: profileRes.data.displayName,
      userId: profileRes.data.userId,
      picture: profileRes.data.pictureUrl
    }

    console.log('LINE User Info:', user.value)
  } catch (error) {
    console.error('LINE login failed:', error.response?.data || error)
  }
})
</script>
