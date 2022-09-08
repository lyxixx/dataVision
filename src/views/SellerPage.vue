<template>
  <div class="com-page">SellerPage组件
  <Seller></Seller>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Seller from "@/components/Seller.vue";

export default {
  name: "SellerPage",
  components: {
    Seller,
  },
};
</script>

<style lang="less">
</style>