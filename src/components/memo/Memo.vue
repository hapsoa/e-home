<template lang="pug">
  .memo
    .memo-header
      font-awesome-icon(icon="times" @click="deleteMemo()").icon
    .memo-contents {{contents}}
</template>

<script>
export default {
  name: 'Memo',
  props: {
    contents: {
      type: String,
      default: '',
    },
  },
  methods: {
    deleteMemo() {
      // this.$firebase.database.deleteMemo();
    },
  },
};
</script>

<style scoped lang="sass">
  .memo
    width: 200px
    height: 200px
    margin: 5px
    background-color: antiquewhite
    border: 1px solid #aaa
    > .memo-header
      display: flex
      justify-content: flex-end
      align-items: center
      width: 100%
      height: 30px
      border-bottom: 1px solid #aaa
      > .icon
        margin-right: 5px
        cursor: pointer
</style>
