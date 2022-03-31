<template>
  <div class="VForm">
    <div class="VFormWrap">
      <div class="title">{{ title }}</div>
      <div v-for="field in fields" class="field">
        <div :style="`width:${labelWidth}px`" class="label"><span
          v-show="field.required"
          class="required"
        >*</span>{{ field.label }}
        </div>
        <div class="item">
          <slot :field="field" :name="`field-${field.prop}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    labelWidth: {
      type: Number,
      default: 120,
    },
    title: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [{ label: '', prop: '' }],
    },
  },
  methods: {},

}
</script>

<style lang="scss" scoped>
.VForm {
  margin: 12px;
  border: 1px solid #CCC;
  background: linear-gradient(180deg, #FFF, #F2F2F2 120px, #FFF);

  .VFormWrap {
    margin: 4px;
    border: 1px dotted #CCC;

    .title {
      font-size: 14px;
      font-weight: bold;
      padding: 6px 16px;
    }

    .field {
      //双数的显示白色
      display: flex;

      border-top: 1px solid #CCC;
      &:nth-child(2n-1) {
        background: #FFF;
      }

      .label {
        font-size: 14px;
        font-weight: bold;
        flex-shrink: 0;
        padding: 6px 16px;
        border-right: 1px solid #CCC;

        .required {
          font-weight: bold;
          color: red;
        }
      }

      .item {
        font-size: 14px;
        padding: 6px 16px;
      }
    }

    .row {

    }
  }
}

</style>
