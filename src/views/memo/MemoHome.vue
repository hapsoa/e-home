<template lang="pug">
.memo-root
  nav
    input(type="text" placeholder="search")
    button(type="button" @click="$router.push('/memo/making')") 메모 만들기

</template>

<script>
export default {
  name: 'Memo',
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
