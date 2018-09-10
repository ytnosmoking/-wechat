<template>
  <div>
    <div class="wrapper">
      <!--我的头像部分的背景-->
      <div style='height:224rpx;'>
        <image class="mine-background" src='../image/mine/mine_01.png'></image>
          <!--我的头像-->
          <div class="mine-portrait" @tap='logOut'>
            <image src='../image/mine/mine_23.png'></image>
          </div>
          <!--我的昵称-->
          <div class="loginPhone">{{chooseRoomInfo.zukeName}} {{userPhone}}</div>
      </div>
      <!--我的头像下面的 收藏、足迹、预约、预定-->
      <div class='mine-items'>
        <div class='item' catchtap='divShoucang'>
          <div class='collectNum'>{{numsTotal.collectNum}}</div>
          <div>收藏</div>
        </div>
        <div class='item' catchtap='divZuji'>
          <div class='collectNum'>{{numsTotal.footNum}}</div>
          <div>足迹</div>
        </div>
        <div class='item' catchtap='divYuyue'>
          <div class='collectNum'>{{numsTotal.orderNum}}</div>
          <div>预约</div>
        </div>
        <div class='item' catchtap='divYuding'>
          <div class='collectNum'>{{numsTotal.bookNum}}</div>
          <div>预定</div>
        </div>
      </div>
      <!--我的家部分-->
      <!-- <div class='mine-myHome common-paddingTop'>
      
        <div class='mine-myHome-info'>
          <text style='font-size:34rpx;'>我的家</text>
          <image src='../image/mine/mine_15.png'>
            <text class='room' catchtap='showroomInfo'>房间信息</text>
        </div>
        
        <div class='mine-myHome-list'>
          <div class='mine-myHome-item' wx:for="{{myHomeList}}" data-id='{{index}}' bindtap='divEvent'>
            <image src='{{item.img}}'>
              <text>{{item.text}}</text>
          </div>
          <div class='clear'></div>
        </div>
      </div> -->
      <!--智能设备部分  -->
      <!-- <div class='mine-myHome common-paddingTop'>
    
        <div class='mine-myHome-info'>
          <text style='font-size:34rpx;'>智能设备</text>
        </div>
      
        <div class='mine-myHome-list'>
          <div class='mine-myHome-item' wx:for="{{zhinengList}}" data-id='{{index}}' bindtap='divZhinengEvent'>
            <image src='{{item.img}}'>
              <text>{{item.text}}</text>
          </div>
          <div class='clear'></div>
        </div>
      </div> -->
    </div>
    <!--遮罩  -->
    <!-- <div class='model' wx:if="{{showModel}}"></div> -->
    <!--房间信息  -->
    <!-- <div class='mine-roomInfo' wx:if="{{showModel}}">
      <div class='mine-roomInfo-describe'>
        <image src='../image/mine/mine_28.png' catchtap='hideroomInfo'>
          <text>您可以进行房间切换,切换后可对该房间进行操作</text>
      </div>
      <div class='mine-roomInfo_over'>
        <div class='{{chooseRoom && ischeck == index?"mine-roomInfo-detail-selected":"mine-roomInfo-detail"}}' catchtap='chooseRoom' wx:for="{{roomList}}" data-id='{{index}}'>
          <div class='mine-roomInfo-detail-select'>
            <image wx:if='{{chooseRoom && ischeck == index}}' src='../image/mine/mine_24.png'>
              <image wx:else src='../image/mine/mine_25.png'>
          </div>
          <div class='mine-roomInfo-detail-describe'>
            <div>
              <image wx:if='{{chooseRoom && ischeck == index}}' src='../image/mine/mine_20.png'>
                <image wx:else src='../image/mine/mine_16.png'>
                  <text>{{item.house.quyuAName}}{{item.house.quyuCName}}</text>
            </div>
            <div>
              <image wx:if='{{chooseRoom && ischeck == index}}' src='../image/mine/mine_21.png'>
                <image wx:else src='../image/mine/mine_17.png'>
                  <text>{{item.house.buildingNo}}栋{{item.house.men}}单元{{item.house.fangNo}}-{{item.house.fangjianName}}</text>
            </div>
            <div>
              <image wx:if='{{chooseRoom && ischeck == index}}' src='../image/mine/mine_22.png'>
                <image wx:else src='../image/mine/mine_18.png'>
                  <text>{{item.startTime}}/{{item.endTime}}</text>
            </div>
          </div>
        </div>
      </div>
      <button class='mine-roomInfo-btn' catchtap='changeRoom'>确定切换</button>
    </div> -->
    <!--遮罩  -->
    <!-- <div class='guanjia-model' catchtap='hideguanjiaInfo' wx:if="{{guanjiaModel}}"></div> -->
    <!--我的管家信息  -->
    <!-- <div class='guanjia-info' wx:if="{{guanjiaModel}}">
      <div class='close-box'>
        <image class='close' catchtap='hideguanjiaInfo' src='../image/mine/mine_28.png'>
      </div>
      <div class='guanjia-name guanjia-item'>
        <image src='../image/mine/mine_27.png'>
          <text>{{houseKeeper.nickName}}</text>
      </div>
      <div class='guanjia-phone guanjia-item'>
        <image class='guanjia-phone-image' src='../image/mine/mine_26.png'>
          <text data-phone='{{houseKeeper.phone}}' catchtap='callGuanjia'>{{houseKeeper.phone}}</text>
      </div>
      <div class='guanjia-time guanjia-item'>
        <image src='../image/mine/mine_18.png'>
          <text>8：00 - 17：00</text>
      </div>
    </div> -->
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { delItems, getItem, showToast } from '@/utils'
export default {
  name: 'my',
  data() {
    return {
      userHouseInfo: [],
      roomList: [],
      chooseRoomInfo: [],
      numsTotal: {
        collectNum: 0,
        footNum: 0,
        orderNum: 0,
        bookNum: 0
      }
    };
  },
  computed: {
    ...mapGetters([
      'userPhone'
    ])
  },
  methods: {
    logOut() {
      delItems('phone')
      this.$router.push({
        path: '/pages/login/index',
        reLaunch: true
      })
    },

    // 收藏 足迹 订单 预定
    // getCollectNum() {
    //   return this.$store.dispatch('getCollectNum')
    // },
    // getFootNum() {
    //   return this.$store.dispatch('getFootNum')
    // },
    getNum(url) {
      return this.$store.dispatch('getNum', url).then(res => {
        if (res.status.code === '200') {
          if (url === 'orderNum') {
            this.numsTotal[url] = res.result.renterInfoArr.length
          } else if (url === 'bookNum') {
            this.numsTotal[url] = res.result.list.length
          } else {
            this.numsTotal[url] = res.result.houseArr.length
          }
        } else {
          showToast({ title: res.status.msg })
        }
      }).catch(err => {
        showToast({ title: err.msg })
      })
    }
  },
  onReady() {
    this.userHouseInfo = getItem('userHouseInfo')
    this.roomList = getItem('userHouseInfo')
    this.chooseRoomInfo = this.userHouseInfo[0]
    console.log(this.userPhone)
    //  this.getNum(this.collectNum)
    const that = this
    Object.keys(this.numsTotal).forEach(item => {
      that.getNum(item)
    })
  }
};
</script>

<style lang='less' scoped>
@import './index.less';
</style>