<template>
    <div class="app-container">
      <el-card class="show">
        <el-form inline :model="query" ref="queryForm" class="demo-form-inline" v-if="showSearch">
          <el-form-item label="账号">
            <el-input v-model="query.account" ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="query.status" clearable>
              <el-option value="1" label="启用"></el-option>
              <el-option value="2" label="禁用"></el-option>
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
              <el-button type="primary" icon="el-icon-search" @click='search()'>搜索</el-button>
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
              v-auth="['user:create']"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              @click="delAll"
              v-auth="['user:delete']"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <!-- <el-button
              type="warning"
              plain
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
              v-auth="['user:export']"
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
              label="账号"
              prop="account"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope"  v-if="scope.row.id !== 1">
                <el-switch
                  :active-value="1"
                  :inactive-value="2"
                  v-model="scope.row.status"
                  v-auth="'user:status'"
                  v-if="userInfo.id != scope.row.id"
                  @change="(e) => status(e, scope.row.id, scope.$index)"
                >
                </el-switch>
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
              <template slot-scope="scope"  v-if="scope.row.id !== 1">
                <el-link
                  type="primary"
                  icon="el-icon-edit"
                  :underline="false"
                  v-auth="'user:add'"
                  @click="edit(scope.$index, scope.row)"
                  v-if="userInfo.id != scope.row.id"
                >编辑</el-link>
                <el-link
                  type="primary"
                  icon="el-icon-delete"
                  :underline="false"
                  v-auth="'user:del'"
                  @click="del(scope.$index, scope.row)"
                  v-if="userInfo.id != scope.row.id"
                >删除</el-link>
              </template>
            </el-table-column>
          </el-table>
          <Pagination :total="total" @pageChange="pageChange" />
      </el-card>
      <el-dialog
        :visible.sync="dialogFormVisible"
        append-to-body
        :title="title"
        width="600px"
      >
        <div class="dialog-content">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="头像" prop="avatar">
              <div @click="$refs.pictureRef.dialogVisible = true">
                <el-image 
                    style="width: 100px; height: 100px"
                    :src="form.avatar" >
                </el-image>
              </div>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" >
              <el-input type="number" v-model="form.mobile" autocomplete="off" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" >
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色"  prop="role">
              <el-select v-model="form.role" multiple placeholder="请选择">
                <el-option
                v-for="item in form.roles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status" @change="$forceUpdate()">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="2">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="desc" >
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入备注"
                v-model="form.desc">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
      <VkPicture ref="pictureRef" :maxCount="1" @selectImage="selectImage" />
    </div>
  </template>
  
  <script>
  import { lists, edit, update, changeStatus, create, del } from "@/api/auth/user";
  import { confirm } from "@/utils/message-box.js";
  import { getTableIds } from "@/utils/index.js";
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
        title: "",
        form:{},
        dialogFormVisible: false,
        showSearch:true,
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          role: [
            {required: true, message: '请选择角色', trigger: 'change' }
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change' }
          ],
        }
      }
    },
    created() {
      this.rest()
    },
    methods:{
      queryData(){
        this.query = {
          account: "",
          status: "",
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
      search(){
      this.query.page = 1
        this.getList();
      },
      status(e, id, index){
        changeStatus(id, e).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      },
      add:function (){
        this.form = {}
        this.dialogFormVisible = true
        this.title = "新增用户";
        this.rules.password = [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
        edit().then(res => {
          this.form = res.data
          this.form.status = 1
        })
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
        this.title = "编辑用户";
        this.rules.password = [{}]
        edit(e.id).then(res => {
          this.form = res.data
        })
        this.dialogFormVisible = true
      },
      rest:function (){
        this.queryData()
        this.getList();
      },
      pageChange(page){
          this.query.page = page
          this.getList();
      },
      selectImage(data){
        this.form.avatar = data.urls[0]
        this.$forceUpdate()
      },
      submit(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let api = this.form.id? update(this.form): create(this.form)
            
            api.then(res => {
              this.$message({
                message: "操作成功",
                type: "success"
              })
              this.dialogFormVisible = false
              this.getList();
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
  