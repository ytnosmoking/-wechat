<template>
  <div class='container'>
    <!--轮播  -->
    <div class='banner_box'>
      <!-- 收藏  -->
      <div class='collect'>
        <image v-if='isHouseCollection==2' @tap='tabcollect' src='/images/collect/collect_01.png'></image>
        <image v-if='isHouseCollection==1' @tap='cancelCollect' src='/images/collect/collect_02.png'></image>
      </div>
      <swiper duration="800" circular="true" @change='changeimg'>
        <block v-for="(item, index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" @tap='imgpreview' />
          </swiper-item>
        </block>
      </swiper>
      <div class='banner-count'>{{current}}/{{imgUrls.length}}</div>
    </div>
    <div class='content'>
      <!--房屋信息  -->
      <!--户型介绍  -->
      <div class='huxing_box'>
        <text>{{hiDetailedAddress}}</text>
        <text class='shared'>{{Shared}}</text>
        <text class='price'>￥{{Price}}元/月</text>
      </div>
      <!--户型配置  -->
      <div class='peizhi_box'>
        <div>房间信息</div>
        <div>
          <div class='xinxi-list'>户型：{{houseXinxi.huxing}}</div>
          <div class='xinxi-list'>面积：{{houseXinxi.mianji}}</div>
          <div class='xinxi-list'>朝向：{{houseXinxi.chaoxiang}}</div>
          <div class='xinxi-list'>装修：{{houseXinxi.zhuangxiu}}</div>
          <div class='xinxi-list'>楼层：{{houseXinxi.louceng}}</div>
        </div>
      </div>
      <!--联系我们  -->
      <div class='lianxi_box'>
        <div class='fq_margin20_hor'>联系我们</div>
        <div class='map_contain'>
          <map class="map" scale="16" :markers="markers" :longitude="longitude" :latitude="latitude" bindmarkertap="makertap">
          </map>
        </div>
        <div>
          <div class="contract-item">
            <image src='../images/xx_phone.png' class='img_size'></image>
            <text class="img_info">联系电话：{{mendianPhone}}</text>
          </div>
          <div class="contract-item">
            <image src='../images/xx_dizhi.png' class='img_size'></image>
            <text class="img_info">地址：{{DetaileAddress}}</text>
          </div>
        </div>
      </div>
    </div>
    <!--底部按钮  -->
    <div class='menu_btn'>
      <div class='zixun_btn' @tap='zixunPhone'>电话咨询</div>
      <div class='yuyue_btn_box'>
        <div class='kanfang_btn' @tap='orderHouse'>预约看房</div>
        <div class='yuding_btn' @tap='onLineBook'>在线预订</div>
      </div>
    </div>
  </div>

</template>

<script>
import { showToast, getItem } from '@/utils';
export default {
  name: '',
  data() {
    return {
      //   ID
      Id: '',
      // houseId
      houseId: '',
      //   parentId
      parentId: '',
      //   banner
      imgUrls: [],
      //  当前图片
      current: 1,
      hiDetailedAddress: '',
      //   整合
      Shared: '',
      //   租金
      Price: '',
      //   房间信息
      houseXinxi: [],
      //   房主电话号码
      mendianPhone: '',
      //   具体地址
      DetaileAddress: '',
      // 租客电话
      phone: null,
      // 房屋是否收藏
      isHouseCollection: '',
      //
      markers: [],
      longitude: '',
      latitude: ''
    };
  },
  methods: {
    getHouseInfo() {
      const params = {
        id: this.id,
        houseId: this.id,
        parentId: this.parentId
      };
      return this.$store.dispatch('getHouseInfo', params);
    },
    zixunPhone() {
      wx.makePhoneCall({
        phoneNumber: getItem('phone')
      });
    },
    orderHouse() {
      this.$router.push({
        path: '/pages/zhengzhu/orderHouse',
        query: {
          id: this.id,
          parentId: this.parentId
        }
      });
    },
    onLineBook() {
      this.$router.push({
        path: '/pages/zhengzhu/onLineBook',
        query: {
          id: this.id,
          parentId: this.parentId
        }
      });
    }
  },
  onShow() {
    this.id = this.$router.currentRoute.query.id
    this.houseId = this.$router.currentRoute.query.id
    this.parentId = this.$router.currentRoute.query.parentId
    this.getHouseInfo()
      .then(res => {
        if (res.status.code === '200') {
          const result = res.result;
          if (JSON.stringify(result) === '{}') {
            showToast({ title: '没有数据' });
          } else {
            const picList = result.picList;
            const imgUrls = [];
            if (picList > 0) {
              picList.forEach(item => {
                imgUrls.push(item.big);
              });
            } else {
              imgUrls.push('../images/indexbanner.png');
            }
            // 门店详细地址
            var hiDetailedAddress =
              result.quyuCName + result.shi + '室' + result.ting + '厅';
            if (hiDetailedAddress.length > 10) {
              hiDetailedAddress = hiDetailedAddress.substring(0, 10) + '...';
            }
            // 整租合租
            var Shared = '';
            if (result.isShared === 1) {
              Shared = '合';
            } else {
              Shared = '整';
            }
            // 价格
            var Price = result.zujin;
            // 户型、面积、朝向、装修、楼层
            var houseXinxi = {
              huxing: result.shi + '室' + result.ting + '厅',
              mianji: result.mianji + '㎡',
              chaoxiang: result.chaoxiang.key,
              zhuangxiu: result.zhuangxiutype.key,
              louceng: result.loucengA + '/' + result.loucengB + '层'
            };
            // 电话号码
            var mendianPhone = result.fangZhuPhone;
            if (mendianPhone === '' || null || undefined) {
              mendianPhone = '暂无预留电话';
            }
            // 具体地址
            var DetaileAddress =
              result.quyuAName + result.quyuBName + result.quyuCName;
            // 是否收藏
            var isHouseCollection = result.isHouseCollection;
            var lat = result.lat;
            var lng = result.lng;
            // 地图项目
            var arr = [];
            // var lat = result.lat
            // var lng = result.lng
            var mark = {
              iconPath: '../../../images/maps_icon/marker_red.png',
              longitude: lng,
              latitude: lat
            };
            arr.push(mark);
            this.markers = arr;
            this.longitude = lng;
            this.latitude = lat;
            this.imgUrls = imgUrls; // banner
            this.hiDetailedAddress = hiDetailedAddress; // 描述
            this.Shared = Shared; // 整合
            this.Price = Price; // 租金
            this.houseXinxi = houseXinxi; // 房间信息
            this.mendianPhone = mendianPhone; // 电话
            this.DetaileAddress = DetaileAddress; // 具体地址
            this.isHouseCollection = isHouseCollection;
          }
        } else {
          showToast({ title: res.status.msg });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='less' scoped>
@import "../css/carousel.less";
.container {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}

/*banner  */
.banner_box {
  width: 100%;
  height: 320rpx;
  position: relative;
}

/* 收藏 */
.collect {
  position: absolute;
  top: 50rpx;
  right: 50rpx;
  width: 60rpx;
  height: 46rpx;
  z-index: 9999;
}
.collect image {
  display: block;
  width: 60rpx;
  height: 46rpx;
}

.banner-count {
  position: absolute;
  right: 120rpx;
  bottom: 100rpx;
  color: #fff;
  width: 60rpx;
  height: 40rpx;
  text-align: center;
  font-size: 28rpx;
  opacity: 0.5;
  border-radius: 10rpx;
  background-color: #000;
}

/* 主体内容 */
.content {
  width: 100%;
  height: auto;
  padding: 20rpx;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 100rpx;
  font-size: 32rpx;
}

/*户型介绍  */
.huxing_box {
  width: 100%;
  background: #fff;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 8rpx;
  margin-bottom: 30rpx;
  margin-top: -80rpx;
}
.shared {
  width: 34rpx;
  height: 34rpx;
  display: inline-block;
  background-color: #60c43d;
  text-align: center;
  font-size: 22rpx;
  border-radius: 6rpx;
  color: #fff;
}
.price {
  float: right;
  height: 28rpx;
  color: #fbb174;
}
/*户型配置  */
.peizhi_box {
  width: 100%;
  min-height: 200rpx;
  background: #fff;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 8rpx;
  margin-bottom: 30rpx;
}

/*房间介绍  */
.fangjian_box {
  width: 100%;
  min-height: 200rpx;
  background: #fff;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 8rpx;
  margin-bottom: 30rpx;
}
.xinxi-list {
  width: 49%;
  float: left;
  font-size: 24rpx;
  line-height: 44rpx;
  color: #999;
  text-align: left;
  padding-left: 10%;
  box-sizing: border-box;
}

/*联系我们  */
.lianxi_box {
  width: 100%;
  min-height: 200rpx;
  background: #fff;
  padding: 20rpx;
  box-sizing: border-box;
  border-radius: 8rpx;
  margin-bottom: 30rpx;
}
/*联系我们模块样式*/

.img_size {
  width: 80rpx;
  height: 80rpx;
  margin-left: -30rpx;
  margin-right: -20rpx;
  margin-top: -10rpx;
}

.img_info {
  font-size: 30rpx;
  padding-left: 20rpx;
  color: #999;
}

.contract-item {
  padding-left: 20rpx;
  display: flex;
  align-items: center;
  padding-bottom: 10rpx;
}

/*底部按钮  */
.menu_btn {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  color: #fff;
  background: #fbb174;
}

.zixun_btn {
  width: 33%;
  float: left;
  color: #9e9d9d;
  background: #e6e3e3;
}

.yuyue_btn_box {
  width: 67%;
  height: 60rpx;
  float: left;
  padding: 30rpx 0;
  line-height: 40rpx;
}

.kanfang_btn {
  width: 50%;
  float: left;
  border-right: 1rpx solid #fff;
  box-sizing: border-box;
}

.yuding_btn {
  width: 50%;
  float: left;
}
/* 地图样式 */
.map_contain {
  width: 100%;
  padding: 20rpx 0;
}
map {
  width: 100%;
}
</style>