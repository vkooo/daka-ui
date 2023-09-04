<template>
    <div class="app-container">
        <el-card class="show">
            <el-form inline :model="query" ref="queryForm" class="demo-form-inline" v-if="showSearch">
                <el-form-item label="名称">
                    <el-input v-model="query.keyword"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="query.status" clearable>
                        <el-option value="1" label="启用"></el-option>
                        <el-option value="2" label="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker v-model="query.date" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="yyyy-MM-dd" />
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" type="primary" @click='search()'>搜索</el-button>
                    <el-button @click='rest()'>重置</el-button>
                </el-form-item>
            </el-form>
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="add">新增</el-button>
                    <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="delAll">删除</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>

            <el-table :data="list" row-key="id" ref="dragTable" v-fixed-scroll>
                <!-- 多选 -->
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="名称" prop="name" />
                <el-table-column label="分类" prop="category.name" />
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-switch
                        :active-value="1"
                        :inactive-value="2"
                        v-model="scope.row.status"
                        @change="(e) => status(e, scope.row.id, scope.$index)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" icon="el-icon-edit" :underline="false"
                            @click="edit(scope.$index, scope.row)">编辑</el-link>
                        <el-link type="primary" icon="el-icon-delete" :underline="false" 
                            @click="del(scope.$index, scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :total="total" @pageChange="pageChange" />
        </el-card>
        <el-dialog
            :visible.sync="dialogFormVisible"
            append-to-body
            :title="title"
        >
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>

                <el-form-item label="分类" prop="category_id">
                    <el-select v-model="form.category_id" placeholder="请选择">
                      <el-option
                          v-for="item in form.categories"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id" />
                  </el-select>
                </el-form-item>

                <el-form-item label="实习记录" prop="record">
                    <el-input type="textarea" v-model="form.record"  maxlength="10000"
                    show-word-limit autocomplete="off" />
                </el-form-item>

                <el-form-item label="实习总结" prop="sum_up">
                    <el-input type="textarea" v-model="form.sum_up" maxlength="10000"
                    show-word-limit autocomplete="off" />
                </el-form-item>
                
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status" @change="$forceUpdate()">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="vk-drawer__footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import { lists, edit, update, create, del } from "@/api/warehouse/zxjy";
import { confirm } from "@/utils/message-box.js";
import { getTableIds } from "@/utils/index.js";
import { mapState } from "vuex"
export default {
    name: "index",
    computed: {
        ...mapState('user', ["userInfo"]),
    },
    data() {
        return {
            query: {},
            list: [],
            total: 0,
            title: "",
            form: {},
            dialogFormVisible: false,
            showSearch: true,
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'change' }
                ],
                category_id: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                record: [
                    { required: true, message: '请输入实习记录', trigger: 'change' }
                ],
                sum_up: [
                    { required: true, message: '请输入实习总结', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
            }
        }
    },
    created() {
        this.rest()
    },
    methods: {
        queryData() {
            this.query = {
                keyword: "",
                status: "",
                date: "",
                page: 1
            }
        },
        getList() {
            let that = this
            lists(that.query).then(res => {
                if (res.code === 200) {
                    const { list, total } = res.data;
                    that.list = list
                    that.total = total
                }
            }).catch(error => {
                console.log(error)
            })
        },
        search() {
            this.getList();
        },
        pageChange(page){
            this.queryData()
            this.page = page
            this.getList();
        },
        add: function () {
            let that = this
            this.form = {}
            this.title = "新增仓库";
            edit().then(res => {
                this.form = res.data
                this.form.status = 1
                this.dialogFormVisible = true
            })
        },
        delAll: function () {
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
        del: function (index, e) {
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
        handleExport: function () {

        },
        edit: function (index, e) {
            this.title = "编辑仓库";
            edit(e.id).then(res => {
                this.form = res.data
                this.dialogFormVisible = true
            })
        },
        pageChange(page){
            this.queryData()
            this.page = page
            this.getList();
        },
        rest: function () {
            this.queryData()
            this.getList();
        },
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let api = this.form.id? update(this.form): create(this.form)
                    api.then(res => {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        })
                        this.getList();
                        this.dialogFormVisible = false
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
.el-select {
    width: 100%;
}
</style>
  