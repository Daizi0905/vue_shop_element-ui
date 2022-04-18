<template>
  <el-container class="home_view">
    <!--      Header-->
    <el-header>
      <div class="logo">
        <img src="../../assets/logo.png" width="60px" alt="" style="margin-right: 20px;">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!--        Aside-->
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!--          左侧导航栏-->
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
        :default-active="$route.path">
          <!--            一级菜单-->
          <el-submenu v-for="item in menusList" :key="item.id" :index="String(item.id)">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!--              二级菜单-->
            <el-menu-item :index="'/' + secondItem.path" v-for="secondItem in item.children" :key="secondItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ secondItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--        Main-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuList } from "@/config/api";

export default {
  name: "Home",
  data() {
    return {
      menusList: [], // 左侧菜单列表
      iconList: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-set-up',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-platform',
        '145': 'el-icon-s-platform'
      },
      isCollapse: true
    }
  },
  methods: {
    // 退出登录
    logout() {
      localStorage.removeItem('token')
      this.$message.success('您已退出登录！')
      this.$router.push('/login')
    },
    // 点击左侧菜单栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 请求左侧菜单数据
    // async getMenuList() {
    //   const {data: res} = await this.axios.get('menus')
    //   console.log(res)
    //   if (res.meta.status !== 200) return this.$message.error('请求菜单栏数据失败！！！')
    //   this.menusList = res.data
    // },
    getMenuList() {
      getMenuList().then(res => {
          if (res.meta.status !== 200) return this.$message.error('请求菜单栏数据失败！！！')
          this.menusList = res.data
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    //  左侧菜单的切换收起
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #373d41
}

.el-aside {
  background: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background: #eaedf1;
}

.home_view {
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    color: #ffffff;
  }
}

.toggle_button {
  background: #4a5064;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
</style>