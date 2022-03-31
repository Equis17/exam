<template>
  <div class="transBox">
    <div class="header">
      <div class="title">企业信息</div>
    </div>
    <div class="info">
      <div class="companyName">北京加旺电器有限公司</div>
      <div class="username">【学生名称】</div>
      <div class="text">消息盒子：无</div>
      <div class="text">我的客户经理：无</div>
    </div>
    <div class="tab">
      <div class="tabItem">企业金融</div>
      <div class="tabItem">生活服务</div>
    </div>
    <div class="iconList">
      <div v-for="item in iconList" :key="item.name" class="iconItem" @click="to(item)">
        <div class="icon">
          <img :src="item.icon" alt="">
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="arrow" />
      </div>
    </div>
    <!--          <div class="iconList">
                <div v-for="item in iconList" :key="item.name" class="iconItem">
                  <div class="icon">
                    <img :src="item.icon" alt="">
                  </div>
                  <div class="name">{{ item.name }}</div>
                  <div class="arrow" />
                </div>
              </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      iconList: [
        { icon: require('@/assets/icons/icon_fw1.png'), name: '企业单笔付款' },
        { icon: require('@/assets/icons/icon_fw2.png'), name: '财务发放' },
        { icon: require('@/assets/icons/icon_fw3.png'), name: '财务查询' },
        { icon: require('@/assets/icons/icon_fw4.png'), name: '网银交易查询' },
        { icon: require('@/assets/icons/icon_fw5.png'), name: '对账单管理' },
        { icon: require('@/assets/icons/icon_fw6.png'), name: '自助查询征信报告签约' },
      ],
    }
  },
  methods: {
    // 跳转
    to(item) {
      this.$router.push('/singlePayment')
    },
  },
}
</script>
<style lang="scss" scoped>
.transBox {
  .info {
    padding: 12px 10px;

    .companyName {
      font-size: 16px;
      font-weight: bold;
      line-height: 2;
      color: #0E427B;
    }

    .username {
      font-size: 14px;
      line-height: 2;
      color: #0E427B;
    }

    .text {
      font-size: 14px;
      line-height: 2;
      color: #000;
    }
  }

  .tab {
    display: flex;

    .tabItem {
      flex: 1;
      margin-bottom: 12px;
      padding: 8px 0;
      padding-left: 12px;
      border-bottom: 1px solid #CCC;

      &:first-of-type {
        font-weight: bold;
        color: #0E427B;
      }
    }
  }

  .iconList {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 12px;

    .iconItem {
      width: 50%;
      padding-bottom: 4px;

      .icon {
        width: 80px;
        height: 80px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }

      .name {
        width: 80px;
        margin: 4px auto 0;
        text-align: center;
      }
    }
  }

  /*.iconList {
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

  }*/
}

</style>
