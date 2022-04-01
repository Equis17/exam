<template>
  <div class="file-list">
    <template v-if="picList.length">
      <div v-for="(item, index) in picList" :key="index" class="file-item">
        <span :class="`icon ${iconMap[item.suffix] || 'unknown'}`" />

        <span class="title">
          <span v-if="titleList[index]">{{ titleList[index] }}</span>
          <span v-else>附件{{ index + 1 }}</span>
        </span>
        <a :href="item.url" class="download" target="_blank" @click="handleAppDownload($event, item.url)">下載</a>
      </div>
    </template>
    <span v-else>-</span>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    src: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      iconMap: {
        '.jpg': 'pic',
        '.excel': 'excel',
        '.xls': 'excel',
        '.png': 'pic',
        '.ppt': 'ppt',
        '.rar': 'rar',
        '.zip': 'zip',
        '.word': 'word',
        '.pdf': 'pdf',
      },
    }
  },
  computed: {
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < 700
    },
    titleList() {
      if (!this.title) {
        return []
      }
      return this.title.split('|')
    },
    picList() {
      if (!this.src) {
        return []
      }
      const reg = new RegExp(/\.\w+$/)
      return this.src.split('|').map((url, index) => {
        return {
          uid: index,
          status: 'done',
          name: index.toString(),
          suffix: reg.exec(url)[0],
          url,
        }
      })
    },
  },
  methods: {
    handleAppDownload(e, url) {
      if (this.isMobile) {
        e.preventDefault()
        window.location.href = `js://downloadDocFile?url=${url}`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.file-item {
  position: relative;
  height: 40px;
  margin-bottom: 12px;
  padding: 10px 0;
  background-color: #FCFCFC;

  &:hover {
    background: #F2F5FC;
  }

  .icon {
    position: absolute;
    top: 13px;
    left: 8px;
    width: 12px;
    height: 14px;

    &.pic {
      background: url('~@/assets/icons/file_icon_pic.png');
      background-size: cover;
    }

    &.excel {
      background: url('~@/assets/icons/file_icon_excel.png');
      background-size: cover;
    }

    &.ppt {
      background: url('~@/assets/icons/file_icon_ppt.png');
      background-size: cover;
    }

    &.rar {
      background: url('~@/assets/icons/file_icon_rar.png');
      background-size: cover;
    }

    &.zip {
      background: url('~@/assets/icons/file_icon_zip.png');
      background-size: cover;
    }

    &.word {
      background: url('~@/assets/icons/file_icon_word.png');
      background-size: cover;
    }

    &.pdf {
      background: url('~@/assets/icons/file_icon_pdf.png');
      background-size: cover;
    }

    &.unknown {
      background: url('~@/assets/icons/file_icon_unknown.png');
      background-size: cover;
    }
  }

  .title {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    float: left;
    margin-left: 30px;
    text-align: left;
    color: #64666D;
  }

  .download {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    float: right;
    margin-right: 14px;
    cursor: pointer;
    text-align: right;
    color: #148FFF;
  }
}
</style>
