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
    id: {
      type: String,
      default: '',
    },
    contents: {
      type: String,
      default: '',
    },
  },
  methods: {
    async deleteMemo() {
      await this.$firebase.database.deleteMemo(this.id);
      this.$emit('deleteMemo', this.id);
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
