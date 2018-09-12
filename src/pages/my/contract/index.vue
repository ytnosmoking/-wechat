<template>
  <div class="wrapper">
    <contract-list :contractList="contractList"></contract-list>
  </div>
</template>

<script>
import { getItem } from '@/utils'
import contractList from '../template/contract'
export default {
  name: 'contract',
  components: {
    contractList
  },
  data() {
    return {
      contractList: []
    };
  },
  onShow() {
    this.contractList = getItem('userHouseInfo')
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  background-color: #f1f1f1;
  width: 100%;
  height: 100%;
}
</style>