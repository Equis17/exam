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
          <div class="desc">税收分类编码版本号：40.0</div>
          <div class="title">上海增值税普通发票</div>
          <div class="info">
            <div class="item">
              <div class="label">发票代码：</div>
              <div class="value">031002100104</div>
            </div>
            <div class="item">
              <div class="label">发票号码：</div>
              <div class="value">{{ form.serialNumber }}</div>
            </div>
            <div class="item">
              <div class="label">开票日期</div>
              <div class="value">{{ today }}</div>
            </div>
          </div>
          <div class="invoice">
            <div class="invoiceHeader">
              <div class="label">
                <div class="labelWrap">
                  <div v-for="item in '购买方'" class="word">{{ item }}</div>
                </div>
              </div>
              <div class="content">
                <div class="contentItem">
                  <div class="contentLabel">
                    <div v-for="item in '名   称'" class="contentLabelWord">{{ item }}</div>
                    <span>：</span></div>
                  <div class="contentValue">
                    <input placeholder="请输入名称">
                  </div>
                </div>
                <div class="contentItem">
                  <div class="contentLabel">
                    <div v-for="item in '纳税人识别号'" class="contentLabelWord">{{ item }}</div>
                    <span>：</span></div>
                  <div class="contentValue">
                    <input placeholder="请输入纳税人识别号">
                  </div>
                </div>
                <div class="contentItem">
                  <div class="contentLabel">
                    <div v-for="item in '地址、电话'" class="contentLabelWord">{{ item }}</div>
                    <span>：</span></div>
                  <div class="contentValue">
                    <input placeholder="请输入地址、电话">
                  </div>
                </div>
                <div class="contentItem">
                  <div class="contentLabel">
                    <div v-for="item in '开户行及账号'" class="contentLabelWord">{{ item }}</div>
                    <span>：</span></div>
                  <div class="contentValue">
                    <input placeholder="请输入开户行及账号">
                  </div>
                </div>
              </div>
              <div class="label" style="border-left: 2px solid #843400">
                <div class="labelWrap">
                  <div v-for="word in '密码区'" class="word">{{ word }}</div>
                </div>
              </div>
              <div class="content" style="flex:1">

              </div>
            </div>
            <div class="invoiceBody">
              <div class="bodyWrapper">
                <div class="table">
                  <table border="1" cellspacing="0">
                    <tr class="header">
                      <th>税务或应税劳务、服务名称</th>
                      <th>规格型号</th>
                      <th>单位</th>
                      <th>数量</th>
                      <th>单价（不含税）</th>
                      <th>金额（不含税）</th>
                      <th>税率</th>
                      <th>税额</th>
                    </tr>
                    <tr v-for="item in form.cargoList" class="row">
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
                <div class="bodyFooter">
                  <div class="content">
                    <div class="contentWrap">
                      <div v-for="item in '合计'" class="label">{{ item }}</div>
                    </div>
                  </div>
                  <div class="money">
                    ￥0.00
                  </div>
                  <div class="money">
                    ￥0.00
                  </div>
                </div>
                <div class="bodySum">
                  <div class="left">
                    价税合计（大写）
                  </div>
                  <div class="right">
                    <div class="rightWrap">
                      <div class="upper">123</div>
                      <div class="small">
                        <span class="color">（小写）</span>
                        <span class="price">￥0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--TODO-->
            <div class="invoiceSum"></div>
            <div class="invoiceFooter">
              <div class="invoiceHeader">
                <div class="label">
                  <div class="labelWrap">
                    <div v-for="item in '销售方'" class="word">{{ item }}</div>
                  </div>
                </div>
                <div class="content">
                  <div class="contentItem">
                    <div class="contentLabel">
                      <div v-for="item in '名称'" class="contentLabelWord">{{ item }}</div>
                      <span>：</span>
                    </div>
                    <div class="contentValue">
                      <input placeholder="请输入名称">
                    </div>
                  </div>
                  <div class="contentItem">
                    <div class="contentLabel">
                      <div v-for="item in '纳税人识别号'" class="contentLabelWord">{{ item }}</div>
                      <span>：</span>
                    </div>
                    <div class="contentValue">
                      <input placeholder="请输入纳税人识别号">
                    </div>
                  </div>
                  <div class="contentItem">
                    <div class="contentLabel">
                      <div v-for="item in '地址、电话'" class="contentLabelWord">{{ item }}</div>
                      <span>：</span>
                    </div>
                    <div class="contentValue">
                      <input placeholder="请输入地址、电话">
                    </div>
                  </div>
                  <div class="contentItem">
                    <div class="contentLabel">
                      <div v-for="item in '开户行及账号'" class="contentLabelWord">{{ item }}</div>
                      <span>：</span>
                    </div>
                    <div class="contentValue">
                      <input placeholder="请输入开户行及账号">
                    </div>
                  </div>
                </div>
                <div class="label" style="border-left: 2px solid #843400;">
                  <div class="labelWrap">
                    <div v-for="item in '备注'" class="word">{{ item }}</div>
                  </div>
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
  data() {
    return {
      form: {
        serialNumber: '',
        cargoList: [{}],
      },
    }
  },
  computed: {
    today() {
      return dayjs().format('YYYY年MM月DD日')
    },
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
    height: calc(100% - 48px);
    margin-top: 10px;
    gap: 20px;

    .mainBox {
      flex: 1;
      background-color: #FFF;

      .mainBoxWrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 12px 55px 0 65px;

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
          height: calc(100% - 48px);
        }

        .rightCircles {
          position: absolute;
          top: 40px;
          right: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: calc(100% - 48px);
        }

        .title {
          font-size: 30px;
          line-height: 42px;
          text-align: center;
          color: #00F;
        }

        .desc {
          float: right;
          margin-top: 20px;
          color: #CCC;
        }

        .info {
          font-size: 0;
          display: flex;
          margin-top: 10px;
          gap: 12px;

          .item {
            font-size: 0;

            &:last-of-type {
              flex: 1;
              text-align: right;

              .value {
                color: #000;
              }
            }

            .label {
              font-family: PingFangSC, PingFangSC-Medium;
              font-size: 16px;
              font-weight: 500;
              line-height: 22px;
              display: inline-block;
              text-align: center;
              vertical-align: middle;
              color: #843400;
            }

            .value {
              font-family: PingFangSC, PingFangSC-Medium;
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
              display: inline-block;
              margin-left: 12px;
              text-align: center;
              vertical-align: middle;
              color: #C03;
            }
          }
        }

        .invoice {
          display: flex;
          flex-direction: column;
          height: calc(100% - 148px);
          margin-top: 14px;
          border: 2px solid #843400;

          .invoiceBody {
            flex: 1;
            border-bottom: 2px solid #843400;

            .bodyWrapper {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100%;
            }
          }

          .invoiceHeader {
            display: flex;
            border-bottom: 2px solid #843400;


            .label {
              width: 40px;
              padding: 8px;
              text-align: center;
              border-right: 2px solid #843400;

              .labelWrap {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;
                height: 100%;
                justify-items: center;

                .word {
                  font-size: 13px;
                  color: #843400;
                }
              }
            }


            .content {
              flex: 2;

              .contentItem {
                font-size: 14px;
                display: flex;
                align-items: center;
                width: 100%;
                padding-left: 4px;
                color: #843400;

                .contentLabel {
                  display: flex;
                  justify-content: space-between;
                  width: 120px;

                  .contentLabelWord {
                    flex: 1;
                  }
                }

                .contentValue {
                  flex: 1;

                  input {
                    font-size: 14px;
                    //去除input原生
                    width: 100%;
                    border: none;
                    outline: none;
                    background: none;
                    //placeholder颜色
                    &::-webkit-input-placeholder {
                      color: #CCC;
                    }

                  }
                }
              }

            }

            &:last-of-type {
              border-bottom: none;
            }
          }
        }
      }
    }

    .invoiceBody {
      .table {
        overflow-y: auto;
        flex: 1;
        width: 100%;

        .header {
          border-color: #CCC;
          background-color: aliceblue;

          th {
            font-weight: 400;
            padding: 4px 0;
          }
        }

        .row {
          border-color: aliceblue;

          th {
            font-weight: 400;
            padding: 4px 0;
          }
        }

        table {
          width: 100%;
          border-color: aliceblue;
        }
      }

      .bodyFooter {
        display: flex;
        padding: 4px 60px 4px;

        .content {
          flex: 1;
          justify-content: center;

          .contentWrap {
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            color: #843400;
          }
        }

        .money {
          font-size: 13px;
          flex: 1;
          text-align: center;
          color: #000;
        }
      }

      .bodySum {
        display: flex;
        border-top: 2px solid #843400;

        .left {
          font-size: 13px;
          width: 200px;
          padding: 4px 0;
          text-align: center;
          color: #843400;
          border-right: 2px solid #843400;
        }

        .right {
          flex: 1;
          height: 100%;

          .rightWrap {
            display: flex;
            align-items: center;
            height: 100%;

            .upper {
              font-weight: 400;
              flex: 1;
              padding-left: 40px;
            }

            .small {
              width: 200px;

              .color {
                font-size: 13px;
                color: #843400;
              }

              .price {
                font-size: 13px;
                color: #000;
              }
            }
          }
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
