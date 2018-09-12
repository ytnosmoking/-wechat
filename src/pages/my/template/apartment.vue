<!-- 预约  品牌公寓 信息模板  -->
<template>
  <!--  品牌公寓 roomJson  -->
  <div class='yuyue-part-content'>
    <div class='yuyue-house-content'>
      <div class='yuyue-house-img'>
        <image v-if='fangyuanItem.roomTypeJson.picObj.small'
         class='yuyue-house-img-bg' :src='fangyuanItem.roomTypeJson.picObj.small'></image>
        <image else class='yuyue-house-img-bg' 
        src='/images/default/fang_default.png'></image>
      </div>
      <div class='yuyue-house-content-box'>
        <div class='yuyue-house-content-title'>
          <div class='yuyue-house-content-title-box'>
            <div class='yuyue-name'>{{fangyuanItem.roomTypeJson.itemJson.hiCity.name}}</div>
          </div>
          <div class='yuyue-zujins'>￥{{fangyuanItem.roomTypeJson.minZujin}}元/月起</div>
        </div>
        <div class='yuyue-house-content-desc' v-if="fangyuanItem.houseType=='3'">
          {{fangyuanItem.roomTypeJson.huXing.key}}
        </div>
        <div class='yuyue-house-content-desc'>
          {{fangyuanItem.roomTypeJson.zhuangXiu.key}}
          <text class='type'>·</text>{{fangyuanItem.roomTypeJson.shi}}室{{fangyuanItem.roomTypeJson.ting}}厅
          <text class='type'>·</text>{{fangyuanItem.roomTypeJson.mianji}}m²
        </div>
      </div>
    </div>
    <div class='yuyue-house-content-time yuyue-house-content-item'>
      <image src='/images/bespeak/bespeak_02.png'></image>
      <text class='yuyue-active'>预约时间：{{fangyuanItem.seeTime}}</text>
    </div>
    <div class='yuyue-house-content-address yuyue-house-content-item'>
      <image src='/images/bespeak/bespeak_01.png'></image>
      <text>{{fangyuanItem.roomTypeJson.itemJson.hiCity.name}}{{fangyuanItem.roomTypeJson.itemJson.hiDetailedAddress}}</text>
    </div>
    <div class='menu-btn'>
      <div class='menu-btn-cancel menu-btn-item' :data-id='fangyuanItem.id' @tap='cancelOrder(fangyuanItem)'>取消</div>
      <div class='menu-btn-call menu-btn-item' 
        :data-phone='fangyuanItem.roomTypeJson.itemJson.mendianPhone' 
        :data-id='fangyuanItem.id' @tap='goCall(fangyuanItem)'>去电</div>
    </div>
  </div>
</template>

<script>
import { showToast, getItem } from '@/utils'
export default {
  name: 'apartment',
  props: {
    fangyuanItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    // 取消预约
    cancelOrder: function (fangyuanItem) {
      const params = {
        phone: getItem('phone'),
        id: fangyuanItem.id
      };
      // network.PostRequest(url, params).then(res => {
      this.$store.dispatch('cancelOrder', params).then(res => {
        if (res.status.code === '200') {
        // console.log(res);
          showToast({ title: res.status.msg })
          this.$emit('getLoad')
          // that.getOrder();
        }
      })
    },
    // 去电
    goCall: function (fangyuanItem) {
      var phone = fangyuanItem.roomTypeJson.itemJson.mendianPhone
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone // 房主的电话号码
        })
      } else {
        showToast({ title: '没有留电话' })
      }
    }
  }
};
</script>

<style lang='less' scoped>
@import './total.less';
</style>