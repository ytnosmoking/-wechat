<template>
  <!--  整租合租 houseJson  -->
  <div class='yuyue-part-content'>
    <div class='top_tip'>如果未支付，将在{{houseItem.cancleDate}} 自动取消</div>
    <div class='yuyue-house-content'>
      <div class='yuyue-house-img'>
        <image v-if='houseItem.houseJson.picObj&&houseItem.houseJson.picObj.small' 
          class='yuyue-house-img-bg' 
          :src='houseItem.houseJson.picObj.small'></image>
        <image wx:else class='yuyue-house-img-bg' src='/images/default/fang_default.png'></image>
      </div>
      <div class='yuyue-house-content-box'>
        <div class='yuyue-house-content-title'>
          <div class='yuyue-house-content-title-box'>
            <div class='yuyue-name'>{{houseItem.houseJson.cityAddress}}{{houseItem.houseJson.shi}}室{{houseItem.houseJson.ting}}厅</div>
            <!-- <label if='{{houseItem.houseType=="1"}}' class='house_type_zheng'>整</label>
            <label wx:if='{{houseItem.houseType=="2"}}' class='house_type_he'>合</label> -->
             <label :class="houseItem.houseType=='1'?'house_type_zheng':'house_type_he'">
              {{houseItem.houseType=='1'?'整':'合'}}</label>
          </div>
          <div class='yuyue-zujins'>￥{{houseItem.houseJson.zujin}}元/月起</div>
        </div>
        <div class='yuyue-house-content-desc'>
          {{houseItem.houseJson.zhuangxiutype.key}}
          <text class='type'>·</text>{{houseItem.houseJson.shi}}室
          {{houseItem.houseJson.ting}}厅
          <text class='type'>·</text>{{houseItem.houseJson.mianji}}m²
        </div>
      </div>
    </div>
    <div class='yuyue-house-content-time yuyue-house-content-item'>
      <image src='/images/bespeak/bespeak_02.png'></image>
      <text>预定时间：{{houseItem.et}}</text>
    </div>
    <div class='yuyue-house-content-address yuyue-house-content-item'>
      <image src='/images/bespeak/bespeak_01.png'></image>
      <text>{{houseItem.house.quyuAName}}{{houseItem.house.quyuBName}}{{houseItem.house.quyuCName}}</text>
    </div>
    <div class='menu-btn'>
      <div class='menu-btn-cancel menu-btn-item' 
        @tap='cancelBook(houseItem)'>取消</div>
      <div class='menu-btn-pay menu-btn-item' 
         @tap='pay(houseItem)'>支付</div>
      <div class='menu-btn-call menu-btn-item' 
        @tap='goCall(houseItem)'>去电</div>
    </div>
  </div>
</template>

<script>
import { showToast } from '@/utils'
export default {
  name: 'alltogether',
  props: {
    houseItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.houseItem)
  },
  methods: {
    // 取消预约
    cancelBook: function (fangyuanItem) {
      console.log(fangyuanItem)
      const params = {
        id: fangyuanItem.id,
        identType: fangyuanItem.identType,
        money: 0
      };
      this.$store.dispatch('cancelBook', params).then(res => {
        if (res.status.code === '200') {
          showToast({ title: res.status.msg })
          this.$emit('getLoad')
        } else {
          showToast({ title: res.status.msg })
        }
      })
    },
    // 去电
    goCall: function (fangyuanItem) {
      var phone = (fangyuanItem.roomTypeJson && fangyuanItem.roomTypeJson.itemJson.mendianPhone) || fangyuanItem.houseJson.fangZhuPhone
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone // 房主的电话号码
        })
      } else {
        showToast({ title: '没有留电话' })
      }
    },
    pay(item) {
      console.log(item)
    }
  }
}
</script>

<style lang='less' scoped>
   @import './total.less';
   .top_tip{
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    background: red;
    color: #fff;
    font-size: 24rpx;
}
</style>