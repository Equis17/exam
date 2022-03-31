<template>
  <div class="transBox">
    <div class="header">
      <div class="title"> 您当前所在位置：基本服务 >> 企业单笔付款 >> 单笔付款录入</div>
    </div>
    <v-form :fields="payFields" :label-width="160" title="付款人信息">
      <template #field-name>
        北京加旺电器有限公司
      </template>
      <template #field-account>
        <select>
          <option value="">1296023347888525312|北京加旺电器有限公司</option>
        </select>
        <button class="balanceBtn" @click="queryBalance">查询余额</button>
      </template>
      <template #field-payAccount>
        <div v-if="state.balance.account">{{
            state.balance.account
          }}<span style="padding-left: 12px;">余额：{{ state.balance.balance }}</span>元
        </div>
      </template>
    </v-form>
    <v-form :fields="getFields" :label-width="160" title="收款人信息">
      <template #field-getType>
        <div class="radioGroup">
          <input :checked="state.checkType==1" :value="1" class="dib" type="radio" @select="state.checkType=1">
          <div class="dib">交通银行</div>
          <input :checked="state.checkType==2" :value="2" class="dib" type="radio" @select="state.checkType=2">
          <div class="dib">其他银行</div>
        </div>
      </template>
      <template #field-sendType>
        <div class="radioGroup">
          <input :checked="state.immediate==1" :value="1" class="dib" type="radio" @select="state.immediate=1">
          <div class="dib">实时</div>
          <input :checked="state.immediate==2" :value="2" class="dib" type="radio" @select="state.immediate=2">
          <div class="dib">预约(延迟)</div>
        </div>
      </template>
      <template #field-desc>
        <div class="desc">
          请输入收款方账号并选择相应的账户类型后，点击“查询户名”即可显示收款方户名。完成授权审批后
          立即发起资金汇划。
        </div>
      </template>
      <template #field-getAccountType>
        <div class="radioGroup">
          <input
            :checked="form.accountType=='企业账户'"
            class="dib"
            type="radio"
            value="企业账户"
            @select="form.accountType='企业账户'"
          >
          <div class="dib">企业账户</div>
          <input
            :checked="form.accountType=='个人账户'"
            class="dib"
            type="radio"
            value="个人账户"
            @select="form.accountType='个人账户'"
          >
          <div class="dib">个人账户</div>
        </div>
      </template>
      <template #field-account>
        <input v-model="form.accountNum">
        <button class="balanceBtn" @click="queryAccount">查询户名</button>
      </template>
      <template #field-accountShow>
        {{ state.accountShow }}

      </template>
      <template #field-accountName>
        <input v-model="form.accountName">
      </template>
    </v-form>

    <v-form :fields="detailFields" :label-width="160" title="款项信息">
      <template #field-amount>
        <input v-model="form.amount" min="0" style="margin-right: 12px" type="number" @change="toUpper">
        <span class="desc">单笔限额：9999999.99元，日累计限额：9999999.99元</span>
      </template>
      <template #field-upper>
        {{ state.upper }}
      </template>
      <template #field-remark>
        <select v-model="form.abstractType">
          <option value="入">手工录入</option>
        </select>
        <input v-model="form.abstractContent">
      </template>
      <template #field-no><input></template>
      <template #field-message><input></template>
    </v-form>
    <div class="btnGroup">
      <button class="btn" @click="submit">确定</button>
      <button class="btn" @click="reset">重置</button>
      <button class="btn">最后一次付款信息</button>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import VForm from '@/components/VForm'
import { getTitle, getToken } from '@/utils/auth'

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
      payFields: [
        { label: '付款户名', prop: 'name', required: true },
        { label: '付款账号', prop: 'account', required: true },
        { label: '付款户名', prop: 'payAccount' },
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
        abstractType: '入',
        accountType: '企业账户',
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
    }
  },
  methods: {
    reset() {
      this.form = {
        abstractType: '入',
        accountType: '企业账户',
      }
      this.state = {
        upper: '',
        accountShow: '',
        checkType: 1,
        immediate: 1,
        balance: {
          account: '',
          balance: '',
        },
      }
    },
    async submit() {
      const needValidateField = [
        'accountType',
        'accountNum',
        'accountName',
        'amount',
        'abstractType',
        'abstractContent',
      ]
      const needValidate = needValidateField.every(item => this.form[item])
      if (!needValidate) {
        this.$message.error('请填写完整信息')
        return
      } else {
        await Api.studentAnswer.singlePay({ ...this.form, titleId: this.titleId, userId: this.userId })
        this.$message.success('提交成功')
        this.reset()
      }
    },
    toUpper() {
      if (this.form.amount < 0) {
        this.$set(this.form, 'amount', 0)
      }
      this.state.upper = this.Nzh(this.form.amount || 0)
    },
    Nzh(amount) {
      return Nzh.encodeB(amount)
    },
    queryBalance() {
      this.state.balance = {
        account: '1296023347888525312|北京加旺电器有限公司',
        balance: '9999999.99',
      }
    },
    queryAccount() {
      this.state.accountShow = `${this.form.accountNum || ''} ${this.form.accountName || ''}`
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
    margin-right: 12px;
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
</style>
