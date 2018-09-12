<template>
 <div class='container'>
    <div class='yuyue_nav'>
        <div class='yuyue_nav_item' 
        :class="tabcheck == 0?'checked':'nochecked'"
         @tap='checkTab(0)'>
            品牌公寓
        </div>
        <div class='yuyue_nav_item'
        :class="tabcheck == 1?'checked':'nochecked'"
        @tap='checkTab(1)'>
            整租/合租
        </div>
    </div>
    <div class='content-box' v-if='tabcheck == 0'>
        <!-- 公寓 -->
        <div class='yuyue_list' v-if='roomList.length>0'>
            <div v-for='(fangyuanItem, index) in roomList'  :key="index">
               <book-house :houseItem=fangyuanItem @getLoad="getOrder"></book-house>
            </div>
        </div>
        <div class='yuyue_list no_content' v-else>没有任何内容！</div>
    </div>
    <div class='content-box' v-if='tabcheck === 1'>
        <!-- 整租合租 -->
        <div class='yuyue_list' v-if='houseList.length>0'>
            <div v-for='(houseItem, index) in houseList' :key="index"  >
                <!-- <template is='yuyue' data='{{houseItem}}' /> -->
                <book-house :houseItem=houseItem @geLoad="getOrder"></book-house>
            </div>
        </div>
        <div class='yuyue_list no_content' v-else>没有任何内容！</div>
    </div>
</div>
</template>

<script>
import { getItem, showToast } from '@/utils'
import bookHouse from '../template/bookHouse'
// import allTogether from '../template/allTogether'
export default {
  name: 'order',
  components: {
    bookHouse
  },
  data() {
    return {
      // 控制tab切换
      tabcheck: 0,
      // 预约公寓房源列表
      roomList: [],
      // 预约整组合租房源列表
      houseList: [],
      // 用户手机号
      phone: ''
    };
  },
  methods: {
    // 获取预约列表
    getOrder: function () {
      this.$store.dispatch('getNum', 'bookNum').then(res => {
        if (res.status.code === '200') {
          const gongyuList = []
          const zhengzuList = []
          const houseArr = res.result.list
          houseArr.forEach(item => {
            if (item.houseType === 3) {
              gongyuList.push(item)
            }
            if (item.houseType === 1 || item.houseType === 2) {
              zhengzuList.push(item)
            }
          })
          this.roomList = gongyuList
          this.houseList = zhengzuList
        } else {
          showToast({ title: res.status.msg })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // tab切换
    checkTab: function(check) {
      if (this.tabcheck !== check) {
        this.tabcheck = check
      }
    }
  },
  onLoad() {
    this.phone = getItem('phone')
    this.getOrder()
  }
};
</script>

<style lang='less' scoped>
.container{
    width: 100%;
    height: 100vh;
    background: #f1f1f1;
    /* position: relative; */
}

.yuyue_nav{
    width: 100%;
    /* padding: 0 20rpx; */
    font-size: 28rpx;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #f1eded;
    display: flex;
    justify-content: space-around;
}

.yuyue_nav_item{
    width: auto;
    padding: 30rpx 8rpx;
}

.checked{
    color: #fbb174;
    border-bottom: 2px solid #fbb174;
}

.yuyue_list{
    width: 100%;
    height: auto;
}

.top_tip{
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    background: red;
    color: #fff;
    font-size: 24rpx;
}

.no_content{
    width: 100%;
    text-align: center;
    margin-top: 300rpx;
    font-size: 28rpx;
}
</style>