<template>
  <div class="view">
    <h1>home</h1>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    // 退出登录
    logout() {
      localStorage.removeItem('token')
      this.$message.success('您已退出登录！')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>