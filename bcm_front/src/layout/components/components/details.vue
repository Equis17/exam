<template>
  <div class="transBox">
    <div class="header">
      <div class="title">基本服务</div>
    </div>
    <div class="iconList">
      <div v-for="item in iconList" :key="item.name" class="iconItem">
        <div class="icon">
          <img :src="item.icon" alt="">
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconList: [
        { icon: require('@/assets/icons/icon_fw1.png'), name: '企业单笔付款' },
        { icon: require('@/assets/icons/icon_fw2.png'), name: '企业批量付款' },
        { icon: require('@/assets/icons/icon_fw3.png'), name: '交付保' },
        { icon: require('@/assets/icons/icon_fw4.png'), name: '工资/奖金发放' },
        { icon: require('@/assets/icons/icon_fw5.png'), name: '特色企业批量付款' },
        { icon: require('@/assets/icons/icon_fw6.png'), name: '联动代发' },
        { icon: require('@/assets/icons/icon_fw7.png'), name: '企业贷款还款' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.transBox {
  .iconList {
    padding: 8px 10px;

    .iconItem {
      display: flex;
      align-items: center;
      padding: 8px 0;
      cursor: pointer;
      border-bottom: 1px solid #CCC;

      &:last-of-type {
        border-bottom: none;
      }

      .icon {
        width: 48px;
        height: 48px;
        margin-right: 12px;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        flex: 1;
        text-align: left;
        color: #2D2D2D; }

      .arrow {
        width: 16px;
        height: 16px;
        background: url('~@/assets/icons/icon_arr.png');
        background-size: cover;
      }
    }

  }

  .box {
    box-sizing: border-box;
    margin: 24px 16px;
    border: 1px solid #CCC;
    background: linear-gradient(180deg, #FFF, #F2F2F2 120px, #FFF);

    .boxWrap {
      height: 100%;
      margin: 4px;
      border: 1px dotted #CCC;

      .title {
        font-size: 16px;
        font-weight: bold;
        padding: 24px;
        text-align: center;
        color: #3A71A8;
        background-color: #FFF;
      }
    }
  }
}
</style>
