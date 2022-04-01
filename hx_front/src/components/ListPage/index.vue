<template>
  <div
    id="listPage"
    :class="{ hasPagination: $slots.pagination }"
    class="list-page"
  >
    <div class="header">
      <div v-if="showTab" class="tab">
        <el-button
          v-for="tabItem in tabs"
          :key="tabItem.id"
          :type="queryParams[tabKey]==tabItem.id?'primary':'default'"
          round
          size="mini"
          @click="()=>{$set(queryParams,tabKey,tabItem.id);$emit('tabChange');$emit('search')}"
        >{{ tabItem.name }}
        </el-button>
      </div>
    </div>
    <div v-if="$slots.headerInfo" class="header-info">
      <slot name="headerInfo" />
    </div>
    <div
      :class="{hasQuery:$slots.query||queryFields.length,hideBg:hideBg,hidePagination:true}"
      :style="`height: calc(100vh - ${tableHeight||((buttons.length||$slots.buttons||showTab)?200:150)}px) !important;`"
      class="list-page-content"
    >
      <div v-if="title&&showTitle" class="title">
        {{ title }}
      </div>
      <div v-else-if="routerTitle&&showTitle" class="title">
        {{ routerTitle }}
      </div>
      <div v-if="$slots.buttons" :class="{block:!showTab}" class="buttons">
        <slot name="buttons" />
      </div>
      <div v-else-if="buttons.length" :class="{block:!showTab}" class="buttons">
        <buttons :buttons="buttons">
          <template v-for="key in customButtons" :slot="`button-${key.prop}`" slot-scope="{ btn }">
            <slot :btn="btn" :name="`button-${key.prop}`" />
          </template>
        </buttons>
      </div>
      <div v-if="$slots.query" class="queryForm">
        <slot name="query" />
      </div>
      <div v-else-if="queryFields.length" class="queryForm">
        <query
          :collapse="collapse"
          :is-interval="isInterval"
          :loading="tableLoading"
          :opts="opts"
          :query-fields="queryFields"
          :query-params="queryParams"
          :query-rules="queryRules"
          :show-reset-btn="showQueryResetBtn"
          @refresh="$emit('refresh')"
          @reset="$emit('reset')"
          @search="$emit('search')"
        >
          <template v-for="key in customFields" :slot="`query-${key.prop}`" slot-scope="{ field }">
            <slot :field="field" :name="`query-${key.prop}`" />
          </template>
        </query>
      </div>
      <div v-if="!tableColumns.length&&$slots.tableHeader" class="tableHeader">
        <slot name="tableHeader" />
      </div>
      <div v-if="$slots.table" class="tableList">
        <slot name="table" />
      </div>
      <div v-else-if="tableColumns.length">
        <div v-if="$slots.tableHeader" class="tableHeader">
          <slot name="tableHeader" />
        </div>
        <list-table
          :columns="tableColumns"
          :data="tableData"
          :loading="tableLoading"
          :opts="opts"
          :pagination="pagination"
          :props="tableProps"
          @selectionChange="$emit('selectionChange', $event)"
        >
          <template v-for="key in customColumns" :slot="`column-${key.prop}`" slot-scope="{ row }">
            <slot :name="`column-${key.prop}`" :row="row" />
          </template>
          <template slot="table-action" slot-scope="{ row }">
            <slot :row="row" name="table-action" />
          </template>
        </list-table>
      </div>
      <div v-if="$slots.pagination" class="pagination">
        <slot name="pagination" />
      </div>
      <div v-else-if="pagination.pageNum" class="pagination">
        <pagination
          v-show="pagination.count > 0"
          :limit="pagination.pageSize"
          :page="pagination.pageNum"
          :total="pagination.count"
          @pagination="pagination.pagination"
          @update:page="queryParams.pageNum = $event"
          @update:limit="queryParams.pageSize = $event"
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import Buttons from '@/components/Buttons'
import ListTable from '@/components/ListTable'
import Query from '@/components/Query'

export default {
  name: 'Index',
  components: {
    Query,
    ListTable,
    Buttons,
  },
  props: {
    showQueryResetBtn: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
      default: true,
    },
    hideBg: {
      type: Boolean,
      default: false,
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
    queryFields: {
      type: Array,
      default: () => [],
    },
    tableHeight: {
      type: Number,
      default: 0,
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    showTab: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    queryRules: {
      type: Object,
      default: () => ({}),
    },
    tab: {
      type: Array,
      default: () => [],
    },
    tabKey: {
      type: String,
      default: 'zone',
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    isInterval: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tabs: [],
    }
  },
  computed: {
    lang() {
      return localStorage.getItem('locale') || 'zh'
    },
    routerTitle() {
      const { meta, } = this.$route
      if (meta) {
        const title = this.lang === 'en' ? meta.englishTitle : meta.title
        return title || ''
      } else {
        return ''
      }
    },
    customButtons() {
      return this.buttons.filter((item) => item.type === 'custom')
    },
    customFields() {
      return this.queryFields.filter((item) => item.type === 'custom')
    },
    customColumns() {
      return this.tableColumns.filter((item) => item.type === 'custom')
    },
  },
}
</script>
<style lang="scss" scoped>
.list-page {
  position: relative;
  margin-top: 18px;
}

.buttons {
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  &.block {
    float: none;
    margin-bottom: 20px;
    text-align: right;
  }
}

.tab {
  margin-bottom: 20px;
}

.list-page-content {
  overflow-y: auto;
  margin: 0 14px;
  padding: 24px 30px 100px;
  background-color: #FFF;
  box-shadow: 0px 2px 16px 0px #DCDEE9;

  > .title {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    float: left;
    margin-top: 24px;
    margin-left: 24px;
  }

  &.static {
    overflow-y: visible;
  }

  &.hidePagination {
    padding: 0 !important;
  }

  &.hideBg {
    background-color: transparent;
    box-shadow: none;
  }

  .pagination {
    position: absolute;
    z-index: 999;
    right: 48px;
    bottom: 48px;
    height: 100px;
    background-color: #FFF;
  }
}
</style>
