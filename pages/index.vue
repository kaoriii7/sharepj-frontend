<template>
  <div>
    <h1>ホーム</h1>
    <p>{{ message }}</p>
    <NuxtLink to="/">ホーム</NuxtLink>
    <br>
    <NuxtLink to="/logout">ログアウト</NuxtLink>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      message: 'ログインができてないよ^^;',
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログインしてるよ☆'
      }
    })
  },
}
</script>
