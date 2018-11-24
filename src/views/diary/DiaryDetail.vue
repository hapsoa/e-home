<template lang="pug">
  .diary-detail
    .detail-view(v-html="diaryData.contents")
</template>

<script>
export default {
  name: 'DiaryDetail',
  // props: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      id: this.$route.query.id,
      diaryData: {},
    };
  },
  async created() {
    this.diaryData = await this.$firebase.database.getDiary(this.id);
    this.diaryData.contents = this.diaryData.contents.split(/\n|\r|↵/).join('<br>');
  },
};
</script>

<style scoped lang="sass">
.diary-detail
  width: 100%
  height: 100%
  > .detail-view
    min-height: 500px
    margin: 30px
    padding: 10px
    border: 1px solid #aaa
</style>
