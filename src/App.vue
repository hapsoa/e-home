<template lang="pug">
  #app
    #nav
      router-link(to="/") Home |
      router-link(to="/about") About
      router-link(to="/login") Login
    aside(v-if="isLoggedIn")
      .category 일기
      .category 사진첩
      .category 클라우드
    router-view

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
};
</script>

<style lang="sass">
body
  margin: 0
  padding: 0
</style>
