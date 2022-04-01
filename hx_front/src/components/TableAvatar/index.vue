<template>
  <el-image :preview-src-list="[src]" :src="src" class="img">
    <div slot="error" class="image-slot">
      <div :class="isMachine?'no-machinery-pic':`no-avatar-pic`" />
    </div>
  </el-image>
</template>
<script>
export default {
  name: 'TableAvatar',
  props: {
    src: { type: String, default: '', },
    isMachine: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
