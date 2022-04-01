<template>
  <div class="main" @click="visible=false">
    <div class="item setting1 setting">
      <img :src="require('@/assets/icons/icon_fpsz.png')">
      <div class="text">发票设置</div>
    </div>
    <div class="item step1 arrow" />
    <div class="item setting2 setting" @click.stop="openMenu">
      <img :src="require('@/assets/icons/icon_fptk.png')">
      <div class="text">发票填开</div>
    </div>
    <div class="item step2 arrow" />
    <div class="item step3 box">
      <div v-for="(item, index) in step3List" :key="index" class="step3Item">
        <img :src="item.icon">
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="to('normal')">增值税普通发票填开</li>
      <li @click="to('special')">增值税专用发票填开</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      step3List: [
        { name: '发票查询', icon: require('@/assets/icons/icon_fpcx.png') },
        { name: '发票修复', icon: require('@/assets/icons/icon_fpxf.png') },
        { name: '发票作废', icon: require('@/assets/icons/icon_fpzf.png') },
        { name: '信息表', icon: require('@/assets/icons/icon_xxb.png') },
      ],
    }
  },
  methods: {
    to(type) {
      this.$router.push('/add/' + type)
    },
    openMenu(e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      console.log(e.clientY)
      this.top = e.clientY
      this.visible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: url('~@/assets/icons/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  justify-items: center;
  gap: 30px;

  .setting {
    font-size: 0;
    width: 110px;
    cursor: pointer;

    img {
      width: 110px;
      height: 110px;
    }

    .text {
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      text-align: center;
      color: #000;
    }
  }

  .box {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    padding: 20px;
    border: 1px solid #FFF;
    border-radius: 16px;
    background: aliceblue;
    gap: 30px;

    .step3Item {
      font-size: 0;
      width: 110px;
      cursor: pointer;

      img {
        width: 110px;
        height: 110px;
      }

      .text {
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
        color: #000;
      }
    }
  }

  .arrow {
    width: 37px;
    height: 37px;
    background: url('~@/assets/icons/icon_jt.png');
    background-size: cover;
  }

}

.contextmenu {
  font-size: 12px;
  font-weight: 400;
  position: fixed;
  z-index: 3000;
  margin: 0;
  padding: 5px 0;
  list-style-type: none;
  color: #333;
  border-radius: 4px;
  background: #FFF;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #EEE;
    }
  }
}
</style>
