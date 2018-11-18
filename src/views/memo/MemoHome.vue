<template lang="pug">
.memo-root
  nav
    input(type="text" placeholder="search")
    button(type="button" @click="$router.push('/memo/making')") 메모 만들기
  .memos

</template>

<script>
export default {
  name: 'Memo',
  data() {
    return {
    };
  },
  created() {
    console.log('yap');
    const temp = this.$firebase.database.getMemo();
    console.log(temp);
  },
};
</script>

<style scoped lang="sass">
.memo-root
  width: 100%
  height: 100%
  >nav
    text-align: center
    border-bottom: 1px solid #aaa
    padding: 10px 0
    > button
      margin-left: 20px
</style>
