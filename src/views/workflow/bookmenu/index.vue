<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单号" prop="eqtName">
        <el-input
          v-model="queryParams.arName"
          placeholder="请输入订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleCreate(-1)"
          v-hasPermi="['system:post:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:post:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:post:remove']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getOrder"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" >
        <template slot-scope="scope">
          <!-- 在这里可以自定义动作序号列的内容 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" prop="omId" />
      <el-table-column label="需方" align="center" prop="omSupply" />
      <el-table-column label="供方" align="center" prop="omDemand" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleCreate(scope.row.omId)"
            v-hasPermi="['system:post:edit']"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getOrder"
    />

    <!-- 添加或修改动作对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类别名称" prop="eqtName">
          <el-input v-model="form.arName" placeholder="请输入工作台名称" />
        </el-form-item>
        <el-form-item label="类别描述" prop="eqtDesp">
          <el-input v-model="form.arDesp" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrder, delOrder} from "@/api/workflow/bookmenu";
import dict from "@/utils/dict";
import {parseTime} from "../../../utils/ruoyi";
import {delOrderDetails, listOrderDetails} from "@/api/workflow/createOrder";

export default {
  name: "Order",
  dicts: ['sys_normal_disable'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      id:-1,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 岗位表格数据
      postList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        arName: undefined,
      },
      // itemQueryParams: {
      //   pageNum: 1,
      //   pageSize: 10,
      //   omId: undefined,
      // },
      // 表单参数
      form: {},
      // 表单校验

    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    parseTime,
    dict,
    /** 查询岗位列表 */
    getOrder() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.postList = response.rows;
        console.log(response)
        this.total = response.total;
        this.loading = false;
      });
      // console.log(1)
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        arId: undefined,
        arName: undefined,
        arDesp: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getOrder();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.arId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    handleCreate(id){
      this.$router.push({
        path:'/bookmenu/orderDetails',
        query:{
          id:id
        }
      })
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加工作台";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const opIds = row.arId || this.ids
      console.log(opIds)
      getOrder(opIds).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改工作台信息";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.arId != undefined) {
            updateOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getOrder();
            });
          } else {
            addOrder(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              console.log(this.form)
              this.getOrder();
            });
          }
        }
      });
      console.log(1)
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const arIds = row.omId || this.ids;
      console.log(arIds)
      this.$modal.confirm('是否确认删除编号为"' + arIds + '"的数据项？').then(function() {
        // arIds.forEach(function(element) {
        //   this.itemQueryParams.omId = element;
        //
        // })
        const itemQueryParams = {
          pageNum: 1,
          pageSize: 10,
          omId: arIds,
        }
        console.log(itemQueryParams)
        listOrderDetails(itemQueryParams).then(response => {
          const list = response.rows;
          list.forEach(function (element) {
            delOrderDetails(element.odId).then(response => {

            })
          })
          // console.log(list)
        })
        return delOrder(arIds);
      }).then(() => {
        this.getOrder();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
      console.log(row)
      console.log(row.arId)
    },

  }
};
</script>
