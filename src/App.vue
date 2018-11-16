<template lang="pug">
  #app
    aside(v-if="isLoggedIn")
      router-link(to="/diary") 일기
      router-link(to="/gallery") 사진첩
      router-link(to="/cloud-drive") 클라우드 저장소
    router-view

</template>

<script>
import Vue from 'vue';
import firebase from './firebase';

Vue.prototype.$firebase = firebase;

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    isLoggedIn(from, to) {
      if (!to) {
        this.router.push('/login');
      }
    },
  },
};
</script>

<style lang="sass">
*
  box-sizing: border-box
body
  margin: 0
  padding: 0

#app
  aside
    display: flex
    flex-direction: column
</style>
