<template>
  <div class="view">
    <el-card>
      <el-input placeholder="请输入内容" v-model="goodsParams.query" style="width: 300px; margin-right: 10px" clearable>
        <el-button slot="append" icon="el-icon-search" @click="getGoodsListFn"></el-button>
      </el-input>
      <el-button type="primary" @click="goAddGoods">添加商品</el-button>
      <!-- 商品列表 -->
      <el-table :data="goodsList" stripe style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="1000%"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"> </el-table-column>
        <el-table-column prop="add_time" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteGoodsFn(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="goodsParams.pagenum"
      :page-size="goodsParams.pagesize"
      :total="goodsListTotal"
      layout="prev, pager, next">
    </el-pagination>
    </el-card>
  </div>
</template>

<script src="./GoodsList.js"></script>

<style src="./GoodsList.css" scoped></style>
