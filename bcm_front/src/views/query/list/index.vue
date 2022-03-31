<template>
  <div class="transBox">
    <div class="header">
      <div class="title"> 您当前所在位置：基本服务 >> 网银交易查询 >> 普通查询</div>
    </div>
    <div class="steps">
      <!--v-for steps-->
      <div v-for="(step,index) in steps" :class="{active:index==1}" class="step"><span class="stepWord">{{
          index + 1
        }}</span><span class="content">{{ step }}</span></div>
    </div>
    <v-form :fields="payFields" :label-width="120" :title="'网银交易明细查询条件输入(带 *的为必选或必输项):'">
      <template #field-name>
        <select value="转出">
          <option value="转出">转出</option>
        </select>
      </template>
      <template #field-account>
        <select value="---全部---">
          <option value="---全部---">---全部---</option>
        </select>
      </template>
      <template #field-payAccount>
        <div class="radioGroup">
          <span class="dib">从</span> <input v-model="form.startDate" class="dib" type="date"> <span class="dib">到</span>
          <input
            v-model="form.endDate"
            class="dib"
            type="date"
          >
          <input class="dib" type="radio"><span class="dib">按录入日</span><input
          class="dib"
          type="radio"
        ><span class="dib">按提交银行日</span>
        </div>
      </template>
      <template #field-amount>
        <div class="radioGroup">
          <span class="dib">从</span> <input v-model="form.minAmount" :min="0" class="dib" type="number">
          <span class="dib">到</span> <input
          v-model="form.maxAmount"
          :min="0"
          class="dib"
          type="number"
        ><span class="dib">元</span>
        </div>

      </template>
      <template #field-dealState>
        <select v-model="form.dealState">
          <option value="待查证">待查证</option>
        </select>
      </template>
      <template #field-advanced>
        <input type="checkbox">
      </template>
    </v-form>
    <div class="btnGroup">
      <button class="btn" @click="submitForm">确定</button>
      <button class="btn" @click="reset">重置</button>
    </div>
    <div class="text">
      <div class="tips">提示：</div>
      <div class="desc">
        如果您的企业操作员需开通此项功能，您可先使用有管理权限的企业操作员登录网银，点击“用户账户维护” 为企业操作
        员分配功能，然后换另- -个有管理权限的企业操作员登录网银完成授权即可。
      </div>
    </div>
    <div v-if="tableList.length">
      <div class="box">
        <div class="boxWrap">
          <div class="table">
            <table border="1" cellspacing="0">
              <tr>
                <th>流水号</th>
                <th>付款金额</th>
                <th>收款账号</th>
                <th>收款账户名称</th>
                <th>付款账号</th>
                <th>付款户名</th>
                <th>摘要</th>
                <th>录入日期</th>
                <th>提交日期</th>
                <th width="100">交易状态</th>
                <th width="50">操作</th>
              </tr>
              <tr v-for="item in tableList">
                <th>{{ item.timestamp }}</th>
                <th>{{ item.amount }}</th>
                <th>{{ item.accountNum }}</th>
                <th>{{ item.accountName }}</th>
                <th>1296023347888525312</th>
                <th>北京加旺电器有限公司</th>
                <th>{{ item.abstractContent }}</th>
                <th>{{ item.creationDate }}</th>
                <th>{{ item.creationDate }}</th>
                <th>{{ item.dealState }}</th>
                <th>
                  <span style="color:red;cursor: pointer" @click="handleDelete(item)">删除</span>
                </th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import VForm from '@/components/VForm'
import { getTitle, getToken } from '@/utils/auth'
import dayjs from 'dayjs'

export default {
  name: 'index',
  components: {
    VForm,
  },
  computed: {
    titleId() {
      return getTitle()
    },
    userId() {
      return getToken()
    },
  },
  data() {
    return {
      steps: [
        '查询条件与列表',
        '业务明细',
      ],
      payFields: [
        { label: '转账方向', prop: 'name' },
        { label: '交易账号', prop: 'account' },
        { label: '记账日期', prop: 'payAccount', required: true },
        { label: '交易金额', prop: 'amount' },
        { label: '交易状态', prop: 'dealState' },
        { label: '启用高级查询', prop: 'advanced' },

      ],
      getFields: [
        { label: '收款方所在银行', prop: 'getType', required: true },
        { label: '汇款方式', prop: 'sendType' },
        { label: '特别说明', prop: 'desc' },
        { label: '收款账户类型', prop: 'getAccountType' },
        { label: '收款账号', prop: 'account' },
        { label: '收款账号回显', prop: 'accountShow' },
        { label: '收款户名', prop: 'accountName', required: true },

      ],
      detailFields: [
        { label: '汇款金额', prop: 'amount', required: true },
        { label: '大写金额', prop: 'upper' },
        { label: '摘要', prop: 'remark' },
        { label: '企业业务编号', prop: 'no' },
        { label: '给授信员留言', prop: 'message' },
      ],
      form: {
        dealState: '待查证',
      },
      state: {
        upper: '',
        accountShow: '',
        checkType: 1,
        immediate: 1,
        balance: {
          account: '',
          balance: '',
        },
      },
      tableList: [],
    }
  },
  methods: {
    async handleDelete(item) {
      await this.$confirm('确定删除吗？')
      await Api.studentAnswer.delSinglePay({
        serialsNo: item.serialsNo,
        itemId: this.userId,
        titleId: this.titleId,
      })
      await this.$notify.success('删除成功')
      await this.submitForm()
    },
    reset() {
      this.form = {
        dealState: '待查证',
      }
      this.tableList = []
    },
    async submitForm() {
      const needValidateFields = ['startDate', 'endDate', 'minAmount', 'maxAmount']
      const isValid = needValidateFields.every(field => {
        return this.form[field]
      })
      if (!isValid) {
        this.$message.error('请输入完整的查询条件')
        return
      } else {
        const data = this.getData()
        const res = await Api.studentAnswer.searchSinglePay(data)
        this.tableList = res.data.list
      }
    },
    getData() {
      const data = {
        ...this.form,
        startDate: dayjs(this.form.startDate).format('YYYYMMDD'),
        endDate: dayjs(this.form.endDate).format('YYYYMMDD'),
        userId: this.userId,
        titleId: this.titleId,
        pageNum: 1,
        pageSize: 9999999,
      }
      return data
    },
  },
}
</script>

<style lang="scss" scoped>
.balanceBtn {
  font-size: 14px;
  line-height: 20px;
  margin-left: 12px;
  padding: 4px;
  cursor: pointer;
  color: #FFF;
  border: none;
  outline: none;
  background-color: #3A71A8;

  &:hover {
    background-color: #3A71A8;
  }
}

.radioGroup {
  font-size: 0;

  .dib {
    font-size: 14px;
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
  }
}

.desc {
  font-weight: bold;
  color: rgba(255, 0, 0, 0.86);
}

.btn {
  font-size: 14px;
  width: 130px;
  padding: 4px;
  text-align: center;
  color: #EEE;
  border: 1px solid #1969CC;
  border-radius: 2px;
  background: linear-gradient(180deg, #81AFEA, #377ACE);
  box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.50) inset;
}

.btnGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 12px
}

.steps {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 45px;

  .step {
    position: relative;
    flex: 1;
    text-align: center;
    color: #FFF;
    background-color: #C4DEEF;

    &:first-of-type {
      &:before {
        position: absolute;
        top: 7px;
        right: -16px;
        display: block;
        width: 32px;
        height: 32px;
        content: '';
        transform: rotateZ(-45deg);
        background-color: #C4DEEF;
      }
    }

    &:last-of-type {
      &:before {
        position: absolute;
        top: 7px;
        left: -16px;
        display: block;
        width: 32px;
        height: 32px;
        content: '';
        transform: rotateZ(-45deg);
        background-color: #F2F2F2;
      }
    }

    .stepWord {
      font-size: 40px;
      font-weight: bold;
      font-style: italic;
      vertical-align: middle;
    }

    .content {
      font-size: 16px;
      margin-left: 12px;
      vertical-align: middle;
    }

    &.active {
      background-color: #71BDF0;
    }
  }
}

.text {
  font-size: 16px;
  font-weight: bold;
  padding: 8px 0 8px 24px;

  .tips {
    font-size: 14px;
    font-weight: bold;
    color: #3A71A8;
  }

  .desc {
    font-size: 14px;
    line-height: 24px;
    margin-top: 10px;
    color: #666;
  }
}

.box {
  box-sizing: border-box;
  margin: 24px 16px;
  border: 1px solid #CCC;
  background: linear-gradient(180deg, #FFF, #F2F2F2 120px, #FFF);

  .boxWrap {
    height: 100%;
    margin: 4px;
    border: 1px dotted #CCC;


    .table {
      table {
        width: 100%;
        border-color: #CCC;
      }

      th {
        font-size: 12px;
        font-weight: normal;
        padding: 4px 2px;
      }
    }
  }
}
</style>
