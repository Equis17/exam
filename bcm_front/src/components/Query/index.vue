<template>
  <el-form ref="queryForm" :class="{ 'query-form': true }" :model="queryParams" :rules="rules">
    <el-row style="width: 100%">
      <el-col
        v-for="field in fields.slice(0, ctrl.isCollapse&&collapse ? 2 : queryFields.length)"
        :key="field.prop"
        v-bind="field.layout || defaultLayoutMap[field.span || 1]"
      >
        <el-form-item :label="field.label || ''" :prop="field.prop">
          <template v-if="field.tooltip" #label>
            <span>{{ field.label || '' }}</span>
            <tips :content="field.tooltip" />
          </template>
          <el-select
            v-if="field.type === 'select'"
            v-model="queryParams[field.prop]"
            v-bind="injectProps(field)"
            v-on="field.on"
          >
            <el-option
              v-for="opt in injectOptions(field)"
              :key="opt[field.optId] || opt.optId"
              :label="opt[field.optLabel] || opt.optLabel"
              :value="opt[field.optId] || opt.optId"
            />
          </el-select>
          <component
            :is="`el-${field.type || 'input'}`"
            v-else-if="field.type !== 'custom'"
            v-model="queryParams[field.prop]"
            v-bind="injectProps(field)"
            v-on="injectEvent(field)"
          />
          <slot v-else :field="field" :name="`query-${field.prop}`" />
        </el-form-item>
      </el-col>
      <el-col v-bind="actionLayout">
        <el-form-item>
          <div style="text-align: left">
            <el-button
              v-if="showSearchBtn"
              :loading="loading"
              icon="el-icon-search"
              type="primary"
              @click="handleSearch"
            >搜索<span v-show="interval&&!loading">({{ time }}s)</span>
            </el-button>
            <el-button
              v-if="showResetBtn"
              :loading="loading"
              icon="el-icon-refresh"
              style="background-color: #F7F8FA"
              @click="resetQuery"
            >
              重置
            </el-button>
            <el-button
              v-if="queryFields.length > 2&&collapse"
              ctrl=""
              type="text"
              @click="ctrl.isCollapse = !ctrl.isCollapse"
            >{{
              ctrl.isCollapse ? '展开' : '收起'
            }}<i
              :class="ctrl.isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            /></el-button>
          </div>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import Tips from '@/components/Tips'
import { deepClone, } from '@/utils'

export default {
  components: {
    Tips,
  },
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
    isInterval: {
      type: Boolean,
      default: false,
    },
    queryFields: {
      type: Array,
      default: () => [],
      required: true,
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
    showSearchBtn: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showResetBtn: {
      type: Boolean,
      default: true,
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    queryRules: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      defaultLayoutMap: {
        1: { xs: 24, sm: 12, md: 8, lg: 8, xl: 8, },
        2: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, },
        3: { xs: 24, sm: 24, md: 24, lg: 18, xl: 18, },
        4: { xs: 24, sm: 12, md: 24, lg: 24, xl: 24, },
      },
      defaultProps: {
        input: {
          placeholder: '请输入',
          maxLength: 30,
        },
        select: {
          placeholder: '请选择',
        },
        'date-picker': {
          placeholder: '请选择',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          rangeSeparator: '~',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
        },
        cascader: {
          placeholder: '请选择',
        },
      },
      ctrl: {
        isCollapse: true,
        isFocus: false,
      },
      listener: null,
      params: {},
      interval: null,
      time: 30,
    }
  },
  computed: {
    fields() {
      return this.queryFields.filter((field) =>
        field.hasOwnProperty('show') ? (typeof field.show === 'function' ? field.show() : field.show) : true
      )
    },
    actionLayout() {
      const layouts = this.fields
        .slice(0, this.ctrl.isCollapse ? 3 : this.fields.length)
        .map((field) => field.layout || this.defaultLayoutMap[field.span || 1])
      const layout = {
        xs: { span: 24, offset: 0, },
        sm: { span: 12, offset: 0, },
        md: { span: 6, offset: 0, },
        lg: { span: 6, offset: 0, },
        xl: { span: 6, offset: 0, },
      }
      /*   layouts.forEach(({ xs, sm, md, lg, xl }) => {
           layout.xs.offset += xs
           layout.sm.offset += sm
           layout.md.offset += md
           layout.lg.offset += lg
           layout.xl.offset += xl
         })
         Object.keys(layout).forEach((key) => {
           const l = layout[key]
           layout[key].offset = 24 - (l.span + (l.offset % 24))
         })*/
      return layout
    },
    rules() {
      const rules = this.fields
        .filter((field) => field.required)
        .reduce((prev, curr) => {
          const { props = {}, prop, type, label, message, } = curr
          const defaultPlaceholder = this.defaultProps[type]
            ? `${this.defaultProps[type].placeholder || ''}${label || ''}`
            : ''
          return { ...prev, [prop]: { required: true, message: message || props.placeholder || defaultPlaceholder, }, }
        }, {})
      return rules
    },
  },
  mounted() {
    this.params = deepClone(this.queryParams)
    this.resetInterval()
  },
  created() {
    document.addEventListener('keyup', this.enterToSearch)
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  },
  destroyed() {
    document.removeEventListener('keyup', this.enterToSearch)
  },
  methods: {
    resetInterval() {
      if (!this.isInterval) { return }
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
        this.time = 30
      }
      this.interval = setInterval(() => {
        if (this.loading) { return }
        this.time -= 1
        if (this.time <= 0) {
          this.$emit('refresh')
          this.time = 30
        }
      }, 1000)
    },
    injectOptions(field) {
      return (typeof field.opt === 'function' ? field.opt() : this.opts[field.opt]) || this.opts[field.prop] || []
    },
    enterToSearch(e) {
      e.keyCode === 13 && this.ctrl.isFocus && this.$emit('search')
    },
    removeDateRangeQuery() {
      this.queryFields
        .filter((item) => item.type == 'date-picker' && item.props.type == 'daterange')
        .forEach((item) => {
          item.on && item.on.change([])
        })
    },
    async resetQuery() {
      Object.keys(this.queryParams).forEach((k) => {
        if (this.params.hasOwnProperty(k)) {
          this.$set(this.queryParams, k, this.params[k])
        } else {
          this.$set(this.queryParams, k, undefined)
        }
      })
      this.removeDateRangeQuery()
      this.resetInterval()
      this.$emit('reset')
      this.$emit('search')
    },
    handleSearch() {
      this.$refs.queryForm.validate((valid) => {
        if (!valid) return
        this.resetInterval()
        this.$emit('search')
      })
    },
    getDefaultPlaceholder(fidld) {
      const { type = 'input', label, } = fidld
      const defaultPlaceholder = this.defaultProps[type]
        ? `${this.defaultProps[type].placeholder || ''}${label || ''}`
        : ''
      return defaultPlaceholder
    },
    injectProps(field) {
      const { props = {}, type = 'input', } = field
      const newProps = { ...this.defaultProps[type], ...props, }
      Object.keys(newProps).forEach((key) => typeof newProps[key] === 'function' && (newProps[key] = newProps[key]()))
      return {
        ...newProps,
        placeholder: props.placeholder || this.getDefaultPlaceholder(field),
      }
    },
    injectEvent(field) {
      const { on = {}, } = field
      const blur = () => {
        this.ctrl.isFocus = false
      }
      const focus = () => {
        this.ctrl.isFocus = true
      }
      return { blur, focus, ...on, }
    },
  },
}
</script>

<style lang="scss" scoped>
.query-form {
  position: relative;
  display: flex;
}
</style>
