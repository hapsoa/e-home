<template lang="pug">
.making-memo-root
  textarea(v-model="memoContents")
  .controller
    button(type="button" @click="$router.go(-1)") 취소
    // 데이터베이스에 메모 내용을 저장시키고, 해당 내용을 보여 준다.
    button(type="button" @click="sendMemo()") 저장
</template>

<script>
export default {
  name: 'MakingMemo',
  data() {
    return {
      memoContents: '',
    };
  },
  methods: {
    async sendMemo() {
      console.log('textArea : ', this.memoContents);
      this.$router.push({ name: 'memo' });
      this.$firebase.database.setMemo(this.memoContents);
    },
  },
};
</script>

<style scoped lang="sass">
  .making-memo-root
    width: 100%
    height: 100%
    padding: 30px
    > textarea
      width: 100%
      height: calc(100% - 80px)
      border: 1px solid #aaa
    > .controller
      width: 100%
      height: 80px
      background: #aaa
      text-align: center
      > button
        margin: 0 10px

</style>
