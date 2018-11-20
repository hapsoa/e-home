<template lang="pug">
  .loading-cat-root
    img(src="../assets/walking-cat.gif" alt="고양이 걸어가는 gif")
</template>

<script>
export default {
  name: 'LoadingCat',
};
</script>

<style scoped lang="sass">
.loading-cat-root
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100vh
</style>
