<template>
  <section class="broken-box">
    <!-- 物业缴费趋势图 -->
    <Property />
    <!-- 商城销售额统计 -->
    <Sale />
  </section>
</template>

<script>
import Property from './components/Property'
import Sale from './components/Sale'

export default {
  name: 'Broken',

  components: {
    Property,
    Sale,
  }
}
</script>

<style lang="scss" scoped>
.broken-box {
  display: flex;
}

.scope {
  margin-right: 30px;

  &:last-of-type {
    margin-right: 0;
  }
}
</style>
