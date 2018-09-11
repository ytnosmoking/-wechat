<template>
  <div class='container'>
    <div class='top'>
      <div class='diqu'>
        <div class='diqu_choose'>
          <picker mode="selector" :range="cityList" range-key='name' :value="cityCode" @change="changeCity">
            <div class="picker">
              {{cityList[cityCode].name||0}}
            </div>
          </picker>
        </div>
        <div class='arrow'></div>
      </div>
      <div class='title'>品牌公寓</div>
      <div class='btn_ditu'>
        <a href='/pages/maps/maps'>
          <image src='../images/map.png' />
        </a>
        <!-- <image src="{{item.imgUrls[0].picUrl}}"></image> -->
      </div>
    </div>
    <div class='bannerBox'>
      <swiper indicator-dots="true" autoplay="true" interval="3000" duration="2000" circular='true'>
        <div v-for="(item, index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item.picUrl" />
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class='mendian_title'>门店展示</div>
    <div class='mendian_info' style='text-align:center; color:#999;margin-top:30rpx;margin-bottom:60rpx;' v-if="mendianList.length==0">
      此城市暂无门店信息
    </div>
    <div class='mendian_info' v-else>
      <!-- <import src='../../../components/shouye/shouye.wxml' /> -->
      <!-- <template is='mendian' data='{{mendianList}}' /> -->
    </div>
    <div class='bottom'>商业合作：
      <span>400100000</span>
    </div>
  </div>

</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'index',
  data() {
    return {
      mendianList: [],
      imgUrls: [],
      cityId: ''

    };
  },
  computed: {
    ...mapGetters(['cityList', 'cityCode'])
  },
  methods: {
    changeCity(e) {
      this.cityId = this.cityList[this.cityCode].id
      this.$store.commit('cityCode', e.mp.detail.value - 0);
      this.getMenDianList()
    },
    getCity() {
      return this.$store.dispatch('getCity');
    },
    getBanners() {
      this.$store.dispatch('getBanners').then(res => {
        console.log(`index banner`);
        this.imgUrls = res.list;
      });
    },
    getMenDianList() {
      this.$store.dispatch('getMenDianList', this.cityId).then(res => {
        if (res.status.code === '200') {
          if (res.result.list > 0) {
            this.mendianList = res.result.list
          } else {
            this.mendianList = []
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },

  onLoad() {
    this.getCity().then(res => {
      if (res.status.code === '200') {
        this.cityId = res.result.list[0].id
        this.getMenDianList()
      }
    }).catch(error => {
      console.log(error)
    });
    this.getBanners();
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

/*头部  */
.top {
  width: 100%;
  height: 86rpx;
  line-height: 46rpx;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20rpx;
  font-size: 32rpx;
  box-sizing: border-box;
  /* display: flex; */
  background: #fff;
  z-index: 9;
  overflow: hidden;
}

/*地区选择  */
.diqu {
  float: left;
  width: 50%;
  height: 46rpx;
  font-size: 26rpx;
}

.diqu_choose {
  float: left;
  max-width: 80%;
  height: 46rpx;
  font-size: 26rpx;
  line-height: 46rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.arrow {
  float: left;
  border-top: 8rpx solid #000;
  border-right: 8rpx solid transparent;
  border-bottom: 8rpx solid transparent;
  border-left: 8rpx solid transparent;
  margin: 22rpx 0 0 10rpx;
}

/*标题  */
.title {
  width: 100%;
  height: 46rpx;
  line-height: 46rpx;
  text-align: center;
  position: absolute;
  top: 20rpx;
  left: 0;
  z-index: -1;
}

/*地图找房  */
.btn_ditu {
  float: right;
  width: 50%;
  height: 46rpx;
}

.btn_ditu image {
  display: block;
  width: 40rpx;
  height: 40rpx;
  float: right;
}

/*轮播图  */
.bannerBox {
  width: 100%;
  height: 320rpx;
  margin-top: 86rpx;
  image {
    width: 100%;
    height: 320rpx;
    display: inline-block;
  }
}

.mendian_title {
  width: 100%;
  height: 80rpx;
  line-height: 40rpx;
  text-align: center;
  padding: 25rpx 0 15rpx;
  box-sizing: border-box;
}

.mendian_info {
  width: 100%;
  height: auto;
  padding: 20rpx;
  box-sizing: border-box;
}

.bottom {
  width: 100%;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 24rpx;
  margin: 30rpx 0;
}

.bottom span {
  color: #fbb174;
}
</style>
