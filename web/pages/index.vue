<template>
  <section class="container">
    <div>
      <h1 v-if="!username" class="title">greatwebtech</h1>
      <h2 v-if="username" class="title">你好, {{ username }}!</h2>
      <h2 class="subtitle">好好学习，天天向上</h2>
      <Links :links="links" />
    </div>
  </section>
</template>

<script>
import Links from "~/components/links/index.vue";
import { indexLinks } from "@/constants";

export default {
  components: {
    Links,
  },
  head() {
    return {
      title: "greatwebtech首页",
    };
  },
  data() {
    return {
      userName: "",
      links: indexLinks,
    };
  },
  computed: {
    username() {
      return this.$store?.state?.user?.githubUsername || "";
    },
  },
  mounted() {
    // const { query } = this.$route.history.current;
    // if (query.user) {
    //   this.setGithubUser(query.user);
    //   this.$router.push({
    //     path: "/",
    //     query: {
    //       ...query,
    //       user: undefined,
    //     },
    //   });
    // }
  },
  methods: {
    setGithubUser(username) {
      this.$store?.dispatch?.("user/setGithubUsername", {
        username,
        $cookies: this.$cookies,
      });
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

@media screen and (max-width: 992px) {
  .title {
    font-size: 50px;
  }
  .subtitle {
    font-size: 30px;
  }
}

.links {
  padding-top: 15px;
}
</style>
