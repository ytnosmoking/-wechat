<!-- 收藏 公寓信息模板  -->
<template>
  <div>
    <div v-for='(fangyuanItem, index) in fangyuanList' :key="index">
      <div class='part-content'>
        <div class='house-img' :data-id='fangyuanItem.id'
          :data-parentid='fangyuanItem.houseRoomType.id' 
          :data-type='fangyuanItem.houseType' 
          @tap='viewMendianDetail(fangyuanItem)'>
          <image v-if='fangyuanItem.picObj.big' class='house-img-bg' :src='fangyuanItem.picObj.big'></image>
          <image v-else class='house-img-bg' src='/images/default/fang_default.png'></image>
          <image class='house-img-ok' :data-id='fangyuanItem.id'
            @tap.stop='removeCollect(fangyuanItem)' src='/images/collect/collect_02.png'></image>
        </div>
        <div class='house-content'>
          <div class='house-content-title'>
            <text class='house-content-address-name'>{{fangyuanItem.address}}</text>
            <label v-if="fangyuanItem.houseType=='1'" class='house_type_zheng'>整</label>
            <label v-if="fangyuanItem.houseType=='2'" class='house_type_he'>合</label>
            <text class='zujins'>￥{{fangyuanItem.zujin}}元/月</text>
          </div>
          <div class='house-content-desc'>
            {{fangyuanItem.zhuangxiutype.key}}
            <text class='type'>·</text>{{fangyuanItem.shi}}室
            <text class='type'>·</text>{{fangyuanItem.ting}}厅
            <text class='type'>·</text>{{fangyuanItem.loucengA}}m²
            <text class='type'>·</text>{{fangyuanItem.loucengA}}层
          </div>
          <div class='house-content-address'>
            <image src='/images/collect/collect_03.png'></image>
            <text>{{fangyuanItem.quyuCName}}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/pages/bus'
export default {
  name: 'collect-template',
  data() {
    return {};
  },
  props: {
    fangyuanList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    viewMendianDetail(item) {
      const query = {
        id: item.id,
        parentId: item.houseRoomType.id,
        houseType: item.houseType
      }
      this.$router.push({
        path: '/pages/zhengzhu/about',
        query
      })
    },
    removeCollect(item) {
      const houseId = item.id
      this.$store.dispatch('delCollect', houseId).then(res => {
        if (res.status.code === '200') {
          Bus.$emit('getLoad')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
};
</script>

<style lang='less' scoped>
  @import './total.less';
</style>