<template>
  <div class="actionPage">
    <div class="topBox">
      <div class="left">
        <el-select size="large" value="1">
          <el-option label="普通开具" value="1" />
        </el-select>
      </div>
      <div class="right">
        <el-button plain type="primary">红字</el-button>
        <el-button plain type="primary">导入</el-button>
        <el-button plain type="primary">复制</el-button>
        <el-button plain type="primary">暂存</el-button>
        <el-button plain type="primary">预览</el-button>
        <el-button plain type="primary">打印</el-button>
      </div>
    </div>
    <div class="mainContainer">
      <div class="mainBox">
        <div class="mainBoxWrapper">
          <div class="leftCircles">
            <div v-for="item in 8" class="circle"></div>
          </div>
          <div class="rightCircles">
            <div v-for="item in 8" class="circle"></div>
          </div>
          <div class="title">上海增值税普通发票</div>
          <div class="desc">税收分类编码版本号：40.0</div>
          <div class="info">
            <div class="item">
              <div class="label">开票日期</div>
              <div class="value">{{ today }}</div>
            </div>
            <div class="item">
              <div class="label">发票代码：</div>
              <div class="value">031002100104</div>
            </div>
            <div class="item">
              <div class="label">发票号码：</div>
              <div class="value">{{ form.serialNumber }}</div>
            </div>
          </div>
          <div class="invoice">
            <div class="invoiceHeader">
              <div class="label">
                购买方
              </div>
              <div class="content">
                <div class="contentItem">
                  <div class="contentLabel">名称：</div>
                  <div class="contentValue">
                    <input placeholder="请输入名称">
                  </div>
                </div>
                <div class="contentItem">
                  <div class="contentLabel">纳税人识别号：</div>
                  <div class="contentValue">
                    <input placeholder="请输入纳税人识别号">
                  </div>
                </div>
                <div class="contentItem">
                  <div class="contentLabel">地址、电话：</div>
                  <div class="contentValue">
                    <input placeholder="请输入地址、电话">
                  </div>
                </div>
                <div class="contentItem">
                  <div class="contentLabel">开户行及账号：</div>
                  <div class="contentValue">
                    <input placeholder="请输入开户行及账号">
                  </div>
                </div>
              </div>
              <div class="label">
                密码区
              </div>
              <div class="content">

              </div>
            </div>
            <div class="invoiceBody">
              <div class="table">
                <table border="1" cellspacing="0">
                  <tr>
                    <th>税务或应税劳务、服务名称</th>
                    <th>规格型号</th>
                    <th>单位</th>
                    <th>数量</th>
                    <th>单价（不含税）</th>
                    <th>金额（不含税）</th>
                    <th>税率</th>
                    <th>税额</th>
                  </tr>
                  <tr v-for="item in form.cargoList">
                    <th>{{ item.timestamp }}</th>
                    <th>{{ item.amount }}</th>
                    <th>{{ item.accountNum }}</th>
                    <th>{{ item.accountName }}</th>
                    <th>1296023347888525312</th>
                    <th>北京加旺电器有限公司</th>
                    <th>{{ item.abstractContent }}</th>
                    <th>{{ item.creationDate }}</th>
                  </tr>
                </table>
              </div>
            </div>
            <!--TODO-->
            <div class="invoiceSum"></div>
            <div class="invoiceFooter">
              <div class="invoiceHeader">
                <div class="label">
                  销售方
                </div>
                <div class="content">
                  <div class="contentItem">
                    <div class="contentLabel">名称：</div>
                    <div class="contentValue">
                      <input placeholder="请输入名称">
                    </div>
                  </div>
                  <div class="contentItem">
                    <div class="contentLabel">纳税人识别号：</div>
                    <div class="contentValue">
                      <input placeholder="请输入纳税人识别号">
                    </div>
                  </div>
                  <div class="contentItem">
                    <div class="contentLabel">地址、电话：</div>
                    <div class="contentValue">
                      <input placeholder="请输入地址、电话">
                    </div>
                  </div>
                  <div class="contentItem">
                    <div class="contentLabel">开户行及账号：</div>
                    <div class="contentValue">
                      <input placeholder="请输入开户行及账号">
                    </div>
                  </div>
                </div>
                <div class="label">
                  备注
                </div>
                <div class="content">
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div class="rightBoxWrap">
          <el-button plain type="primary">增行</el-button>
          <el-button plain type="primary">减行</el-button>
          <el-button plain type="primary">插行</el-button>
          <el-button plain type="primary">折扣</el-button>
          <el-button plain type="primary">不含税</el-button>
          <el-button plain type="primary">清单</el-button>
          <el-button plain type="primary">客户清单</el-button>
          <el-button plain type="primary">保存客户</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api'
import dayjs from 'dayjs'

export default {
  name: 'action',
  computed: {
    today() {
      return dayjs().format('YYYY年MM月DD日')
    },
  },
  data() {
    return {
      form: {
        serialNumber: '',
        cargoList: [{}],
      },
    }
  },
  methods: {
    async getSerialNumber() {
      const res = await Api.getSerialNumber()
      this.form.serialNumber = res.data
    },
  },
}
</script>

<style lang="scss" scoped>
.actionPage {
  height: 100%;
  padding: 24px;
  background-color: #EEE3EE;

  .topBox {
    display: flex;
    justify-content: space-between;
  }

  .mainContainer {
    display: flex;
    height: 100%;
    margin-top: 10px;
    gap: 20px;

    .mainBox {
      flex: 1;
      background-color: #FFF;

      .mainBoxWrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0px 55px 0 55px;

        .circle {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: aliceblue;
        }

        .leftCircles {
          position: absolute;
          top: 40px;
          left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .rightCircles {
          position: absolute;
          top: 40px;
          right: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
      }
    }

    .rightBox {
      align-content: center;
      justify-content: center;
      width: 80px;

      .rightBoxWrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        gap: 12px;

        .el-button {
          width: 100%;
          margin: 0;
          padding-right: 0;
          padding-left: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
