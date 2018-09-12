<template>
 <div>
    <div class="son" @click="sendFather">
      click from {{son}}to father on Event
    </div>
    <slot>son son son</slot>
 </div>
</template>

<script>
  export default {
    name: 'son',
    data () {
      return {
        son: 'son'
      }
    },
    methods: {
      sendFather() {
        console.log('son son son')
        this.$emit('fromson')
      },
      getMsg() {
        console.log('get')
      }
    }
  }
</script>

<style lang='less' scoped>
  .son {
    width: 100%;
    padding-bottom: 20px;
    font-size: 14px;
    text-align: center;
    background-color: blue;
  }
</style>