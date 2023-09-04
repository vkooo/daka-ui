<template>
    <div class="app-container">
      <el-card class="show">
        <el-form inline :model="query" ref="queryForm" class="demo-form-inline" v-if="showSearch">
            <el-form-item label="时间">
                <el-date-picker
                    v-model="query.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                />
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="query.status" clearable>
                <el-option value="1" label="待打款"></el-option>
                <el-option value="2" label="已打款"></el-option>
                <el-option value="3" label="已拒绝"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click='search()'>搜索</el-button>
                <el-button @click='rest()'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
  
        <el-table
            :data="list"
            row-key="id"
            ref="dragTable"
            v-fixed-scroll
          >
            <!-- 多选 -->
            <el-table-column
              label="申请用户"
              prop="member.email"
            />
            <el-table-column
              label="提现用户"
              prop="member.email"
            >
              <template slot-scope="scope">
                  <div>用户：{{ scope.row.email }}</div>
                  <div>真实姓名：{{ scope.row.realname }}</div>
                  <div>支付宝账号：{{ scope.row.account }}</div>
                  <div>手机号：{{ scope.row.mobile }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="提现金额" />
            <el-table-column prop="status" label="状态" >
                <template slot-scope="scope">
                    <span :style="'color:' + (scope.row.status == 1?'red':'')">
                        {{ scope.row.status_text }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" />
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope" v-if="scope.row.status == 1">
                    <el-link type="primary" 
                        :underline="false"
                        @click="agree(scope.$index, scope.row, 2)">同意</el-link>
                    <el-link type="primary" 
                        :underline="false"
                        @click="refuse(scope.$index, scope.row, 3)">拒绝</el-link>
                </template>
            </el-table-column>
          </el-table>
          <Pagination :total="total" @pageChange="pageChange" />
      </el-card>

      <el-dialog
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        append-to-body
        :title="title"
      >
        <div class="dialog-content">
              <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
                  <el-form-item label="申请用户" prop="name">
                      {{ form.member.email }}
                  </el-form-item>
                  <el-form-item label="申请金额" prop="name">
                    {{ form.amount }}
                  </el-form-item>
                  <el-form-item label="备注" prop="discount">
                      <el-input v-model="form.remark" />
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
        </div>
          </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { lists, refuse, agree } from "@/api/finance/withdrawal";
  import { mapState } from "vuex"

  export default {
    name: "index",
    computed: {
		...mapState('user', ["userInfo"]),
    },
    data () {
      return {
        query:{},
        list: [],
        total: 0,
        showSearch:true,
        form: {},
        rules: {},
        title: "",
        status: 1,
        dialogVisible: false,
      }
    },
    created() {
      this.rest()
    },
    methods:{
      queryData(){
        this.query = {
            keyword: "",
            status: "",
            date: "",
            page: 1,
            rules: {}
        }
      },
      getList(){
        let that = this
        lists(that.query).then(res => {
          if (res.code === 200){
            const {list, total} = res.data;
            that.list = list
            that.total = total
          }
        }).catch(error => {
          console.log(error)
        })
      },
      search(){
      this.query.page = 1
        this.getList();
      },
      refuse:function (index, e, status){
        this.title = "拒绝打款"
        this.form = e
        this.status = status
        this.dialogVisible = true
      },
      agree:function (index, e, status){
        this.title = "同意打款"
        this.form = e
        this.status = status
        this.dialogVisible = true
      },
      pageChange(page){
        this.queryData()
        this.page = page
        this.getList();
      },
      rest:function (){
        this.queryData()
        this.getList();
      },
      submit() {
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              let form = this.form
              form.status = this.status
                let api = this.status == 2? agree(this.form): refuse(this.form)
                api.then(res => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    })
                    this.getList();
                    this.dialogVisible = false
                })
            } else {
                return false;
            }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  