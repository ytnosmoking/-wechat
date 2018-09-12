<template >
  <div>
    <div v-for="(item, id) in contractList" :key="id">
      <div class='myContract' :w1data-id='item.id' @tap='viewContractDetail(item)'>
        <div class='contract clearfix'>
          <text class='common-fl'>我的家</text>
          <label class='futextColor'>{{item.startTime}}/{{item.endTime}}</label>
          <!-- <div class='clear'></div> -->
        </div>
        <div class='detail clearfix'>
          <div class='futextColor'>{{item.house.quyuAName}}{{item.house.quyuCName}}</div>
          <div class='futextColor'>{{item.house.buildingNo}}栋-{{item.house.fangNo}}-集中</div>
          <div class='detail-price'>￥{{item.house.zujin}}元/月</div>
          <div v-if='item.status==0' class='detail-current'>租期中</div>
          <div v-else-if='item.status==16' class='detail-current'>已退租</div>
          <div v-else-if='item.status==13' class='detail-current'>已违约</div>
          <div v-else class='detail-current'></div>
          <!-- <div class='clear'></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contractList',
  props: {
    contractList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    viewContractDetail(item) {
      this.$router.push({
        path: '/pages/my/contract/detail',
        query: {
          id: item.id
        }
      })
    }
  }
};
</script>

<style lang='less' scoped>
@import "./total.less";

</style>