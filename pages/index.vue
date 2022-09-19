<template>
  <div>
    <h1>share</h1>
    <p>{{ message }}</p>
    <p>{{ email }}</p>
    <div @click="$router.push('/')">
      <p>ホーム</p>
    </div>
    <div @click="logout">
      <p>ログアウト</p>
    </div>
    <div>
      <p>シェア</p>
      <br>
      <textarea name="content" v-model="content" cols="20" rows="6" required></textarea>
      <br>
      <button @click="insertPost">シェアする</button>
    </div>
    <h2>投稿内容</h2>
    <div v-for="post in posts" :key="post.id">
      <p>{{ post.content }}</p>
      <p>{{ post }}</p>
      <button @click="deletePost(post.id)">削除</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
export default {
  data() {
    return {
      message: 'ログインしてないよ^^;',
      content: "",
      uid: "",
      posts: [],
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトが完了しました");
          this.$router.replace('/login');
        });
    },
    async getPostData() {
      const resData = await this.$axios.get(
        "http://localhost:8000/api/v1/post"
      );
      this.posts = resData.data.data;
    },
    fetchData() {
      firebase.auth().onAuthStateChanged((user) => {
        this.uid = user.uid;
        this.getPostData();
      });
    },
    insertPost() {
      if (!this.content) {
        alert("シェアする内容を入力してね");
        return;
      }
      firebase.auth().onAuthStateChanged(async (user) => {
        const{ data } = await this.$axios.post(
          "http://localhost:8000/api/v1/post",
          {
            user_id: user.uid,
            content: this.content,
          }
        );
        this.content = "";
        this.getPostData(data.post);
        alert("シェア成功！！");
      });
    },
    async deletePost(id) {
      await this.$axios.delete("http://localhost:8000/api/v1/post/" + id);
        this.getPostData();
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = 'ログインしてるよ☆';
        this.email = user.email;
      };
    });
    this.fetchData();
  },
};
</script>
