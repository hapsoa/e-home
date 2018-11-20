<template lang="pug">
  #app
    header(v-if="$store.state.isLogin")
      router-link(to="/") e-home
      .empty
      button(type="button" @click="logout()") Logout
    main
      aside(v-if="$store.state.isLogin")
        router-link(to="/memo") 메모
        router-link(to="/diary") 일기
        .category To-Do
        router-link(to="/gallery") 사진첩
        router-link(to="/cloud-drive") 클라우드 저장소
        .category 캘린더
        .category 메일
        .category 포트폴리오
        .category 공부 노트
        .category people
      .router-view
        router-view
    //loading-spinner
    loading-cat

</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

import firebase from './firebase';
import loadingSpinner from './components/LoadingSpinner.vue';
import loadingCat from './components/LoadingCat.vue';

Vue.prototype.$firebase = firebase;
// eslint-disable-next-line no-underscore-dangle
Vue.prototype.$_ = _;

export default {
  name: 'App',
  components: {
    loadingSpinner, loadingCat,
  },
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$firebase.auth.logout();
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },
  watch: {
    // isLoggedIn(from, to) {
    //   if (!to) {
    //     this.router.push('/login');
    //   }
    // },
  },
  beforeCreate() {
    this.$firebase.auth.setUserOnlineListener(() => {
      this.$store.commit('login');
      this.$store.commit('shotMethods');
      // login page일 때
      if (this.$route.name === 'login') {
        this.$router.push('/');
      }
    });
    this.$firebase.auth.setUserOfflineListener(() => {
      this.$store.commit('logout');
      this.$router.push('/login');
    });
  },
};
</script>

<style lang="sass">
$header-height: 50px
$aside-width: 200px

*
  box-sizing: border-box
body
  margin: 0
  padding: 0

#app
  width: 100%
  header
    display: flex
    align-items: center
    width: 100%
    height: $header-height
    border-bottom: 1px solid #aaa
    .empty
      flex: 1
  main
    display: flex
    width: 100%
    height: calc(100vh - #{$header-height})
@media screen and (min-width: 600px)
  main
    aside
      display: flex
      flex-direction: column
      width: $aside-width
      border-right: 1px solid #aaa
      text-align: center
    .router-view
      width: calc(100% - #{$aside-width})

@media screen and (max-width: 600px)
  aside
    display: none
  .router-view
    width: 100%

</style>
