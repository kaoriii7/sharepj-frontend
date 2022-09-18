<template>
  <div>
    <h1>ホーム</h1>
    <p>{{ message }}</p>
    <NuxtLink to="/">ホーム</NuxtLink>
    <br>
    <NuxtLink to="/logout">ログアウト</NuxtLink>
    <br>
    <p>シェア</p>
    <br>
    <textarea name="content" v-model="content" cols="20" rows="6" required></textarea>
    <br>
    <button @click="insertPost">シェアする</button>
    <div v-for="post in posts" :key="post.id">
      <p>{{post.content}}</p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      message: 'ログインができてないよ^^;',
      content: "",
      posts: [],
    };
  },
  methods: {
    async getPostData() {
      const resData = await this.$axios.get(
        "http://localhost:8000/api/post"
      );
      this.posts = resData.data.data;
    },
    async insertPost() {
      if (!this.insertPost) {
        alert("シェアする内容を入力してね");
        return;
      }
      firebase.auth().onAuthStateChanged(async(user) => {
        const{data} = await this.$axios.post(
          "http://localhost:8000/api/post",
          {
            user_id: user.uid,
            content: this.content,
          }
        );
        this.content = "";
        this.getPostData();
        alert("シェア成功！！");
      });
    },
  },
  created() {
    this.getPostData();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログインしてるよ☆'
      }
    });
  },
}
</script>
