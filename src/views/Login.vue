<template lang="pug">
  .login-root
    .introduction 안녕하세요 나만의 공간
      br
      | e-home 입니다
    <!--form-->
      <!--input(type="text" placeholder="id")-->
      <!--input(type="password" placeholder="password")-->
      <!--input(type="submit" value="로그인")-->
    button(type="button" @click="login") 구글로 로그인
</template>

<script>
export default {
  name: 'Login',
  methods: {
    async login() {
      await this.$firebase.auth.login();
      this.$store.commit('login');
    },
  },
};
</script>

<style scoped lang="sass">
.login-root
  width: 100vw
  display: flex
  flex-direction: column
  align-items: center
  height: 100vh
  padding: 250px
  >form
    margin-top: 20px
    >input
      margin-right: 10px
  >button
    margin-top: 40px
</style>
