<template lang="pug">
  .diary-root
    nav
      input(type="text" placeholder="search")
      button(type="button" @click="$router.push({name: 'writing-diary'})") 일기 쓰기
</template>

<script>
export default {
  name: 'DiaryHome',
};
</script>

<style scoped lang="sass">
  .diary-root
    width: 100%
    height: 100%
    >nav
      text-align: center
      border-bottom: 1px solid #aaa
      padding: 10px 0
      > button
        margin-left: 20px
</style>
