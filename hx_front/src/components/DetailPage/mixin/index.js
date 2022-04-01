const setClassName = (el, layout) => {
  const { xs, sm, md, lg, xl, } = layout
  el.className = `el-col el-col-24 el-col-xs-${xs} el-col-sm-${sm} el-col-md-${md} el-col-lg-${lg} el-col-xl-${xl}`
}
const setStyle = (el, { marginLeft, marginRight, }) => {
  el.style.marginLeft = marginLeft
  el.style.marginRight = marginRight
}
export default {
  data() {
    return {
      detailLoading: false,
      detailPageFormLayout: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12, }, // 搜索栏栅格
      detailPageFormLayoutStyle: {
        marginLeft: '-94px',
        marginRight: '-94px',
      },
    }
  },
  directives: {
    formLayout: {
      update(_, binding, vNode) {
        const { value, } = binding
        const { context, } = vNode
        vNode.componentInstance.$children.forEach(child => {
          let layoutObj
          if (!value) {
            layoutObj = {
              ...context.detailPageFormLayout,
              ...child.$options.propsData,
            }
          } else {
            layoutObj = {
              ...context.detailPageFormLayout,
              ...value,
              ...child.$options.propsData,
            }
          }
          setStyle(vNode.elm, context.detailPageFormLayoutStyle)
          if (child.$options.propsData.hasOwnProperty('span')) return
          setClassName(child.$el, layoutObj)
        })
      },
      inserted(_, binding, vNode) {
        const { value, } = binding
        const { context, } = vNode
        vNode.componentInstance.$children.forEach(child => {
          let layoutObj
          if (!value) {
            layoutObj = {
              ...context.detailPageFormLayout,
              ...child.$options.propsData,
            }
          } else {
            layoutObj = {
              ...context.detailPageFormLayout,
              ...value,
              ...child.$options.propsData,
            }
          }
          setStyle(vNode.elm, context.detailPageFormLayoutStyle)
          if (child.$options.propsData.hasOwnProperty('span')) return
          setClassName(child.$el, layoutObj)
        })
      },
    },
  },
  methods: {
    setDetailLoading(bool = true) {
      this.detailLoading = bool
      // const dom = document.getElementById('listPage')
      // if (!dom) return
      // scrollTo(0, 800)
      // dom.style.overflowY = bool ? 'hidden' : 'auto'
    },
  },
}
