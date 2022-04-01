<template>
  <el-form ref="form" :model="form" label-position="top">
    <el-form-item
      v-for="field in filterFields"
      :key="field.prop"
      :prop="field.prop"
      :rules="{required:Boolean(field.required),message:'请完善必填项'}"
    >
      <template #label>
        <span>{{ field.label }}</span>
        <tips v-if="field.tip" :content="field.tip" />
      </template>
      <div v-if="!isDetail">
        <upload-pic-btn
          v-if="field.type === 'img'"
          v-model="form[field.prop]"
        />
        <tinymce v-else-if="field.type === 'html'" v-model="form[field.prop]" />
        <upload-pic-btn
          v-else-if="field.type === 'file'"
          v-model="form[field.prop]"
          :limit="9"
        />
        <el-date-picker
          v-else-if="field.type === 'date-picker'"
          v-model="form[field.prop]"
          :placeholder="`请选择${field.label}`"
          type="date"
          value-format="yyyy-MM-dd"
        />
        <el-select
          v-else-if="field.type === 'select'"
          v-model="form[field.prop]"
          :placeholder="`请选择${field.label}`"
        >
          <el-option
            v-for="item in opts[field.prop]"
            :key="item.optId"
            :label="item.optLabel"
            :value="item.optId"
          />
        </el-select>
        <el-input-number
          v-else-if="field.type === 'number'"
          v-model.number="form[field.prop]"
          :controls="false"
          :max="field.maxLength || Infinity"
          :placeholder="`请输入${field.label}`"
          :precision="0"
        />
        <el-input
          v-else-if="field.type === 'textarea'"
          v-model="form[field.prop]"
          :placeholder="`请输入${field.label}`"
          :rows="3"
          type="textarea"
        />
        <el-radio-group
          v-else-if="field.type === 'boolean'"
          v-model="form[field.prop]"
        >
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <el-input
          v-else-if="field.type === 'password'"
          v-model="form[field.prop]"
          :max-length="field.maxLength || Infinity"
          :placeholder="`请输入${field.label}`"
          type="password"
        />
        <el-cascader
          v-else-if="field.type === 'tree'"
          v-model="form[field.prop]"
          :options="opts[field.prop]"
          :placeholder="'請選擇'"
          :props="{ checkStrictly: true,emitPath:false, value: 'id', label: 'name', children: 'children' }"
          clearable
        />
        <slot v-else-if="field.type==='custom'" :field="field" :name="`field-${field.prop}`" />
        <el-input
          v-else
          v-model="form[field.prop]"
          :max-length="field.maxLength || Infinity"
          :placeholder="`请输入${field.label}`"
        />
      </div>
      <div v-else>
        <div v-if="field.type==='select'">{{
            getOptsLabel(opts[field.prop], form[field.prop])
          }}
        </div>
        <div v-else-if="field.type === 'html'" v-html="form[field.prop]" />
        <div v-else-if="field.type==='img'">
          <el-image v-if="form[field.prop]" :src="form[field.prop]" />
          <span v-else>-</span>
        </div>
        <div v-else-if="field.type==='file'">
          <file-list v-if="form[field.prop]" :src="form[field.prop]" class="fileList" />
          <span v-else>-</span>
        </div>
        <div v-else-if="field.type==='custom'">
          <slot :field="field" :name="`field-${field.prop}`" />
        </div>
        <div v-else-if="field.type==='boolean'">
          {{ form[field.prop] ? '是' : '否' }}
        </div>
        <div v-else-if="field.type==='tree'">
          {{ form[field.prop.slice(0, -2)] ? form[field.prop.slice(0, -2)].name : '-' }}
        </div>
        <div v-else>
          {{ form[field.prop] }}
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import fileList from '@/components/FileList'
import Tinymce from '@/components/Tinymce'
import uploadPicBtn from '@/components/UploadPicBtn'

export default {
  name: 'Index',
  components: {
    Tinymce,
    uploadPicBtn,
    fileList,
  },
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    },
    opts: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    fields: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    filterFields() {
      return this.isDetail ? this.fields : this.fields.filter(f => !f.isSelf)
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate()
    },
  },
}
</script>

<style scoped>

</style>
