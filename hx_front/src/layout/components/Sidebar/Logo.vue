<template>
  <div :class="{'collapse':collapse}" class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: '泓江',
      logo: require('@/assets/icons/img.png'),
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  line-height: 50px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 50px;
  text-align: center;
  background: #EBF1F6;

  & .sidebar-logo-link {
    width: 100%;
    height: 100%;

    & .sidebar-logo {
      width: 160px;
      height: auto;
      margin-right: 12px;
      vertical-align: middle;
    }

    & .sidebar-title {
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 50px;
      display: inline-block;
      margin: 0;
      vertical-align: middle;
      color: #FFF;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
