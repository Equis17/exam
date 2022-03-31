<template>
  <div class="navbarBox">
    <div class="navbar">
      <div class="wrapper">
        <div class="logo" />
        <div class="icons">
          <div class="iconWraps">
            <div v-for="icon in iconList" :key="icon.name" class="icon">
              <img :src="icon.icon" />
              <div class="text">{{ icon.name }}</div>
            </div>
          </div>
        </div>
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
    ]),
  },
  data() {
    return {
      iconList: [
        { icon: require('@/assets/icons/icon_sy.png'), name: '我的首页' },
        { icon: require('@/assets/icons/icon_jbfw.png'), name: '基本服务' },
        { icon: require('@/assets/icons/icon_ytfw.png'), name: '蕴通服务' },
        { icon: require('@/assets/icons/icon_cylfw.png'), name: '产业链服务' },
        { icon: require('@/assets/icons/icon_zxfw.png'), name: '专项服务' },
        { icon: require('@/assets/icons/icon_pzfw.png'), name: '配置服务' },
        { icon: require('@/assets/icons/icon_wdrw.png'), name: '我的任务' },
      ],
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.navbarBox {
  height: 96px;
  padding-top: 8px;
}

.navbar {
  height: 77px;
  background: linear-gradient(180deg, #0A81C3, #0A7AB9 14%, #083F5D);

  .wrapper {
    font-size: 0;
    display: flex;
    width: 1000px;
    margin: 0 auto;

    .logo {
      display: inline-block;
      width: 220px;
      height: 96px;
      margin-top: -8px;
      background: url('~@/assets/icons/jh_lgoo.png') no-repeat;
      background-size: contain;
    }

    .icons {
      flex: 1;
      margin-left: 30px;

      .iconWraps {
        display: flex;
        align-items: center;
        width: 100%;
        height: 77px;
        gap: 30px;

        .icon {
          text-align: center;

          .text {
            font-size: 12px;
            margin-top: 4px;
            color: #FFF;
          }
        }
      }

    }
  }
}
</style>
