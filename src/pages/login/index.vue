<template>
  <!--pages/login/login.wxml-->
  <div class='container'>
    <image class='bg_img' src='../../images/login/login-bg.png'></image>
    <div class='bg-box'>
      <div class='logo_contain'>
        <image src="../../images/login/logo.png" class='logo'></image>
      </div>
      <div class='input_contain'>
        <!--手机号 -->
        <div class='input_cell'>
          <label>
            <image src="../../images/login/icon-phone-an.png" class="icon" />
          </label>
          <input placeholder="手机号" v-model="phoneNum" />
        </div>
        <!--身份证 -->
        <div class='input_cell' v-if="!switchFlag">
          <label>
            <image src="../../images/login/icon-lock-an.png" class="icon" />
          </label>
          <input placeholder="身份证后六位" type='password' v-model="phonePass" />
        </div>
        <!--验证码-->
        <div class='input_cell' v-if="switchFlag">
          <label>
            <image src="../../images/login/icon-lock-an.png" class="icon" />
          </label>
          <input placeholder="验证码" v-model="code" />
          <text class='checkCode' @tap='getCode' v-if="time<=0">获取验证码</text>
          <text class='checkCode' v-if="time>0">{{time}}s</text>
        </div>
      </div>
      <!-- 按钮模块 -->
      <div class='login_contain'>
        <button class='login_btn' @tap='login'>登录</button>
      </div>
      <!--注册模块 -->
      <div class='register' @tap='register'>
        <text v-if="!switchFlag">还没有账号，验证码登录>></text>
        <text v-else>已有账号，密码登录>></text>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkMobile, showToast, setItem } from '@/utils';
export default {
  name: 'loginPage',
  data() {
    return {
      phoneNum: '',
      phonePass: '',
      switchFlag: false,
      time: 0,
      code: ''
    };
  },
  methods: {
    register() {
      if (this.switchFlag) {
        this.code = '';
      } else {
        this.cardId = '';
      }
      this.switchFlag = !this.switchFlag;
    },
    countTime() {
      if (this.time < 1) {
        this.time = 0;
      } else {
        this.time--;
        const that = this;
        setTimeout(() => {
          that.countTime();
        }, 1000);
      }
    },
    getCode() {
      if (!checkMobile(this.phoneNum)) {
        showToast({ title: '电话号码有误' });
      } else {
        this.time = 60;
        this.countTime();
        this.$store.dispatch('getCode', this.phoneNum);
      }
    },
    login(e) {
      // console.log(e)
      if (!checkMobile(this.phoneNum)) {
        // 手机校验
        showToast({ title: '电话号码有误' });
        return;
      }
      if (this.switchFlag) {
        // 验证码登陆
        console.log(this.code);
        if (!this.code) {
          // 验证码校验
          showToast({ title: '验证码错误' });
          return;
        }
      } else {
        if (this.phonePass.length !== 6) {
          showToast({ title: '密码必须是6位' })
          return
        }
      }
      this.$store
        .dispatch('login', { phoneNum: this.phoneNum, code: this.code, phonePass: this.phonePass })
        .then(res => {
          if (res.status.code === '200') {
            setItem('phone', this.phoneNum)
            this.$store.dispatch('getUserHouseInfo', { phone: this.phoneNum })
            this.$router.push({
              path: '../../pages/my/index',
              reLaunch: true
            })
          } else {
            showToast({ title: res.status.msg });
          }
        })
        .catch(error => {
          console.log(error);
          showToast({ title: '登录失败' });
        });
    }
  }
};
</script>

<style lang='less' scoped>
/* pages/login/login.wxss */

.container {
  width: 100%;
  position: relative;
}

.bg_img {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}

.bg-box {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  z-index: 99;
}

.img_cover {
  width: 100%;
  height: 100%;
}

.logo_contain {
  text-align: center;
  padding-top: 10vh;
  padding-bottom: 15vh;
}

.logo {
  width: 150rpx;
  height: 150rpx;
}

.input_contain {
  text-align: center;
}

.input_contain .input_cell {
  background: #fff;
  width: 70%;
  border-radius: 4rpx;
  display: inline-block;
  height: 90rpx;
  position: relative;
  margin-bottom: 10px;
}

.input_contain input {
  height: 100%;
  text-align: left;
  padding-left: 90rpx;
  border: none;
  outline: none;
  font-size: 28rpx;
  color: #999;
}

.icon {
  position: absolute;
}

.input_cell image {
  width: 26rpx;
  height: 36rpx;
}

.input_cell label {
  position: absolute;
  top: 28rpx;
  left: 40rpx;
}

.login_contain {
  margin-top: 40rpx;
  width: 100%;
  text-align: center;
  height: 90rpx;
}

.login_btn {
  width: 70%;
  background: #fbb174;
  color: #fff;
  border: none;
  font-size: 32rpx;
}

button::after {
  content: none;
  border: none;
}

.register {
  font-size: 28rpx;
  color: #fff;
  text-align: center;
  padding-top: 20rpx;
}

.checkCode {
  position: absolute;
  top: 28rpx;
  right: 16rpx;
  font-size: 28rpx;
  color: #fbb174;
  z-index: 999;
}
</style>