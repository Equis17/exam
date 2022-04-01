<template>
  <el-tooltip :content="content" effect="light" placement="top-start">
    <div class="icon-question" />
  </el-tooltip>
</template>

<script>
export default {
  name: 'Index',
  props: {
    content: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-question {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-left: 6px;
  cursor: pointer;
  vertical-align: middle;
  background: url('~@/assets/icons/icon_tips@2x.png');
  background-size: cover;
}

</style>
