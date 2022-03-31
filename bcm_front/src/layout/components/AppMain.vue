<template>
  <section class="app-main">
    <div class="app-container">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedViews">
          <div>
            <el-row :gutter="15">
              <el-col :span="5">
                <component :is="componentIs" />
              </el-col>
              <el-col :span="19">
                <router-view :key="key" />
              </el-col>
            </el-row>
          </div>
        </keep-alive>
      </transition>
    </div>
  </section>
</template>

<script>
import detail from './components/details'
import home from './components/home'
import query from './components/query'

export default {
  name: 'AppMain',
  components: {
    home,
    detail,
    query,
  },
  computed: {
    componentIs() {
      //判断key是否为/home,如果是则返回home组件,如果是singlePayment则返回detail组件 否则返回query组件
      if (this.$route.path === '/home') {
        return 'home'
      } else if (this.$route.path.includes('/singlePayment')) {
        return 'detail'
      } else {
        return 'query'
      }
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
  },
}
</script>

<style lang="scss" scoped>
.app-main {
  ///* 50= navbar  50  */
  //min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
