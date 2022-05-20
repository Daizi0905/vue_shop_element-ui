<template>
  <el-container class="home_view">
    <!--      Header-->
    <el-header>
      <div class="logo">
        <img src="../../assets/logo.png" width="60px" alt="" style="margin-right: 20px" />
        <span>电商后台管理系统</span>
      </div>
      <div class="right">
        <div>
          <img src="../../assets/images/header.jpg" width="40px" alt="" />
        </div>
        <span>Daizi</span>
        <el-dropdown>
          <span class="el-dropdown-link" style="font-size: 12px; font-weight: 400; color: #4a5064; cursor: pointer;"> 源码地址 <i class="el-icon-arrow-down el-icon--right"></i> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a href="https://gitee.com/daizi0905/vue_shop">Gitee</a></el-dropdown-item>
            <el-dropdown-item><a href="https://github.com/Daizi0905/vue_shop_element-ui">Github</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!--        Aside-->
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!--          左侧导航栏-->
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#333744" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="$route.path">
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
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in menusRoute" :key="index" :to="{ path: item.path }">{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuList } from '@/config/api'

export default {
  name: 'Home',
  data() {
    return {
      menusList: [], // 左侧菜单列表
      iconList: {
        125: 'el-icon-user-solid',
        103: 'el-icon-set-up',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-platform',
        145: 'el-icon-s-platform'
      },
      isCollapse: false,
      menusRoute: []
    }
  },

  watch: {
    $route(to, from) {
      // console.log(to)
      if (to.meta.level) {
        this.menusRoute = to.meta.level
      }
    }
  },

  methods: {
    // 退出登录
    logout() {
      localStorage.removeItem('token')
      this.$message.success('您已退出登录！')
      this.$router.push('/login')
    },

    // 获取当前页面路由
    getPageRoute() {
      // console.log(this.$route)
      if (this.$route.meta.level) {
        this.menusRoute = this.$route.meta.level
      }
    },

    // 点击左侧菜单栏
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    // 请求左侧菜单数据
    // async getMenuList() {
    //   const {data: res} = await this.axios.get('menus')
    //   console.log(res)
    //   if (res.meta.status !== 200) return this.$message.error('请求菜单栏数据失败！！！')
    //   this.menusList = res.data
    // },
    getMenuListFn() {
      getMenuList()
        .then((res) => {
          if (res.meta.status !== 200) return
          this.menusList = res.data
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //  左侧菜单的切换收起
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenuListFn()
    this.getPageRoute()
  }
}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #373d41;
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
.right {
  display: flex;
  align-items: center;
}
.right img {
  margin-right: 10px;
  vertical-align: middle;
}
.right span {
  margin-right: 30px;
  color: #ffffff;
  font-weight: 700;
}
.el-dropdown-item a {
  font-size: 12px;
  // color: #4e556b;
}
</style>
