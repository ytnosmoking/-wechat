<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    // eslint-disable-next-line
    console.log("app created and cache logs by setStorageSync");
  },
  onLaunch() {
    if (!wx.getStorageSync('phone')) {
      console.log('lalsldladl');
      this.$router.push({
        path: 'pages/login/index',
        reLaunch: true
      });
    }
  }
};
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  /* padding: 200rpx 0; */
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.clearfix {
  &::before,
  &::after {
    content: " ";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }
}
</style>
