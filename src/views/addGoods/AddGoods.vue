<template>
  <div>
    <el-card>
      <!-- 提示信息 -->
      <el-alert title="添加商品信息！" type="info" center show-icon :closable="false"> </el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="Number(stepActive)" align-center finish-status="success">
        <el-step v-for="(item, i) in stepList" :key="i" :title="item.title"></el-step>
      </el-steps>
      <!-- tab -->
      <el-form :model="addGoodsForm" :rules="rules" ref="addeFormRef" label-width="100px" label-position="top">
        <el-tabs :tab-position="'left'" v-model="stepActive" @tab-click="handleClick" :before-leave="beforeTabLeave">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addGoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model.number="addGoodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model.number="addGoodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model.number="addGoodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="addGoodsForm.goods_cat" :options="goodsClassifyList" :props="cateProps" @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品参数 -->
          <el-tab-pane label="商品参数" name="1">
            <el-form-item v-for="item in manyTableList" :key="item.attr_id" :label="item.attr_name">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox v-for="(item2, index) in item.attr_vals" :key="index" :label="item2" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="item in onlyTableList" :key="item.attr_id" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 上传商品图片 -->
          <el-tab-pane label="商品图片" name="3">
            <el-upload :headers="headersObj" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture" :on-success="uploadSuccess">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addGoodsForm.goods_introduce"></quill-editor>
            <el-button type="primary" style="margin-top: 15px;" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 商品图片预览 -->
    <el-dialog title="商品图片" :visible.sync="previewDialog" width="50%">
    <img :src="goodsPtcUrl" width="100%">
    </el-dialog>
  </div>
</template>

<script src="./AddGoods.js"></script>

<style src="./AddGoods.css"></style>
