import { scrollTo, } from '@/utils/scroll-to'

const setClassName = (el, layout) => {
  const { xs, sm, md, lg, xl, } = layout
  el.className = `el-col el-col-24 el-col-xs-${xs} el-col-sm-${sm} el-col-md-${md} el-col-lg-${lg} el-col-xl-${xl}`
}
export default {
  data() {
    return {
      listLoading: false,
      listPageQueryFormLayout: { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, }, // 搜索栏栅格
      actionColumnParams: {
        'label': '操作',
        'header-align': 'left',
        'class-name': 'table-operation-column',
        'align': 'left',
        'fixed': 'right',
        'show-overflow-tooltip': false,
      },
    }
  },
  directives: {
    queryLayout: {
      inserted(_, binding, vNode) {
        const { value, } = binding
        const { context, } = vNode
        vNode.componentInstance.$children.forEach(child => {
          let layoutObj
          if (!value) {
            layoutObj = {
              ...context.listPageQueryFormLayout,
              ...child.$options.propsData,
            }
          } else {
            layoutObj = {
              ...context.listPageQueryFormLayout,
              ...value,
              ...child.$options.propsData,
            }
          }
          setClassName(child.$el, layoutObj)
        })
      },
    },
  },
  methods: {
    resetQuery() {
      this.resetForm()
      this.getList()
    },
    setListLoading(bool = true) {
      this.listLoading = bool
      const dom = document.getElementById('listPage')
      if (!dom) return
      scrollTo(0, 800)
      dom.style.overflowY = bool ? 'hidden' : 'auto'
    },
    cancelRequest() {
      this.$store.commit('request/clearCancelToken')
    },
    // 格式化值
    formatListVal(_, __, val) {
      return [null, undefined, '', ].includes(val) ? '-' : val
    },
    // 格式化数值
    formatListNumber(_, __, val) {
      return typeof val === 'number' ? val : '-'
    },
    // 格式化價格
    formatListPrice(_, __, val) {
      if (val === null || val === undefined) return '-'
      return parseFloat(val).toFixed(2) || '0.00'
    },
  },
}
