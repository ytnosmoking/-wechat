<template>
  <div>
    this is contractDetail----  queryID:{{id}}
  </div>
</template>

<script>
export default {
  name: 'contract detail',
  data() {
    return {
      id: ''
    };
  },
  onShow() {
    console.log(this.$router)
    this.id = this.$router.currentRoute.query.id
  }
};
</script>

<style lang='less' scoped>
</style>