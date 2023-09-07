<template>
    <div class="app-container">
      <el-card class="show">
        <el-form inline :model="query" ref="queryForm" class="demo-form-inline" v-if="showSearch">
          <el-form-item label="ID">
            <el-input v-model="query.id" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="query.keyword" ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.status" clearable>
              <el-option value="1" label="启用"></el-option>
              <el-option value="2" label="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否代理">
            <el-select v-model="query.agent" clearable>
              <el-option value="1" label="是"></el-option>
              <el-option value="2" label="否"></el-option>
            </el-select>
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
            <el-button icon="el-icon-search" type="primary" @click='search()'>搜索</el-button>
            <el-button @click='rest()'>重置</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="add"
              v-auth="['member:create']"
            >新增</el-button>
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              @click="delAll"
              v-auth="['member:delete']"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <!-- <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-auth="['member:export']"
            >导出</el-button> -->
          </el-col>
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
              label="真实姓名"
              prop="realname"
            />
            <el-table-column
              label="ID"
              prop="id"
            />
            <el-table-column
              label="邮箱"
              prop="email"
            />
            <el-table-column
              label="代理"
              prop="agent.name"
            />
            <el-table-column
              label="余额"
              prop="money"
            />
            <el-table-column
              label="公众号"
              prop="wechat"
            >
             <template slot-scope="scope">
                    <el-tag :type="scope.row.wechat?'':'success'">{{ scope.row.wechat == 1?'已关注':"未关注" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status == 1?'':'success'">{{ scope.row.status == 1?'正常':"禁用" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="创建时间">
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :underline="false"
                  v-auth="'member:edit'"
                  @click="edit(scope.$index, scope.row)"
                >编辑</el-link>
                <el-dropdown @command="(command) => {
                  moreCommand(command, scope.row, scope.$index) 
                }">
                  <span class="el-dropdown-link">
                    <el-link
                      type="primary"
                      :underline="false"
                    >更多<i class="el-icon-arrow-down el-icon--right" /></el-link>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="detailRef">用户详情</el-dropdown-item>
                    <el-dropdown-item 
                      command="moneyRef"
                      >设置余额</el-dropdown-item>
                    <el-dropdown-item command="passwordRef">修改密码</el-dropdown-item>
                    <el-dropdown-item command="agentRef">修改代理</el-dropdown-item>
                    <el-dropdown-item command="expireRef">到期时间</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                
              </template>
            </el-table-column>
          </el-table>
          <Pagination :total="total" @pageChange="pageChange" />
      </el-card>
     
      <money ref="moneyRef" :memberId="memberId"/>
      <score ref="scoreRef" :memberId="memberId" />
      <password ref="passwordRef" :memberId="memberId" />
      <editComponent ref="editRef" :memberId="memberId" @getList="getList" />
      <detail ref="detailRef" :memberId="memberId" />
      <agent ref="agentRef" :memberId="memberId" @getList="getList" />
      <expire ref="expireRef" :memberId="memberId" />
      
    </div>
  </template>
  
  <script>
  import { lists, del } from "@/api/member";
  import editComponent from "./components/member/edit";
  import money from "./components/member/money";
  import score from "./components/member/score";
  import password from "./components/member/password";
  import detail from "./components/member/detail";
  import agent from "./components/member/agent";
  import expire from "./components/member/expire";
  

  import { confirm } from "@/utils/message-box.js";
  import { getTableIds } from "@/utils/index.js";
  import { mapState } from "vuex"
  export default {
    name: "index",
    components:{
      money,
      score,
      password,
      editComponent,
      detail,
      agent,
      expire,
    },
    computed: {
		...mapState('user', ["userInfo"]),
    },
    data () {
      return {
        query:{},
        list: [],
        total: 0,
        showSearch:true,
        memberId: 0,
      }
    },
    created() {
      this.rest()
    },
    methods:{
      queryData(){
        this.query = {
            id: "",
            keyword: "",
            status: "",
            agent: "",
            date: "",
            page: 1
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
      add: function () {
        this.memberId = 0
        this.$refs.editRef.title = "新增用户";
        this.$refs.editRef.dialogVisible = true
      },
      search(){
      this.query.page = 1
        this.getList();
      },
      delAll: function(){
        let ids = getTableIds(this.$refs.dragTable)
        let fn = () => {
          del(ids).then((response) => {
            this.$message({
              type: 'success',
              message: response.msg,
            });
            this.getList();
          }).catch((error) => {
            console.log(error);
          })
        }
        confirm("是否永久删除该数据？", fn);
      },
      del: function (index, e){
        let fn = () => {
          del(e.id).then((response) => {
            this.$message({
              type: 'success',
              message: response.msg,
            });
            this.list.splice(index, 1)
            this.total = that.total - 1
          }).catch((error) => {
            console.log(error);
          })
        }
        confirm("是否永久删除该数据？", fn);
      },
      handleExport:function (){
  
      },
      edit:function (index, e){
        this.$refs.editRef.title = "编辑用户";
        this.$refs.editRef.dialogVisible = true
        this.memberId = e.id
      },
      pageChange(page){
          this.query.page = page
          this.getList();
      },
      rest:function (){
        this.queryData()
        this.getList();
      },
      moreCommand(command, e){
        this.$refs[command].dialogVisible = true
        this.memberId = e.id
      }
    }
  }
  </script>
  
  <style scoped>
    .el-select{
        width: 100%;
    }
    .el-link{
      margin-right: 10px;
    }
  </style>
  