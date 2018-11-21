<template lang="pug">
  .home
    .message welcome
    <!--img(alt="Vue logo" src="../assets/logo.png")-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  beforeCreate() {
    // this.$store.commit('startLoading');
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$store.state.isLoading);
    }, 3000);
    console.log('2 mounted?');
  },
  // components: {
  //   HelloWorld,
  // },
};
</script>

<style scoped lang="sass">
  .home
    width: 100%
    height: 100%
    text-align: center
    padding-top: 250px

</style>
