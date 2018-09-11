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
        <div class='item' @tap='goPage(numsUrl.collectUrl)'>
          <div class='collectNum'>{{numsTotal.collectNum}}</div>
          <div>收藏</div>
        </div>
        <div class='item' @tap='goPage(numsUrl.footUrl)'>
          <div class='collectNum'>{{numsTotal.footNum}}</div>
          <div>足迹</div>
        </div>
        <div class='item' @tap='goPage(numsUrl.orderUrl)'>
          <div class='collectNum'>{{numsTotal.orderNum}}</div>
          <div>预约</div>
        </div>
        <div class='item' @tap='goPage(numsUrl.bookUrl)'>
          <div class='collectNum'>{{numsTotal.bookNum}}</div>
          <div>预定</div>
        </div>
      </div>
      <!--我的家部分-->
      <div class='mine-myHome common-paddingTop clearfix'>

        <div class='mine-myHome-info'>
          <text style='font-size:34rpx;'>我的家</text>
          <image src='../image/mine/mine_15.png'></image>
          <text class='room' @tap='showRoomInfo'>房间信息</text>
        </div>

        <div class='mine-myHome-list'>
          <div class='mine-myHome-item' v-for="(item,index) in myHomeList" :data-id='index' :key="index" @tap='goPage(item.url)'>
            <image :src='item.img'></image>
            <text>{{item.text}}</text>
          </div>
          <div class='clear'></div>
        </div>
      </div>
      <!--智能设备部分  -->
      <div class='mine-myHome common-paddingTop clearfix'>
        <div class='mine-myHome-info'>
          <text style='font-size:34rpx;'>智能设备</text>
        </div>
        <div class='mine-myHome-list'>
          <div class='mine-myHome-item' v-for="(item, index) in zhinengList" :key="index" :data-id='index' @tap='goPage(item.url)'>
            <image :src='item.img'></image>
            <text>{{item.text}}</text>
          </div>
          <div class='clear'></div>
        </div>
      </div>
    </div>
    <!--遮罩  -->
    <div class='model animated' :class="showModel?'zoomIn':'zoomOut'" v-show="showModel" @tap="hideModel"></div>

    <!--房间信息  -->
    <div class='mine-roomInfo animated' v-show="showModel" :class="showModel?'zoomIn':'zoomOut'">
      <div class='mine-roomInfo-describe'>
        <image src='../image/mine/mine_28.png' @tap='hideModel'></image>
        <text>您可以进行房间切换,切换后可对该房间进行操作</text>
      </div>
      <div class='mine-roomInfo_over'>
        <div 
          :class='chooseRoom && ischeck == index?"mine-roomInfo-detail-selected":"mine-roomInfo-detail"'
           @tap='selectRoom(index)' v-for="(item, index) in roomList" 
           :key="index" :data-id='index'>
          <div class='mine-roomInfo-detail-select'>
            <image v-if='chooseRoom && ischeck == index' src='../image/mine/mine_24.png'></image>
              <image v-else src='../image/mine/mine_25.png'></image>
          </div>
          <div class='mine-roomInfo-detail-describe'>
            <div>
              <image v-if='chooseRoom && ischeck == index' src='../image/mine/mine_20.png'></image>
                <image v-else src='../image/mine/mine_16.png'></image>
                <text>{{item.house.quyuAName}}{{item.house.quyuCName}}</text>
            </div>
            <div>
              <image v-if='chooseRoom && ischeck == index' src='../image/mine/mine_21.png'></image>
                <image v-else src='../image/mine/mine_17.png'></image>
                <text>{{item.house.buildingNo}}栋{{item.house.men}}单元{{item.house.fangNo}}-{{item.house.fangjianName}}</text>
            </div>
            <div>
              <image v-if='chooseRoom && ischeck == index' src='../image/mine/mine_22.png'></image>
                <image v-else src='../image/mine/mine_18.png'></image>
                <text>{{item.startTime}}/{{item.endTime}}</text>
            </div>
          </div>
        </div>
      </div>
      <button class='mine-roomInfo-btn' @tap='changeRoom'>确定切换</button>
    </div>
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
import { mapGetters } from 'vuex';
import { delItems, getItem, setItem, showToast } from '@/utils';
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
      },
      numsUrl: {
        collectUrl: '/pages/my/collect/index',
        footUrl: '/pages/my/foot/index',
        orderUrl: '/pages/my/order/index',
        bookUrl: '/pages/my/book/index'
      },
      // 我的家下面各个项目
      myHomeList: [
        {
          img: '../image/mine/mine_02.png',
          text: '我的合同',
          url: '/pages/my/contract/index'
        },
        {
          img: '../image/mine/mine_03.png',
          text: '待缴账单',
          url: '/pages/my/bill/index'
        },
        {
          img: '../image/mine/mine_04.png',
          text: '我的管家',
          url: 'houseKeeper'
        },
        {
          img: '../image/mine/mine_05.png',
          text: '维修服务',
          url: '/pages/my/fix/index'
        },
        {
          img: '../image/mine/mine_06.png',
          text: '保洁服务',
          url: '/pages/my/clean/index'
        },
        {
          img: '../image/mine/mine_07.png',
          text: '建议投诉',
          url: '/pages/my/complain/index'
        }
      ],
      // 智能设备下面各个项目
      zhinengList: [
        {
          img: '../image/mine/mine_08.png',
          text: '智能门锁',
          url: '/pages/my/lock/index'
        },
        {
          img: '../image/mine/mine_09.png',
          text: '智能电表',
          url: '/pages/my/electric/index'
        },
        {
          img: '../image/mine/mine_10.png',
          text: '智能水表',
          url: '/pages/my/water/index'
        }
      ],
      showModel: false,
      chooseRoom: true,
      ischeck: 0
    };
  },
  computed: {
    ...mapGetters(['userPhone'])
  },
  methods: {
    logOut() {
      delItems('phone');
      this.$router.push({
        path: '/pages/login/index',
        reLaunch: true
      });
    },

    // 收藏 足迹 订单 预定
    // getCollectNum() {
    //   return this.$store.dispatch('getCollectNum')
    // },
    // getFootNum() {
    //   return this.$store.dispatch('getFootNum')
    // },
    getNum(url) {
      return this.$store
        .dispatch('getNum', url)
        .then(res => {
          if (res.status.code === '200') {
            if (url === 'orderNum') {
              const renterInfoArr = res.result.renterInfoArr;
              this.numsTotal[url] = renterInfoArr.length;
            } else if (url === 'bookNum') {
              const list = res.result.list;
              this.numsTotal[url] = list.length;
            } else {
              this.numsTotal[url] = res.result.houseArr.length;
            }
          } else {
            showToast({ title: res.status.msg });
          }
        })
        .catch(err => {
          showToast({ title: err.msg });
        });
    },
    goPage(url) {
      if (url === 'houseKeeper') {
        if (this.roomList.length > 0) {
          this.checkHouseKeeper();
        } else {
          showToast({ title: '还没有您的房间信息' });
        }
      } else {
        this.$router.push({
          path: url
        });
      }
    },
    checkHouseKeeper() {
      console.log(1);
    },
    showRoomInfo() {
      this.showModel = true;
    },
    hideModel() {
      this.showModel = false;
    },
    selectRoom(index) {
      this.chooseRoom = true
      this.ischeck = index
    },
    changeRoom() {
      this.showModel = false
      this.chooseRoomInfo = this.userHouseInfo[this.ischeck]
      setItem('chooseRoomInfo', this.chooseRoomInfo)
    }
  },
  onShow() {
    this.userHouseInfo = getItem('userHouseInfo');
    this.roomList = getItem('userHouseInfo');
    this.chooseRoomInfo = this.userHouseInfo[0];
    console.log(this.userPhone);
    const that = this;
    Object.keys(this.numsTotal).forEach(item => {
      that.getNum(item);
    });
  }
};
</script>

<style lang='less' scoped>
@import "./index.less";
</style>