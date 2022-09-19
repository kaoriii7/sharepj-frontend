<template>
  <div>
    <Header />
    <h2>新規登録</h2>
    <input type="text" v-model="name" placeholder="ユーザーネーム" required>
    <br>
    <input type="email" v-model="email" placeholder="メールアドレス" required>
    <br>
    <input type="password" v-model="password" placeholder="パスワード" required>
    <br>
    <button @click="register">新規登録</button>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    async register() {
      if (!this.name || !this.email || !this.password) {
        alert('すべての項目を入力してください！')
        return
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          const sendData = {
            id: data.user.uid,
            name: this.name,
            email: this.email,
            password: this.password,
          };
          this.$axios.post("http://127.0.0.1:8000/api/v1/user", sendData);
          this.$router.push('/login');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              alert('メールアドレスの形式が違います。');
              break;
            case 'auth/email-already-in-use':
              alert('このメールアドレスはすでに使われています。');
              break;
            case 'auth/weak-password':
              alert('パスワードは6文字以上で入力してください。');
              break;
            default:
              alert('エラーが起きました。しばらくしてから再度お試しください。');
              break;
          }
        });
    },
  },
}
</script>

<style>

</style>
