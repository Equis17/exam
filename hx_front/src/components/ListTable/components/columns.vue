<template>
  <div>
    <div v-for="(column) in columns" :key="column.prop">
      <el-table-column
        v-if="column.type !== 'columns'"
        v-bind="getColumnProps(column)"
      >
        <template #header>
          <div class="label">
            {{ column.type === 'action' ? '操作' : typeof column.label === 'function' ? column.label() : column.label }}
          </div>
          <!--TODO tips        -->
        </template>
        <template slot-scope="{ row, $index }">
          <table-avatar v-if="column.type === 'avatar'" :src="row[column.prop]" />
          <div v-else-if="column.type === 'link'" class="link-type" @click="handleClickLink(column, row)">
            <div v-if="typeof column.text === 'function'">
              {{ column.text(row) }}
            </div>
            <div v-else>
              <div v-for="content in getContent(column, row)" :key="content.prop">{{ content }}</div>
            </div>
          </div>
          <div v-else-if="column.type==='index'">
            {{ pagination.size * (pagination.current - 1) + $index + 1 }}
          </div>
          <div v-else-if="column.type==='boolean'">
            {{ row[column.prop] ? '是' : '否' }}
          </div>
          <div v-else-if="column.type==='tree'">
            {{ row[column.prop.slice(0, -2)] ? row[column.prop.slice(0, -2)].name : '-' }}
          </div>
          <div v-else-if="column.type === 'file'">
            <file-list v-if="row[column.prop]" :src="row[column.prop]" class="fileList" />
            <span v-else>-</span>
          </div>
          <div v-else-if="column.type === 'img'">
            <table-avatar v-if="row[column.prop]" :src="row[column.prop]" />
          </div>
          <div v-else-if="column.type === 'custom'">
            <slot :name="`column-${column.prop}`" :row="row" />
          </div>
          <div v-else-if="column.type === 'action'">
            <div v-if="column.custom === true">
              <slot :row="row" name="table-action" />
            </div>
            <div v-else>
              <template v-for="button in showBtn(column.default, row)">
                <el-popover
                  v-if="button.type === 'popover'"
                  :key="$index + button.label"
                  ref="pop"
                  placement="top"
                  style="margin-right: 10px"
                  trigger="click"
                >
                  <p class="popover-title">
                    {{ implementLabel(button.tip, row) }}
                  </p>
                  <div class="btn-group">
                    <el-button
                      v-for="(btn, idx) in getPopoverBtns(button.buttons, row)"
                      :key="idx"
                      plain
                      type="primary"
                      @click="btn.click(row)"
                    >
                      {{ implementLabel(btn.label, row) }}
                    </el-button>
                  </div>
                  <el-button slot="reference" type="text" @click="button.click(row)">
                    {{ implementLabel(button.label, row) }}
                  </el-button>
                </el-popover>
                <el-button
                  v-else
                  :key="$index + button.label"
                  type="text"
                  v-bind="button.props||{}"
                  @click="button.click(row)"
                >
                  {{ implementLabel(button.label, row) }}
                </el-button>
              </template>
              <el-dropdown
                v-if="column.more && showBtn(column.more, row).length"
                @command="triggerCommand(column.more, $event, row)"
              >
                <span class="el-dropdown-link">更多<i class="el-icon-arrow-down el-icon--right" /></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="btn in showBtn(column.more, row)"
                    :key="$index + btn.label"
                    :command="btn.label"
                  >
                    {{ implementLabel(btn.label, row) }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <template v-else>
            {{ typeof column.text === 'function' ? column.text(row) : getConnectedStr(...getContent(column, row)) }}
          </template>
        </template>
      </el-table-column>
      <el-table-column v-else :key="column.prop" :label="column.label" v-bind="getColumnProps(column)">
        <columns :opts="opts" :table-columns="column.columns" />
      </el-table-column>
    </div>
  </div>
</template>

<script>
import fileList from '@/components/FileList'
import ListPageMixin from '@/components/ListPage/mixin'
import tableAvatar from '@/components/TableAvatar'
import { deepClone } from '@/utils'

export default {
  name: 'Columns',
  components: {
    fileList,
    tableAvatar,
  },
  mixins: [ListPageMixin],
  props: {
    pagination: {
      type: Object,
      default: () => ({
        size: 10,
        current: 1,
      }),
    },
    hasSelection: {},
    tableColumns: {
      type: Array,
      default: () => [],
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    columns() {
      const columns = deepClone(this.tableColumns)
      if (columns.find((item) => item.type === 'action') && columns.length > 2 && !this.hasSelection) {
        const spliceItem = columns.splice(columns.length - 2, 1)
        return [...spliceItem, ...columns]
      } else {
        const spliceItem = columns.splice(columns.length - 1, 1)
        return [...spliceItem, ...columns]
      }
    },
  },
  methods: {
    getPopoverBtns(btns, row) {
      if (!btns) {
        return []
      } else if (typeof btns === 'function') return btns(row)
      return btns
    },
    implementLabel(label, row) {
      if (!label) {
        return ''
      } else if (typeof label === 'function') return label(row)
      return label
    },
    triggerCommand(more, type, row) {
      const found = more.find((btn) => btn.label === type)
      found && found.click(row)
    },
    getColumnProps({ label, tips, type, ...rest }) {
      if (type === 'action') {
        return {
          ...{
            'label': '操作',
            'class-name': 'table-operation-column',
            'align': 'center',
            'fixed': 'right',
            'show-overflow-tooltip': false,
          }, ...rest,
        }
      } else if (type === 'selection') {
        return { width: 55, type: 'selection', ...rest }
      } else {
        return { align: 'center', ...rest }
      }
    },
    showBtn(arr, row) {
      if (!arr) {
        return []
      }
      return arr.filter((i) => (i.show ? i.show(row) : true))
    },
    getContent(column, row) {
      const props = column.prop.split('|')
      return props
      .map((prop) => {
        const found = this.opts[prop]
        if (found) {
          return this.getOptsLabel(found, row[prop])
        } else {
          return typeof row[prop] == 'number' ? row[prop].toString() : row[prop]
        }
      })
      .filter(Boolean)
    },
    getFile(column, row) {
      const val = row[column.prop]
      if (!val) {
        return []
      }
      return val.split('|')
    },
    handleClickLink(column, row) {
      if (column.link) {
        this.$router.push(typeof column.link === 'function' ? column.link(row) : column.link)
      } else {
        column.click(row)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  font-size: 14px;
  margin-left: 12px;
  cursor: pointer;
  color: #148FFF;
}

.fileList {
  ::v-deep {
    .file-item {
      margin-bottom: 0;
    }
  }
}

.el-icon-arrow-down {
  font-size: 12px;
}

.popover-title {
  font-size: 14px;
  text-align: center;
  color: #666;
}

.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
