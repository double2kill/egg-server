<template>
  <van-form name="login" @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
export default {
  name: "SignUp",
  props: {
    routeGoto: {
      default: () => {},
      type: Function,
    },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      this.$store
        ?.dispatch?.("user/signup", {
          $cookies: this.$cookies,
          username: values.username,
          password: values.password,
        })
        .then(() => {
          this.routeGoto("");
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.message,
            type: "error",
          });
        });
    },
  },
};
</script>
