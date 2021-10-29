<template>
  <section class="view-box">
    <!-- 小区缴费排行 -->
    <Property style="flex: 1.1" />
    <!-- 报事报修统计 -->
    <ReportRepair style="flex: 1" />
    <!-- 商城销售额排行 -->
    <ProductSale  style="flex: 0.9" />
  </section>
</template>

<script>
import Property from './components/Property'
import ProductSale from './components/ProductSale'
import ReportRepair from './components/ReportRepair'

export default {
  name: 'Rank',

  components: {
    Property,
    ProductSale,
    ReportRepair,
  }
}
</script>

<style lang="scss" scoped>
.view-box {
  display: flex;
}

.scope {
  margin-right: 30px;

  &:last-of-type {
    margin-right: 0;
  }
}
</style>
