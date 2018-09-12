<template>
  <div class='container'>
    <div class='shoucang_list' v-if='fangyuanList.length>0'>
      <collect :fangyuanList="fangyuanList" @getLoad="getCollect" collectType="true"></collect>
    </div>
    <div class='no_content' v-else>
      没有任何内容！
    </div>
  </div>
</template>

<script>
// import Bus from '@/pages/bus'
import collect from '../template/collect';
export default {
  name: 'collect',
  components: {
    collect
  },
  data() {
    return {
      fangyuanList: []
    };
  },
  methods: {
    getCollect() {
      console.log(111)
      this.$store.dispatch('getCollect').then(res => {
        if (res.status.code === '200') {
          this.fangyuanList = res.result.houseArr
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  onShow() {
    this.getCollect()
    // const that = this
    // Bus.$on('getLoad', () => {
    //   that.getCollect()
    // })
  },
  mounted () {

  }
};
</script>

<style lang='less' scoped>
@import "../template/total.less";
.container {
  width: 100%;
  height: 100vh;
  background: #f1f1f1;
}

.shoucang_list {
  width: 100%;
  height: auto;
}

.no_content {
  width: 100%;
  text-align: center;
  padding-top: 300rpx;
  font-size: 28rpx;
}
</style>