<template>
  <div class="navbar">
    <div class="topBar">
      <div class="title">增值税发票税控开票软件（金税盘版）V2.0.45_ZS_20211231</div>
      <div class="username">{{ userId }}</div>
    </div>
    <div class="features">
      <div class="iconList">
        <div class="iconListWrap">
          <div
            v-for="(item, index) in iconList"
            :key="index"
            :class="{'active': item.active}"
            class="iconItem"
          >
            <img :src="item.icon" />
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="helps">

      </div>
    </div>
    <div class="navBoxList">
      <div v-for="(item, index) in navBoxList" :key="index" class="navBox">
        <div class="navBoxTitle" @click="to(item)">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import ErrorLog from '@/components/ErrorLog'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import { getToken } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
  },
  computed: {
    userId() {
      return getToken()
    },
  },
  data() {
    return {
      navBoxList: [
        { name: '发票填开', path: '/add' },
        { name: '发票作废', path: '/add' },
        { name: '查询修复', path: '/add' },
        { name: '红字发票信息表', path: '/add' },
        { name: '发票参数设置', path: '/add' },
      ],
      iconList: [
        {
          name: '系统设置',
          icon: require('@/assets/icons/icon_xtsz.png'),
          path: '/',
        },
        {
          name: '票源管理',
          icon: require('@/assets/icons/icon_pygl.png'),
          path: '/',
        },
        {
          name: '发票管理',
          icon: require('@/assets/icons/icon_fpgl.png'),
          path: '/',
          active: true,
        },
        {
          name: '汇总处理',
          icon: require('@/assets/icons/icon_hzcl.png'),
          path: '/',
        },
        {
          name: '系统维护',
          icon: require('@/assets/icons/icon_xtwh.png'),
          path: '/',
        },
        //TODO
        {
          name: '扫码开票',
          icon: require('@/assets/icons/icon_xtwh.png'),
          path: '/',
        },
        {
          name: '智能编码',
          icon: require('@/assets/icons/icon_xtwh.png'),
          path: '/',
        },
        {
          name: '诺诺客服',
          icon: require('@/assets/icons/icon_xtwh.png'),
          path: '/',
        },
      ],
    }
  },
  methods: {
    to(item) {
      this.$router.push(item.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  overflow: hidden;
  height: 172px;
  padding: 13px 13px 0 13px;
  background: rgb(94, 140, 238);

  .topBar {
    font-size: 0;
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #FFF;
    }

    .username {
      font-size: 14px;
      color: #FFF;
    }
  }
}

.features {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;

  .iconList {
    flex: 1;

    .iconListWrap {
      display: flex;

      .iconItem {
        height: 97px;
        padding: 0 20px;

        &.active {
          background: linear-gradient(180deg, rgba(94, 178, 248, 0.00), rgba(94, 178, 248, 0.36) 25%, #5EB2F8); }

        img {
          width: 60px;
          height: 60px;
        }

        .name {
          font-size: 14px;
          margin-top: -4px;
          color: #FFF;
        }
      }
    }
  }
}

.navBoxList {
  display: flex;
  margin: 0 -13px;
  padding: 10px 0 10px 33px;
  background-color: #5EB2F8;
  gap: 43px;

  .navBox {
    font-size: 14px;
    cursor: pointer;
    color: #FFF;
  }

}
</style>
