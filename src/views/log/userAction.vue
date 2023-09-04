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
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click='search()'>搜索</el-button>
                <el-button @click='rest()'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-auth="['member:export']"
            >导出</el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
  
        <el-table
            :data="list"
            row-key="id"
            ref="dragTable"
            v-fixed-scroll
          >
            <el-table-column
              label="标题"
              prop="title"
            />
            <el-table-column prop="user.account" label="账号" />
            <el-table-column prop="action" label="方法" />
            <el-table-column prop="timing" label="响应时间（秒）" align="center"/>
            <el-table-column prop="created_at" label="请求时间" />
          </el-table>
          <Pagination :total="total" @pageChange="pageChange" />
      </el-card>
    </div>
  </template>
  
  <script>
  import { lists } from "@/api/log/userAction";
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
            status: "",
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
  