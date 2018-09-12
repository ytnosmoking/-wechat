<template >
  <!--  整租合租 houseJson  -->
  <div class='yuyue-part-content'>
    <div class='yuyue-house-content'>
      <div class='yuyue-house-img'>
        <image v-if='houseItem.houseJson.picObj.small'
          class='yuyue-house-img-bg' 
          :src='houseItem.houseJson.picObj.small'></image>
        <image else class='yuyue-house-img-bg' 
        src='/images/default/fang_default.png'></image>
      </div>
      <div class='yuyue-house-content-box'>
        <div class='yuyue-house-content-title'>
          <div class='yuyue-house-content-title-box'>
            <div class='yuyue-name'>{{houseItem.houseJson.quyuCName}}{{houseItem.houseJson.shi}}室{{houseItem.houseJson.ting}}厅</div>
            <!-- <label v-if='houseItem.houseType=="1"' class='house_type_zheng'>整</label> -->
            <label :class="houseItem.houseType=='1'?'house_type_zheng':'house_type_he'">
              {{houseItem.houseType=='1'?'整':'合'}}</label>
            <!-- <label v-if='houseItem.houseType=="2"' class='house_type_he'>合</label> -->
          </div>
          <div class='yuyue-zujins'>￥{{houseItem.houseJson.zujin}}元/月起</div>
        </div>
        <div class='yuyue-house-content-desc'>
          {{houseItem.houseJson.zhuangxiu.key}}
          <text class='type'>·</text>{{houseItem.houseJson.shi}}室{{houseItem.houseJson.ting}}厅
          <text class='type'>·</text>{{houseItem.houseJson.mianji}}m²
          <text class='type'>·</text>{{houseItem.houseJson.loucengA}}/{{houseItem.houseJson.loucengA}}层
        </div>
      </div>
    </div>
    <div class='yuyue-house-content-time yuyue-house-content-item'>
      <image src='/images/bespeak/bespeak_02.png'></image>
      <text class='yuyue-active'>预约时间：{{houseItem.seeTime}}</text>
    </div>
    <div class='yuyue-house-content-address yuyue-house-content-item'>
      <image src='/images/bespeak/bespeak_01.png'></image>
      <text>{{houseItem.houseJson.quyuAName}}{{houseItem.houseJson.quyuBName}}{{houseItem.houseJson.quyuCName}}</text>
    </div>
    <div class='menu-btn'>
      <div class='menu-btn-cancel menu-btn-item' :data-id='houseItem.id' @tap='cancelOrder(houseItem)'>取消</div>
      <div class='menu-btn-call menu-btn-item' 
        :data-phone='houseItem.houseJson.fangZhuPhone' 
        :data-id='houseItem.id' @tap='goCall(houseItem)'>去电</div>
    </div>
  </div>
</template>

<script>
import { showToast, getItem } from '@/utils'
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
  methods: {
    // 取消预约
    cancelOrder: function (fangyuanItem) {
      const params = {
        phone: getItem('phone'),
        id: fangyuanItem.id
      };
      this.$store.dispatch('cancelOrder', params).then(res => {
        if (res.status.code === '200') {
          showToast({ title: res.status.msg })
          this.$emit('getLoad')
        }
      })
    },
    // 去电
    goCall: function (fangyuanItem) {
      var phone = fangyuanItem.roomTypeJson.itemJson.mendianPhone || fangyuanItem.houseJson.fangZhuPhone
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone // 房主的电话号码
        })
      } else {
        showToast({ title: '没有留电话' })
      }
    }
  }
}
</script>

<style lang='less' scoped>
   @import './total.less';
</style>