<template>
  <span>
    <template v-for="(btn, index) in btns">
      <component
        :is="`el-${btn.type || 'button'}`"
        v-if="btn.type !== 'custom'"
        :key="index"
        class="buttons"
        v-bind="injectProps(btn)"
        v-on="btn.on"
      >
        <span v-if="btn.label">{{ getLabel(btn.label) }}</span>
        <buttons v-if="Array.isArray(btn.children)" :buttons="btn.children" />
      </component>
      <slot v-else :name="`button-${btn.prop}`" :btn="btn" />
    </template>
  </span>
</template>

<script>
export default {
  name: 'Buttons',
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultConfig: {
        button: {
          size: 'small',
        },
      },
    }
  },
  computed: {
    btns() {
      return this.buttons.filter((btn) =>
        btn.hasOwnProperty('show') ? (typeof btn.show === 'function' ? btn.show() : btn.show) : true
      )
    },
  },
  methods: {
    getLabel(label) {
      if (!label) {
        return ''
      } else if (typeof label === 'function') return label()
      return label
    },
    injectProps(btn) {
      const { props = {}, type = 'button', } = btn
      const newProps = { ...this.defaultConfig[type], ...props, }
      Object.keys(newProps).forEach((key) => typeof newProps[key] === 'function' && (newProps[key] = newProps[key]()))
      return { ...newProps, }
    },
  },
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-left: 6px;
}
</style>
