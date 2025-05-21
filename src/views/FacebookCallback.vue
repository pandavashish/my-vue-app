<template>
  <div>
    <h2>Facebook Callback</h2>
    <div v-if="user">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <img :src="user.picture" width="100" />
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
    console.error('No code found in URL')
    return
  }

  try {
    // Step 1: Exchange code for access token
    const tokenRes = await axios.get('https://graph.facebook.com/v17.0/oauth/access_token', {
      params: {
        client_id: '1341568866636370',
        redirect_uri: 'http://localhost:5173/facebook-callback',
        client_secret: '66fa5f2f3eb49984de71b500b3f47523', // ⚠️ Replace with your secret
        code
      }
    })

    const accessToken = tokenRes.data.access_token
    console.log('Access Token Response:', tokenRes.data)


    // Step 2: Fetch user info
    const profileRes = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email,picture',
        access_token: accessToken
      }
    })

    console.log('User Profile Response:', profileRes.data)


    user.value = {
      name: profileRes.data.name,
      email: profileRes.data.email,
      picture: profileRes.data.picture.data.url
    }
    console.log('User Object:', user.value)

  } catch (err) {
    console.error('Facebook callback error:', err)
  }
})
</script>
