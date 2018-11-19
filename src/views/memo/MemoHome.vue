<template lang="pug">
.memo-root
  nav
    input(type="text" placeholder="search")
    button(type="button" @click="$router.push('/memo/making')") 메모 만들기
  .memos
    memo(v-for="memo in memos" :contents="memo")

</template>

<script>
/* eslint-disable no-underscore-dangle */
import memo from '@/components/memo/Memo.vue';

export default {
  name: 'Memo',
  components: { memo },
  data() {
    return {
      memos: [],
    };
  },
  methods: {
  },
  async created() {
    const getMemos = async () => {
      const tempMemos = await this.$firebase.database.getMemo();
      this.memos = this.$_.map(tempMemos, document => document.memo);
    };

    if (this.$_.isNil(this.$firebase.auth.getCurrentUser())) {
      this.$store.commit('saveMethod', getMemos);
    } else {
      await getMemos();
    }
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
  .memos
    display: flex
    width: 100%
    height: 100%
</style>
