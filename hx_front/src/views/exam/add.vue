<template>
  <detail-page hide-btns class="detail" @click.native="handleBlur()">
    <div class="buttons">
      <el-button type="default" @click="save" icon="el-icon-plus" plain>保存</el-button>
    </div>
    <el-form ref="form" :model="form">
      <div class="formBox">
        <el-form-item class="item" prop="examType">
          <el-select v-model="form.examType">
            <el-option v-for="item in opts.examType" :key="item.optId" :label="item.optLabel" :value="item.optId" />
          </el-select>
        </el-form-item>
        <el-form-item class="item" prop="id">
          <el-input style="width: 80px;" v-model="form.businessId" />
          号
        </el-form-item>
        <el-form-item class="item" :rules="{required:true,message:'请完善必填项'}" prop="examTime">
          日期：
          <el-date-picker style="width: 150px;" v-model="form.examTime" type="date" value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item
          style="flex:1;text-align: right"
          class="item"
          :rules="{required:true,message:'请完善必填项'}"
          prop="attachment"
        >
          附单据
          <el-input-number
            class="attachment"
            style="width: 150px;"
            v-model="form.attachment"
            :controls="false"
            :precision="0"
            :min="0"
          ></el-input-number>
          张
        </el-form-item>
      </div>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item prop="detailDtos">
            <el-table
              :span-method="spanMethod"
              @click.native.stop="()=>{}"
              :data="tableList"
              style="width: 100%"
            >
              <el-table-column header-align="center" class-name="columnContent" label="摘要" width="160">
                <template slot-scope="{row,$index}">
                  <div
                    :class="row.isSummary?`summaryContent`:'content'"
                    v-if="!row.showRemark"
                    @click="handleShow(row,4)"
                  >
                    <div class="sumText" v-if="row.isSummary">合计{{ Nzh(total.borrowAmount) }}</div>
                    <div class="text" v-else>{{ row.remark }}</div>
                  </div>
                  <div class="content" v-else>
                    <el-input
                      ref="input"
                      class="textInput"
                      v-model="row.remark"
                      placeholder="请输入摘要"
                      @blur="handleBlur()"
                      @keypress.native.enter="keypressEnter(0,row,$index)"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                class-name="columnContent"
                prop="subjectName"
                label="会计科目"
                width="230"
              >
                <template slot-scope="{row,$index}">
                  <div class="content" v-if="!row.showSubjectName" @click="handleShow(row,3)">
                    <div class="text">{{ row.subjectName }}</div>
                  </div>
                  <div class="content" v-else>
                    <el-input
                      ref="input"
                      class="textInput"
                      v-model="row.subjectName"
                      placeholder="请输入科目名称"
                      @blur="handleBlur()"
                      @keypress.native.enter="keypressEnter(1,row,$index)"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="address" label="借方金额">
                <el-table-column class-name="columnContent" label-class-name="customLabel">
                  <template #header>
                    <div class="header">
                      <span class="labelItem">亿</span>
                      <span class="labelItem">千</span>
                      <span class="labelItem blue">百</span>
                      <span class="labelItem">十</span>
                      <span class="labelItem">万</span>
                      <span class="labelItem blue">千</span>
                      <span class="labelItem">百</span>
                      <span class="labelItem">十</span>
                      <span class="labelItem red">元</span>
                      <span class="labelItem">角</span>
                      <span class="labelItem">分</span>
                    </div>
                  </template>
                  <template slot-scope="{row,$index}">
                    <div class="contentWrap" v-if="!row.showBorrow" @click="handleShow(row,1)">
                      <div class="content" v-if="row.subjectType==1||row.isSummary">
                        <span
                          :class="{blue:index===2||index===5,red:index===8}"
                          v-for="(item,index) in getText(row.isSummary?total.borrowAmount:row.answerResult)"
                          class="labelItem"
                        >{{ item }}</span></div>
                      <div class="content" v-else><span
                        :class="{blue:index===2||index===5,red:index===8}"
                        v-for="(item,index) in getText(0)"
                        class="labelItem"
                      >{{ item }}</span>
                      </div>
                    </div>
                    <div class="contentWrap" v-else>
                      <div class="content">
                        <el-input-number
                          @keypress.native.enter="keypressEnter(2,row,$index)"
                          ref="input"
                          class="numberInput"
                          :max="999999999.99"
                          :precision="2"
                          :controls="false"
                          @blur="handleBlur(row,1)"
                          v-model="row._answerResult"
                        />
                      </div>
                    </div>
                  </template>
                </el-table-column>

              </el-table-column>
              <el-table-column header-align="center" prop="loan" label="贷方金额">
                <el-table-column class-name="columnContent" label-class-name="customLabel">
                  <template #header>
                    <div class="header">
                      <span class="labelItem">亿</span>
                      <span class="labelItem">千</span>
                      <span class="labelItem blue">百</span>
                      <span class="labelItem">十</span>
                      <span class="labelItem">万</span>
                      <span class="labelItem blue">千</span>
                      <span class="labelItem">百</span>
                      <span class="labelItem">十</span>
                      <span class="labelItem red">元</span>
                      <span class="labelItem">角</span>
                      <span class="labelItem">分</span>
                    </div>
                  </template>
                  <template slot-scope="{row,$index}">
                    <div class="contentWrap" v-if="!row.showLoan" @click="handleShow(row,2)">
                      <div class="content" v-if="row.subjectType==2||row.isSummary">
                <span
                  :class="{blue:index===2||index===5,red:index===8}"
                  v-for="(item,index) in getText(row.isSummary?total.loanAmount:row.answerResult)"
                  class="labelItem"
                >{{ item }}</span>
                      </div>
                      <div class="content" v-else>
                <span
                  :class="{blue:index===2||index===5,red:index===8}"
                  v-for="(item,index) in getText(0)"
                  class="labelItem"
                >{{ item }}</span>
                      </div>
                    </div>
                    <div class="contentWrap" v-else>
                      <div class="content">
                        <el-input-number
                          @keypress.native.enter="keypressEnter(3,row,$index)"
                          ref="input"
                          class="numberInput"
                          :max="999999999.99"
                          :precision="2"
                          :controls="false"
                          @blur="handleBlur(row,2)"
                          v-model="row._answerResult"
                        />
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column header-align="center" align="center" label="操作" width="200">
                <template slot-scope="{row,$index}">
                  <div v-if="!row.isSummary">
                    <el-button type="text" @click="insertOne($index)">插入一行</el-button>
                    <el-button type="text" v-if="$index!==0" @click="del($index)">删除</el-button>
                    <el-button type="text" v-if="$index!==0" @click="moveUp($index)">上移</el-button>
                    <el-button type="text" v-if="$index!==(form.detailDtos.length-1)" @click="moveDown($index)">下移
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          制表人:{{ getToken() }}
        </el-col>
      </el-row>
    </el-form>

  </detail-page>
</template>

<script>
import api from '@/api'
import detailPage from '@/components/DetailPage'
import { getTitle, getToken } from '@/utils/auth'
import Nzh from 'Nzh'

export default {
  name: 'add',
  components: {
    detailPage,
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
      form: {
        businessId: '',
        examTime: '',
        examType: 0,
        detailDtos: [
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
        ],
      },
    }
  },
  mounted() {
    this.getNextId()
  },
  computed: {
    total() {
      const borrowAmount = this.form.detailDtos.reduce((ret, curVal) => {
        ret += curVal.subjectType == 1 ? curVal.answerResult : 0
        return ret
      }, 0)
      const loanAmount = this.form.detailDtos.reduce((ret, curVal) => {
        ret += curVal.subjectType == 2 ? curVal.answerResult : 0
        return ret
      }, 0)
      return {
        total: (Math.round((borrowAmount + loanAmount) * 100) / 100),
        borrowAmount: (Math.round((borrowAmount) * 100) / 100),
        loanAmount: (Math.round((loanAmount) * 100) / 100),
      }
    },
    tableList() {
      return [...this.form.detailDtos, { isSummary: true }]
    },
    titleId() {
      return getTitle()
    },
    userId() {
      return getToken()
    },
  },
  methods: {
    getToken,
    async getNextId() {
      const res = await api.studentAnswer.getNextId({ studentId: this.userId })
      this.form.businessId = res.data
    },
    Nzh(amount) {
      return Nzh.encodeB(amount)
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == (this.form.detailDtos.length)) {
        if (columnIndex == 0) {
          return {
            colspan: 2,
            rowspan: 1,
          }
        } else if (columnIndex == 1) {
          return {
            colspan: 0,
            rowspan: 0,
          }
        } else {
          return {
            colspan: 1,
            rowspan: 1,
          }
        }
      } else {
        return {
          colspan: 1,
          rowspan: 1,
        }
      }
    },
    async save() {
      if (!this.form.examTime) {
        this.$notify.error('请填写日期')
        return
      }
      await this.validateDetails()
      await this.addExam()
      await this.resetForm()
    },
    async resetForm() {
      this.form = {
        examTime: '',
        examType: 0,
        detailDtos: [
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
          { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
        ],
        businessId: '',
      }
      await this.$nextTick()
      this.$refs.form.clearValidate()
      await this.getNextId()
    },
    async validateDetails() {
      return new Promise((res, rej) => {
        const bool = this.form.detailDtos.every(item => {
          const { subjectName, remark, answerResult, subjectType } = item
          return (subjectName && remark && answerResult && subjectType) || (!subjectName && !remark && !answerResult && !subjectType)
        })
        const length = this.form.detailDtos.filter(({
          subjectName,
          remark,
          answerResult,
          subjectType,
        }) => subjectName && remark && answerResult && subjectType).length
        if (!bool || !length) {
          this.$notify.error('请完善信息')
          rej()
          return
        } else {
        }
        res()
      })
    },
    async addExam() {
      await api.studentAnswer.submitAnswer({
        ...this.form,
        studentId: this.userId,
        titleId: this.titleId,
        detailDtos: this.form.detailDtos.filter(({
          subjectName,
          remark,
          answerResult,
          subjectType,
        }) => subjectName && remark && answerResult && subjectType).map((i, idx) => ({
          ...i,
          answerResult: i.answerResult.toFixed(2),
          sort: idx + 1,
        })),
      })
      await this.$notify.success('保存成功')
    },
    insertOne(idx = -1) {
      this.form.detailDtos.splice(
        idx + 1,
        0,
        { showBorrow: false, showLoan: false, showSubjectName: false, showRemark: false },
      )
    },
    del(idx) {
      this.form.detailDtos.splice(idx, 1)
    },
    moveUp(idx) {
      const item = this.form.detailDtos.splice(idx, 1)
      this.form.detailDtos.splice(idx - 1, 0, item[0])
    },
    moveDown(idx) {
      const item = this.form.detailDtos.splice(idx, 1)
      this.form.detailDtos.splice(idx + 1, 0, item[0])
    },
    async keypressEnter(triggeredIdx, row, idx) {
      let currentTriggeredIdx = triggeredIdx
      const orderTriggers = [4, 3, 1, 2]
      if ([1, 2].includes(currentTriggeredIdx)) {
        this.handleBlur(row, orderTriggers[currentTriggeredIdx])
      } else {
        this.handleBlur()
      }
      await this.$nextTick()
      if (currentTriggeredIdx === (orderTriggers.length - 1) && idx === (this.form.detailDtos.length - 1)) {return}
      if (currentTriggeredIdx === (orderTriggers.length - 1)) {
        currentTriggeredIdx = 0
        await this.show(this.form.detailDtos[idx + 1], orderTriggers[currentTriggeredIdx])
      } else {
        currentTriggeredIdx = currentTriggeredIdx + 1
        await this.show(row, orderTriggers[currentTriggeredIdx])
      }
    },
    async show(row, subjectType) {
      switch (subjectType) {
        case 1:
          this.$set(row, 'showBorrow', true)
          break
        case 2:
          this.$set(row, 'showLoan', true)
          break
        case 3:
          this.$set(row, 'showSubjectName', true)
          break
        case 4:
          this.$set(row, 'showRemark', true)
          break
      }
      await this.$nextTick()
      this.$refs.input.focus()
    },
    handleShow(row, subjectType) {
      this.handleBlur()
      if (row.isSummary) {return}
      this.show(row, subjectType)
    },
    handleBlur(info, type) {
      if (info && info._answerResult) {
        this.$set(info, 'subjectType', type)
        this.$set(info, 'answerResult', info._answerResult)
        info._answerResult = ''
      }
      this.form.detailDtos.forEach(row => {
        row.showBorrow = false
        row.showLoan = false
        row.showSubjectName = false
        row.showRemark = false
      })
    },
    getText(amount = 0) {
      if (!amount) {
        return new Array(11).fill(undefined).map((_) => '')
      }
      return amount.toFixed(2).replace(/\./, '').padStart(11, ' ').split('')
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-table__footer-wrapper {
  tbody tr:nth-child(1) {
    .cell {
      text-align: center;
    }
  }
}

.detail {
  height: 100%;
}

.buttons {
  margin-bottom: 12px;
}

::v-deep .numberInput {
  input {
    text-align: right;
  }
}

::v-deep .el-table {
  .columnContent {
    padding: 0 !important;

    .cell {
      padding: 0;
      height: 100%;
    }

    .contentWrap {
      width: 100%;
    }

    .summaryContent {
      text-align: left;
      padding-left: 12px;
    }

    .content {
      height: inherit;
      justify-content: center;
      width: 100%;
      display: flex;

      .text {
        height: 40px;
        line-height: 40px;
      }

      .textInput {
        input {
          text-align: center;
        }
      }

      .labelItem {
        height: 40px;
        text-align: center;
        padding: 6px 0;
        flex: 1;
        border-right: 1px solid #CCC;
        font-weight: bold;
        color: #000;
        line-height: 25px;

        &.blue {
          border-right: 1px solid #3A71A8;
        }

        &.red {
          border-right: 1px solid #DD5252;
        }

      }
    }
  }


  .customLabel {
    background-color: #FFF;
    width: 100%;
    padding: 0 !important;

    .header {
      justify-content: center;
      width: 100%;
      display: flex;

      .labelItem {
        text-align: center;
        padding: 6px 0;
        flex: 1;
        border-right: 1px solid #CCC;

        &.blue {
          border-right: 1px solid #3A71A8;
        }

        &.red {
          border-right: 1px solid #DD5252;
        }

      }
    }


  }
}

::v-deep .attachment {
  .el-form-item__error {
    right: 100px;
  }
}

.formBox {
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  gap: 12px;

  .item {

  }
}
</style>
