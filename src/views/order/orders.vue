<template>
  <div>
    <el-card>
      <!-- 搜索框 -->
      <el-input placeholder="请输入内容" style="width: 300px; margin-right: 10px" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 表格 -->
      <el-table :data="ordersList" stripe style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="order_number" label="订单编号"> </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="pay_status" label="是否付款">
          <template #default="scope">
            <el-tag size="small" :type="scope.row.pay_status === '0' ? 'danger' : 'primary'">{{ scope.row.pay_status === '0' ? '未付款' : '已付款' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="create_time" label="下单时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" @click="showEditDialogVisible(scope.row)"></el-button>
            <el-button type="success" icon="el-icon-location" size="small" @click="showProgressDialog"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"> </el-pagination>
    </el-card>

    <!-- 编辑对话框 -->
    <el-dialog title="提示" :visible.sync="editDialogVisible" width="50%" @close="editDialogVisibleClose">
      <el-form :model="editForm" :rules="editRules" ref="ruleFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="citydata" v-model="editForm.address1" style="width: 100%"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流对话框 -->
    <el-dialog title="提示" :visible.sync="progressDialogVisible" width="50%">
      <el-timeline :reverse="false">
        <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="progressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="progressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./orders.js"></script>

<style src="./orders.css"></style>
