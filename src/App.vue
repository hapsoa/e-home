<template lang="pug">
  #app
    header
    main
      aside(v-if="isLoggedIn")
        router-link(to="/memo") 메모
        router-link(to="/diary") 일기
        router-link(to="/gallery") 사진첩
        router-link(to="/cloud-drive") 클라우드 저장소
        .category 포트폴리오
        .category 달력
        .category 공부 노트
      .router-view
        router-view
    //loading-spinner

</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

import firebase from './firebase';
import loadingSpinner from './components/LoadingSpinner.vue';

Vue.prototype.$firebase = firebase;
// eslint-disable-next-line no-underscore-dangle
Vue.prototype.$_ = _;

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    // isLoggedIn(from, to) {
    //   if (!to) {
    //     this.router.push('/login');
    //   }
    // },
  },
  created() {
    this.$firebase.auth.setUserOnlineListener(() => {
      this.isLoggedIn = true;
      this.$router.push('/');
    });
    this.$firebase.auth.setUserOfflineListener(() => {
      this.$router.push('/login');
    });
  },
  components: {
    loadingSpinner,
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
    width: 100%
    height: $header-height
    border-bottom: 1px solid #aaa
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
    .router-view
      width: calc(100% - #{$aside-width})

@media screen and (max-width: 600px)
  aside
    display: none
  .router-view
    width: 100%

</style>
