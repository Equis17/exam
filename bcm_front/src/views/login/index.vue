<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      class="login-form"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          autocomplete="on"
          name="username"
          placeholder="Username"
          tabindex="1"
          type="text"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" manual placement="right">
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            autocomplete="on"
            name="password"
            placeholder="Password"
            tabindex="2"
            @blur="capsTooltip = false"
            @keyup.native="checkCapslock"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        style="width:100%;margin-bottom:30px;"
        type="primary"
        @click.native.prevent="handleLogin"
      >Login
      </el-button>

      <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import encrypt from '@/utils/encrypt'
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    return {
      userList: [],
      loginForm: {
        username: 'admin',
        password: '111111',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 处理文件变化事件
    handleFileChange(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsText(file)
      // 读取文件成功,并将e.target.result处理成base64
      reader.onload = (e) => {
        // 获取文件内容
        const data = e.target.result
        // 解析文件内容为base64
        const base64 = data.split(',')[1]
        console.log(base64)
      }
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    async showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      await this.$nextTick()
      this.$refs.password.focus()
    },
    async handleLogin() {
      await this.$refs.loginForm.validate()
      this.loading = true
      try {
        const password = await encrypt(this.loginForm.password)
        await this.$store.dispatch('user/login', { ...this.loginForm, password })
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #FFF;
$cursor: #FFF;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    width: 85%;
    height: 47px;

    input {
      height: 47px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      border: 0px;
      border-radius: 0px;
      background: transparent;
      -webkit-appearance: none;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    color: #454545;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>

<style lang="scss" scoped>
$bg: #2D3A4B;
$dark_gray: #889AA4;
$light_gray: #EEE;

.login-container {
  overflow: hidden;
  width: 100%;
  min-height: 100%;
  background-color: $bg;

  .login-form {
    position: relative;
    overflow: hidden;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    color: #FFF;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    display: inline-block;
    width: 30px;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    color: $dark_gray;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      font-weight: bold;
      margin: 0px auto 40px auto;
      text-align: center;
      color: $light_gray;
    }
  }

  .show-pwd {
    font-size: 16px;
    position: absolute;
    top: 7px;
    right: 10px;
    cursor: pointer;
    user-select: none;
    color: $dark_gray;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
