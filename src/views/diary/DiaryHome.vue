<template lang="pug">
  .diary-root
    nav
      input(type="text" placeholder="search")
      button(type="button" @click="$router.push({name: 'writing-diary'})") 일기 쓰기
    .diaries
      .diary(v-for="(diary, index) in diaries" :key="diary.id" @click="lookDiary(diary.id)") {{diary.title}}
</template>

<script>
export default {
  name: 'DiaryHome',
  data() {
    return {
      diaries: {},
    };
  },
  methods: {
    lookDiary(diaryId) {
      this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
    },
  },
  async created() {
    this.diaries = await this.$firebase.database.getDiary();
    
    const temp = [];
    
    this.$_.forEach(this.diaries, (value, key) => {
      value.id = key;
      temp.push(value);
    })
    
    this.diaries = this.$_.orderBy(temp, ['date'], ['desc']);
  },
};
</script>

<style scoped lang="sass">
  .diary-root
    width: 100%
    height: 100%
    > nav
      text-align: center
      border-bottom: 1px solid #aaa
      padding: 10px 0
      > button
        margin-left: 20px
    > .diaries
      > .diary
        padding: 10px
        border-bottom: 1px solid #ccc
        cursor: pointer
        &:hover
          background-color: #ccc
</style>
