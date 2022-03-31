<template>
  <div v-loading="loading" class="detail-page">
    <div class="header flex flex-j-between">
      <div v-if="title" class="title">{{ title }}</div>
      <div class="buttons-group">
        <div v-if="$slots.buttons" class="buttons">
          <slot name="buttons" />
        </div>
        <div v-else-if="buttons" class="buttons">
          <buttons :buttons="buttons">
            <template v-for="key in customButtons" :slot="`button-${key.prop}`" slot-scope="{ btn }">
              <slot :name="`button-${key.prop}`" :btn="btn" />
            </template>
          </buttons>
        </div>
      </div>
    </div>
    <div ref="content" :class="{ hideBtns: hideBtns }" class="content">
      <slot />
    </div>
    <div v-if="!hideBtns">
      <div v-if="$slots.footer" class="footer">
        <slot name="footer" />
      </div>
      <div v-else-if="!isInfo" class="footer">
        <el-button v-if="showCancelBtn" :loading="loading" @click="$emit('cancel')">返 回</el-button>
        <el-button :loading="loading" type="primary" @click="handleSubmit">确 定</el-button>
      </div>

      <div v-else class="footer">
        <el-button :loading="loading" @click="$emit('cancel')">返 回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, } from '@/utils'
import Buttons from '@/components/Buttons'

export default {
  name: 'Index',
  components: { Buttons, },
  props: {
    hideBtns: {
      type: Boolean,
      default: false,
    },
    isInfo: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    customButtons() {
      return this.buttons.filter((item) => item.type === 'custom')
    },
  },
  methods: {
    handleSubmit: debounce(
      async function() {
        this.$emit('submit')
      },
      300,
      false
    ),
    scroll(top) {
      this.$refs.content.scrollTo({ top: top, })
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-page {
  &.isPerfect {
    .footer {
      position: fixed;
    }
  }
  padding: 0;

  /* ::v-deep.el-form-item__content{
     font-size: 0;
   }*/
  .title {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 16px;
    text-align: left;
    color: #333;
  }

  .content {
    &.hideBtns {
      height: auto;
    }
    overflow: auto;
    height: calc(100% - 128px);

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 76px;
    padding: 20px;
    text-align: center;
    background: #fff;
  }
}
</style>
