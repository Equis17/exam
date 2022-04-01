<template>
  <div class="tableList">
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      style="width: 100%"
      v-bind="{stripe:true,...tableProps.props}"
      @selection-change="$emit('selectionChange', $event)"
    >
      <div>
        <el-table-column
          v-if="columns.findIndex((i) => i.type === 'selection') > -1"
          align="center"
          fixed="left"
          type="selection"
          v-bind="columns.find((i) => i.type === 'selection') || {}"
          width="55px"
        />
        <columns
          :pagination="pagination"
          :has-selection="columns.findIndex((i) => i.type === 'selection') > -1"
          :opts="opts"
          :table-columns="tableColumns"
        >
          <template v-for="key in customColumns" :slot="`column-${key.prop}`" slot-scope="{ row }">
            <slot :name="`column-${key.prop}`" :row="row" />
          </template>
          <template slot="table-action" slot-scope="{ row }">
            <slot :row="row" name="table-action" />
          </template>
        </columns>
      </div>
    </el-table>
  </div>
</template>

<script>
import ListPageMixin from '@/components/ListPage/mixin'
import columns from '@/components/ListTable/components/columns'

export default {
  name: 'Index',
  components: {
    columns,
  },
  mixins: [ListPageMixin, ],
  props: {
    pagination: {
      type: Object,
      default: () => ({
        size: 10,
        current: 1,
      }),
    },
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    hideAction: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    customColumns() {
      return this.tableColumns.filter((item) => item.type === 'custom')
    },
    tableColumns() {
      return this.columns.filter((i) => i.type !== 'selection')
    },
    tableProps() {
      const { on, ...rest } = this.props
      return {
        props: rest,
        on: on,
      }
    },
  },
  methods: {
    getContent(column, row) {
      const props = column.prop.split('|')
      return props
        .map((prop) => {
          const found = this.opts[prop]
          if (found) {
            return this.getOptsLabel(found, row[prop])
          } else {
            return row[prop]
          }
        })
        .filter(Boolean)
    },
  },
}
</script>

