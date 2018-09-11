<template>
  <div class='container'>
    <!--头部房屋信息  -->
    <div class='top_box'>
      <image src='../images/index_00.png' />
      <div class='fang_info'>
        <div class='fang_name_box'>
          <div class='fang_name'>{{houseName}}</div>
          <div class='fang_he'>{{isShared}}</div>
        </div>
        <div class='fang_money_box'>
          <div class='fang_xinxi'>{{zhuangxiu}}</div>
          <div class='fang_money'>￥{{price}}元/月起</div>
        </div>
      </div>
    </div>
    <!--预约人信息  -->
    <div class='info_list'>
      <div class='info_item'>
        <div class='info_label'>姓名</div>
        <div class='info_text'>
          <input type='text' v-model='userName' placeholder='请输入姓名' />
        </div>
      </div>
      <div class='info_item'>
        <div class='info_label'>手机号</div>
        <div class='info_text'>
          <input type='number' maxlength='11' v-model='userPhone' placeholder='请输入手机号' />
        </div>
      </div>
      <div class='info_item'>
        <div class='info_label'>期望看房时间</div>
        <div class='info_text'>
          <!-- <include src="../../../components/pickerdatetime/pickerdatetime.wxml" /> -->
          <!-- <div class="form">
            <input bindtap="startTap" placeholder="请选择日期" disabled='true' value="{{startDate}}"></input>
          </div> -->
          <picker class="weui-btn" mode="multiSelector" :value="multiIndex" :range="multiArr" @columnchange="columnChange" @change="dateChange">
            <input :value='time' placeholder='选择时间' disabled />
          </picker>
        </div>
      </div>
      <div class='info_item info_beizhu' style='height:auto;'>
        <div class='info_label'>备注</div>
        <div class='info_text' style='height:auto;'>
          <!-- <textarea bindinput='userBeizhu' placeholder='请输入备注（选填）' style='width:466rpx;'></textarea> -->
          <input type='text' v-model='userBeizhu' placeholder='请输入备注（选填）'>
        </div>
      </div>
    </div>
    <div class='submit' @tap='bookNow'>立即预约</div>
  </div>

</template>

<script>
import { showToast, checkMobile } from '@/utils';
export default {
  name: 'orderHouse',
  data() {
    return {
      //   ID
      id: '',
      //   parentId
      parentId: '',
      //   房间
      houseName: '',
      // 整/合
      isShared: '',
      //   装修
      zhuangxiu: '',
      //   租金
      price: '',
      //   用户信息
      userName: '',
      userPhone: '',
      userBeizhu: '',
      seeTime: '',
      multiIndex: [0, 0, 0, 0, 0],
      multiArr: [],
      time: ''
      //   startDate:'请选择日期'
    };
  },
  methods: {
    getOrderHouse() {
      const params = {
        id: this.id
      };
      return this.$store.dispatch('getOrderHouse', params);
    },
    bookNow() {
      if (!this.userName) {
        showToast({ title: '姓名不能为空' });
        return;
      }
      if (!this.userPhone) {
        showToast({ title: '手机号不能为空' });
        return;
      }
      if (!checkMobile(this.userPhone)) {
        showToast({ title: '手机号错误' });
        return;
      }
      if (!this.seeTime) {
        showToast({ title: '时间不能为空' });
        return;
      }
    },
    getTime() {
      const date = new Date();
      const nowYear = date.getFullYear();
      const years = [];
      const months = [];
      const days = [];
      const hours = [];
      const minutes = [];
      let testArr = [];
      // get 2 year
      testArr = new Array(2).fill(1);
      testArr.forEach((item, index) => {
        years.push(nowYear + index + 1 + '年');
      });
      // get months
      testArr = new Array(12).fill(1);
      testArr.forEach((item, index) => {
        let iIndex = index + 1;
        if (iIndex < 10) {
          iIndex = '0' + iIndex;
        }
        months.push(iIndex + '月');
      });
      //  get days
      testArr = new Array(31).fill(1);
      testArr.forEach((item, index) => {
        let iIndex = index + 1;
        if (iIndex < 10) {
          iIndex = '0' + iIndex;
        }
        days.push(iIndex + '日');
      });
      //  get hours
      testArr = new Array(24).fill(1);
      testArr.forEach((item, index) => {
        let iIndex = index + 1;
        if (iIndex < 10) {
          iIndex = '0' + iIndex;
        }
        hours.push(iIndex + '时');
      });
      //  get minutes
      testArr = new Array(60).fill(1);
      testArr.forEach((item, index) => {
        let iIndex = index + 1;
        if (iIndex < 10) {
          iIndex = '0' + iIndex;
        }
        minutes.push(iIndex + '分');
      });
      this.multiArr = [years, months, days, hours, minutes];
    },
    dateChange(e) {
      const indexArr = e.mp.detail.value;
      this.multiIndex = indexArr;
      const time = this.multiArr;
      this.time =
        time[0][indexArr[0]].slice(0, -1) +
        '-' +
        time[1][indexArr[1]].slice(0, -1) +
        '-' +
        time[2][indexArr[2]].slice(0, -1) +
        ' ' +
        time[3][indexArr[3]].slice(0, -1) +
        ':' +
        time[4][indexArr[4]].slice(0, -1);
      // 没有判别 闰年 28号
      // console.log(e.mp.detail)
    },
    columnChange(e) {
      // 滑动年 月检测   日 2月 28  大小月
      // console.log(e.mp.detail.column);
      // console.log(e.mp.detail.value);
      const times = e.mp.detail.column;
      const value = e.mp.detail.value + 1;
      // 0 年 1 月 2 日
      // if (times === 0) {
      //   this.multiIndex[times] = value - 1
      //   e.mp.detail.value = this.multiIndex
      //   this.dateChange(e)
      // }
      if (times === 1) {
        const bigMonth = [1, 3, 5, 7, 8, 10, 12];
        const days = [];
        if (bigMonth.includes(value)) {
          const testArr = new Array(31).fill(1);
          testArr.forEach((item, index) => {
            let iIndex = index + 1;
            if (iIndex < 10) {
              iIndex = '0' + iIndex;
            }
            days.push(iIndex + '日');
          });
        } else {
          const testArr = new Array(30).fill(1);
          testArr.forEach((item, index) => {
            let iIndex = index + 1;
            if (iIndex < 10) {
              iIndex = '0' + iIndex;
            }
            days.push(iIndex + '日');
          });
          if (value !== 2) {
            if (this.multiIndex[2] === 30) {
              this.multiIndex[2] = 29
            }
          } else {
            // 非闰年 减去两次
            if (this.multiIndex[2] >= 28) {
              this.multiIndex[2] = 27
            }
            days.pop()
            days.pop()
          }
        }
        this.multiIndex[times] = value - 1
        this.multiArr[2] = days;
        e.mp.detail.value = this.multiIndex
        this.dateChange(e)
      } else {
        this.multiIndex[times] = value - 1
        e.mp.detail.value = this.multiIndex
        this.dateChange(e)
      }
      // if (times === 2) {
      //   this.multiIndex[times] = value - 1
      //   e.mp.detail.value = this.multiIndex
      //   this.dateChange(e)
      // }
    }
  },
  onShow() {
    this.id = this.$router.currentRoute.query.id;
    this.parentId = this.$router.currentRoute.query.parentId;
    this.getOrderHouse()
      .then(res => {
        if (res.status.code === '200') {
          var result = res.result;
          var houseName =
            result.quyuCName + result.shi + '室' + result.ting + '厅';
          if (houseName.length > 10) {
            houseName = houseName.substring(0, 10) + '...';
          }
          var isShared;
          if (result.isShared === 1) {
            isShared = '合';
          } else {
            isShared = '整';
          }
          var zhuangxiu =
            result.zhuangxiutype.key +
            '·' +
            result.shi +
            '室' +
            result.ting +
            '厅' +
            '·' +
            result.mianji +
            'm²' +
            '·' +
            result.loucengA +
            '/' +
            result.loucengB +
            '层';
          var price = result.zujin;
          this.houseName = houseName;
          this.isShared = isShared;
          this.zhuangxiu = zhuangxiu;
          this.price = price;
        } else {
          showToast({ title: res.status.msg });
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.getTime();
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
}
/*头部房屋信息  */
.top_box {
  width: 100%;
  height: 114rpx;
}

.top_box image {
  display: block;
  width: 212rpx;
  height: 114rpx;
  float: left;
  margin-right: 30rpx;
}

.fang_info {
  float: left;
  width: 468rpx;
  height: 114rpx;
}

.fang_name_box {
  width: 100%;
  height: 50rpx;
  overflow: hidden;
}

.fang_name {
  float: left;
  font-size: 32rpx;
  line-height: 50rpx;
}

.fang_he {
  float: left;
  font-size: 24rpx;
  width: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  margin: 10rpx 0 0 8rpx;
  color: #fff;
  background: #f37347;
  border-radius: 8rpx;
}

.fang_money_box {
  width: 100%;
  height: 48rpx;
  overflow: hidden;
}

.fang_xinxi {
  font-size: 22rpx;
  color: #8e8e93;
  float: left;
  line-height: 40rpx;
}

.fang_money {
  font-size: 28rpx;
  color: #f37347;
  float: right;
}

/*预约客户信息  */
.info_list {
  width: 100%;
  height: auto;
  margin-top: 40rpx;
}

.info_item {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60rpx;
  overflow: hidden;
  padding: 10rpx 0;
}

.info_label {
  float: left;
  font-size: 28rpx;
  width: 180rpx;
  height: 60rpx;
  line-height: 60rpx;
}

.info_text {
  float: left;
  font-size: 24rpx;
  width: 500rpx;
  height: 60rpx;
  line-height: 60rpx;
  color: #8e8e93;
  background: #f2f2f2;
  border-radius: 8rpx;
  padding-left: 28rpx;
  overflow: hidden;
}

.info_text input {
  display: block;
  width: 560rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 8rpx;
}

.info_beizhu .info_text {
  height: 100rpx;
}

/*提交按钮  */
.submit {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  color: #fff;
  background: #f37347;
}

.form {
  height: 60rpx;
  line-height: 60rpx;
}

.form view {
  height: 60rpx;
  line-height: 60rpx;
}
</style>