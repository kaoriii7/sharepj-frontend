<template>
  <div>
    <button @click="logout">ログアウト</button>
    <br>
    <NuxtLink to="/">return</NuxtLink>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました。')
          this.$router.replace('/login')
        })
    },
  },
}
</script>

<style>

</style>
