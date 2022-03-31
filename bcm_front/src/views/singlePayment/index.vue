<template>
  <div class="transBox">
    <div class="header">
      <div class="title"> 您当前所在位置：基本服务 >> 企业单笔付款 >> 企业单笔付款
      </div>
    </div>
    <div class="box">
      <div class="boxWrap">
        <div class="title">
          企业单笔付款
        </div>
        <div class="content">
          <!--循环computedBtnList-->
          <div v-for="(row,idx) in computedBtnList" :key="idx" :class="{row:true,'even':idx%2!=0}">
            <!--循环row class是否单数-->
            <div v-for="(item,index) in row" :key="index" :class="{btnBox:true}">
              <div class="btn" @click="handleClick(item)">
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  computed: {
    //循环btnList
    computedBtnList() {
      const list = []
      this.btnList.forEach((item, idx) => {
        //每行三个
        if (idx % 3 === 0) {
          list.push([])
        }
        list[list.length - 1].push(item)
      })
      return list
    },
  },
  data() {
    return {
      iconList: [
        { icon: require('@/assets/icons/icon_fw1.png'), name: '网银交易查询' },
        { icon: require('@/assets/icons/icon_fw2.png'), name: '网银费用查询' },
        { icon: require('@/assets/icons/icon_fw3.png'), name: '票据查询' },
        { icon: require('@/assets/icons/icon_fw4.png'), name: '对账单查询' },
        { icon: require('@/assets/icons/icon_fw5.png'), name: '单位卡查询' },
        { icon: require('@/assets/icons/icon_fw6.png'), name: '企业单笔付款' },
        { icon: require('@/assets/icons/icon_fw7.png'), name: '企业批量付款' },
      ],
      btnList: [
        { name: '付款录入', url: '/singlePayment/add' },
        { name: '单笔维护', url: '/singlePayment/add' },
        { name: '单笔复核', url: '/singlePayment/add' },
        { name: '单笔授权', url: '/singlePayment/add' },
        { name: '预约取消/转账撤销', url: '/singlePayment/add' },
        { name: '付款用途维护', url: '/singlePayment/add' },
        { name: '常用账号维护', url: '/singlePayment/add' },
        { name: '慈善捐款录入', url: '/singlePayment/add' },
        { name: '外币转账录入', url: '/singlePayment/add' },
        { name: '外币转账授权', url: '/singlePayment/add' },
        { name: '外币转账查询', url: '/singlePayment/add' },
        { name: '直联录入授权', url: '/singlePayment/add' },
        { name: '单笔高级授权', url: '/singlePayment/add' },
      ],
    }
  },
  methods: {
    handleClick(item) {
      this.$router.push(item.url)
    },
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

.content {
  .row {
    display: flex;
    border-top: 1px solid #CCC;
    background-color: #F2F2F2;

    &.even {
      background-color: #FFF;
    }

    &:last-of-type {
      border-bottom: 1px solid #CCC;
    }
  }

  .btnBox {
    width: 33.3%;
    padding: 12px 0;
    border-right: 1px solid #CCC;

    &:last-of-type {
      border-right: 0;
    }

    .btn {
      font-size: 14px;
      width: 80%;
      margin: 0 auto;
      padding: 10px;
      text-align: center;
      color: #EEE;
      border: 1px solid #1969CC;
      border-radius: 2px;
      background: linear-gradient(180deg, #81AFEA, #377ACE);
      box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.50) inset;
    }
  }
}


</style>
