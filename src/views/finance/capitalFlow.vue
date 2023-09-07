<template>
    <div class="app-container">
      <el-card class="show">
        <el-form inline :model="query" ref="queryForm" class="demo-form-inline" v-if="showSearch">
            <el-form-item label="用户 ID">
              <el-input v-model="query.member_id" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="query.keyword" ></el-input>
            </el-form-item>
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
              type="selection"
            ></el-table-column>
            <el-table-column
              label="用户"
              prop="member.email"
            />
            <el-table-column prop="status" label="交易金额" >
                <template slot-scope="scope">
                    <span :style="'color:' + (scope.row.type == 1?'red':'')">
                        {{ scope.row.type == 1? '+': '-' }} {{ scope.row.money }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="before" label="变更前金额" />
            <el-table-column prop="after" label="变更后金额" />
            <el-table-column
              prop="memo"
              label="交易备注" />
            <el-table-column
              prop="created_at"
              label="交易时间" />
          </el-table>
          <Pagination :total="total" @pageChange="pageChange" />
      </el-card>
    </div>
  </template>
  
  <script>
  import { lists } from "@/api/finance/capitalFlow";
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
      }
    },
    created() {
      this.rest()
    },
    methods:{
      queryData(){
        this.query = {
            keyword: "",
            member_id: "",
            status: "",
            date: "",
            page: 1,
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
      handleExport:function (){
  
      },
      pageChange(page){
        this.query.page = page
        this.getList();
      },
      rest:function (){
        this.queryData()
        this.getList();
      },
    }
  }
  </script>
  
  <style scoped>
  </style>
  