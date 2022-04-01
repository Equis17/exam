<template>
  <div class="uploadPicBtn">
    <el-upload
      :action="DEFAULT_URL"
      :accept="accept"
      auto-upload
      :file-list="fileList"
      :limit="limit"
      :multiple="limit > 1"
      :headers="headers"
      :http-request="httpRequest"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
    >
      <el-button class="button" size="medium">
        <svg-icon class-name="upload-icon" icon-class="icon_bd_upload" />
        点击上传
      </el-button>
      <div slot="tip" class="el-upload__tip">限制{{ limitFileSize }}M以下</div>
    </el-upload>
    <div class="fileList">
      <div v-for="(item) in fileList" :key="item.name" class="fileItem">
        <img class="pic" :src="item.response.data" alt="">
        <svg-icon class-name="remove" icon-class="icon_bd_delete" @click.native="removeFile(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { getToken, } from '@/utils/auth'

const REG = {
  // notIncludedHttpReg: /(?<=https?:\/\/)[\s\S]*/,
  suffixReg: /\.\w+$/,
}

const DEFAULT_URL = process.env.VUE_APP_BASE_API + '/common/upload'
export default {
  name: 'Index',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    limitFileSize: {
      default: 2,
    },
    limit: {
      default: 1,
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.bmp',
    },
    value: {},
  },
  data() {
    return {
      fileList: [],
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      DEFAULT_URL,
      ctrl: {
        loading: false,
      },
      fileNameMap: {},
    }
  },
  watch: {
    async value(v) {
      await this.setFileList(v)
    },
  },
  methods: {
    beforeAvatarUpload(file) {
      const isExceed = file.size < this.limitFileSize * 1024 * 1024
      if (!isExceed) {
        this.$message.error(`上传文件大小不能超过${this.limitFileSize}M!`)
      }
      return isExceed
    },
    handleExceed(files, annex) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + annex.length
        } 个文件`
      )
    },
    getUrl(url, includeHttp = true) {
      if (!url) return ''
      if (url.startsWith('http')) {
        return includeHttp ? url : url.replace(/^http[s]?:\/\//, '')
      }
      return includeHttp ? `https://${url}` : url
    },
    async httpRequest(e) {
      try {
        this.ctrl.loading = true
        const formData = new FormData()
        formData.append('file', e.file)
        const res = await api.common.upload(formData)
        this.$emit('change', [...this.fileList.map((i) => i.response.data), ...res.data.split('|'), ].join('|'))
      } finally {
        this.ctrl.loading = false
      }
    },
    regMatch(reg, value) {
      return reg.exec(value) ? reg.exec(value)[0] : undefined
    },
    removeFile(item) {
      this.$emit(
        'change',
        [...this.fileList.map((i) => i.response.data).filter((i) => i !== item.response.data), ].join('|')
      )
    },
    async setFileList(files) {
      if (!files) {
        this.fileList = []
        return
      }
      this.fileList = files.split('|').map((url) => {
        return {
          name: url,
          percentage: 100,
          status: 'success',
          response: {
            code: 200,
            data: url,
          },
          suffix: this.regMatch(REG.suffixReg, url),
          url,
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.upload-icon {
  width: 16px;
  height: 16px;
}

.fileList {
  margin-top: 12px;

  .fileItem {
    margin-bottom: 12px;
    width: 300px;
    height: 68px;
    background: #FFF;
    border: 1px solid #D7D9E0;
    border-radius: 4px;
    font-size: 0;
    padding: 11px 9px 11px 13px;
    position: relative;
    white-space: nowrap;
    display: flex;
    align-items: center;

    .pic {
      height: 100%;
      width: auto;
      display: inline-block;
      vertical-align: middle;
      margin-right: 14px;
    }

    .text {
      flex: 1;
      margin-right: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #131416;
      line-height: 16px;
    }

    .remove {
      cursor: pointer;
      position: absolute;
      width: 16px;
      height: 16px;
      color: #71737B;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
    }
  }
}
</style>
