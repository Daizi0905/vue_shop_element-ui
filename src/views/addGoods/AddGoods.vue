<template>
  <div>
    <el-card>
      <!-- 提示信息 -->
      <el-alert title="添加商品信息！" type="info" center show-icon :closable="false"> </el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="stepActive" align-center finish-status="success">
        <el-step v-for="(item, i) in stepList" :key="i" :title="item.title"></el-step>
      </el-steps>
      <!-- tab -->
      <el-tabs :tab-position="'left'" style="height: 200px">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script src="./AddGoods.js"></script>

<style src="./AddGoods.css"></style>
