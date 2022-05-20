<template>
<div class="view">
  <div class="login_box">
    <div class="avatar_box">
      <img src="../../assets/logo.png" alt="">
    </div>
    <el-form ref="form" :model="form" class="login_form" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model.trim="form.username" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model.trim="form.password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="reset">重置</el-button>
    </div>
  </div>
</div>
</template>

<script>
import { loginFn } from '@/config/api'
export default {
  name: "Login",
  data() {
    return {
      // 登录账号密码
      form: {
        username: 'admin',
        password: '123456'
      },
      // 登录验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单重置
    reset() {
      this.$refs.form.resetFields()
    },
    login() {
      // 登录预验证
      this.$refs.form.validate( async valid => {
        // console.log(valid)
        if (!valid) return
        const res = await loginFn(this.form)
        console.log(res)
        if (res.meta.status !== 200) return
        localStorage.setItem('token', res.data.token)
        this.$message.success('登录成功')
        await this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.view {
  height: 100%;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  box-sizing: border-box;
  padding: 10px;
  width: 450px;
  height: 300px;
  background: #fff;
}
.avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
  }
}
.login_form {
  margin-top: 110px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}

</style>