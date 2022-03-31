<template>
  <div class="examList">
    <div class="buttons">
      <el-button type="danger" :disabled="!ids.length" @click="handleDel(ids)">删除</el-button>
    </div>
    <el-table
      size="small"
      border
      default-expand-all
      header-row-class-name="mainHeader"
      :data="tableList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column width="50" type="selection" />
      <el-table-column prop="examTime" label="日期" />
      <el-table-column label="凭证字号">
        <template slot-scope="{row}">{{ getOptsLabel(opts.examType, row.examType) || '-' }} - {{ row.businessId }}</template>
      </el-table-column>
      <el-table-column prop="attachment" label="附件" />
      <el-table-column prop="isAudit" label="是否审核" width="100">
        <template slot-scope="{row}">未审核</template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="{row}">
          <el-button type="text" icon="el-icon-delete" @click="handleDel([row.id])">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-table
            size="small"
            :summary-method="summaryMethod"
            stripe
            header-row-class-name="contentHeader"
            :header-row-style="{ backgroundColor:'#F0F0F0' }"
            :data="row.details"
            style="width: 100%"
            show-summary
          >
            <el-table-column prop="remark" label="摘要" width="100" />
            <el-table-column prop="subjectName" label="科目" width="180" />
            <el-table-column label="借方金额">
              <template slot-scope="{row}">
                {{ row.subjectType == 1 ? row.answerResult : '' }}
              </template>
            </el-table-column>
            <el-table-column label="贷方金额">
              <template slot-scope="{row}">
                {{ row.subjectType == 2 ? row.answerResult : '' }}
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      class="paginationBox"
      v-show="pagination.total > 0"
      :limit="pagination.size"
      :page="pagination.current"
      :total="pagination.total"
      @pagination="getList"
    />
  </div>
</template>

<script>
import api from '@/api'
import ListPage from '@/components/ListPage'
import { getToken } from '@/utils/auth'

export default {
  name: 'list',
  components: {
    ListPage,
  },
  data() {
    return {
      opts: {
        examType: [
          { optId: 0, optLabel: '记' },
          { optId: 1, optLabel: '付' },
          { optId: 2, optLabel: '收' },
          { optId: 3, optLabel: '转' },
        ],
      },
      tableList: [],
      pagination: {
        current: 1,
        size: 25,
        total: 0,
      },
      ids: [],
    }
  },
  computed: {
    userId() {
      return getToken()
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    async handleDel(list) {
      await this.$confirm('是否确认删除数据？')
      await api.studentAnswer.deleteByIds(list)
      await this.getList()
    },
    summaryMethod({ columns, data }) {
      const borrowAmount = data.reduce((ret, curVal) => {
        ret += curVal.subjectType == 1 ? (Number(curVal.answerResult) || 0) : 0
        return ret
      }, 0)
      const loanAmount = data.reduce((ret, curVal) => {
        ret += curVal.subjectType == 2 ? (Number(curVal.answerResult) || 0) : 0
        return ret
      }, 0)

      return ['合计', '', (Math.round((borrowAmount) * 100) / 100), (Math.round((loanAmount) * 100) / 100)]
    },
    handleSelectionChange(list) {
      this.ids = list.map(item => item.id)
    },
    async getList() {
      const res = await api.studentAnswer.page({ ...this.pagination, ...{ studentId: this.userId } })
      const { records, total } = res.data || { records: [], total: 0 }
      this.pagination.total = total
      this.tableList = records
    },
  },
}
</script>

<style scoped lang="scss">

.buttons {
  margin-bottom: 12px;
}

::v-deep .mainHeader > th {
  background-color: #F0F0F0 !important;

  .cell {
    color: #909399 !important;
  }
}

::v-deep .el-table__expanded-cell {
  padding-left: 51px;
}

::v-deep .contentHeader th {
  background-color: #E4E9EE !important;

  .cell {
    color: #909399 !important;
  }
}

.examList {
  height: 100%;
  padding-bottom: 100px;
  overflow: auto;

  .paginationBox {
    z-index: 100;
    background-color: #FFF;
    width: 100%;
    border-top: 1px solid #CCC;
    position: fixed;
    bottom: 0;
  }
}

</style>
