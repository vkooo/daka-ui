<template>
    <div class="app-container">
        <el-card class="show">
            <el-form inline :model="query" ref="queryForm" class="vk-form-inline" v-if="showSearch">
                <el-form-item label="角色">
                    <el-input v-model="query.keyword"></el-input>
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
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="add"
                        v-auth="['role:create']">新增</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="delAll"
                        v-auth="['role:delete']">删除</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
                        v-auth="['role:export']">导出</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>

            <el-table :data="list" row-key="id" ref="dragTable" v-fixed-scroll>
                <!-- 多选 -->
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="角色" prop="name">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-switch :active-value="1" :inactive-value="2" v-model="scope.row.status" v-auth="'role:status'"
                            v-if="scope.row.id !== 1" @change="(e) => status(e, scope.row.id, scope.$index)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope" v-if="scope.row.id !== 1">
                        <el-link type="primary" icon="el-icon-edit" 
                            :underline="false" v-auth="'role:edit'"
                            @click="edit(scope.$index, scope.row)">编辑</el-link>
                        <el-link type="primary" icon="el-icon-delete" 
                            :underline="false" v-auth="'role:delete'"
                            @click="del(scope.$index, scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :total="total" @pageChange="pageChange" />
        </el-card>

        <el-drawer :title="title" 
            :visible.sync="drawerFormVisible" :direction="'rtl'" 
            :append-to-body="true"
            :modal-append-to-body="false"
            custom-class="drawer" ref="drawer">
            <div class="vk-drawer__content pr10 pl10">
                <el-form :model="form" :rules="rules"
                    ref="ruleForm" label-position="top"
                    >
                    <el-form-item label="角色" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status" @change="$forceUpdate()">
                        <el-radio-group v-model="form.status">
                            <el-radio-button :label="1">正常</el-radio-button>
                            <el-radio-button :label="2">禁用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注" prop="desc">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入备注"
                            v-model="form.desc">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="菜单分配">
                        <el-tree :data="form.menus" show-checkbox default-expand-all node-key="id" ref="menuRef"
                            @check-change="(data, check) => checkChange(data, check)"
                            @check="(data, check) => handleCheck(data, check)" check-strictly highlight-current
                            :default-checked-keys="form.menu_ids">
                            <span class="custom-tree-node" slot-scope="{ node, data }">
                                {{ data.name }}
                            </span>
                        </el-tree>
                    </el-form-item>
                </el-form>
                <div class="vk-drawer__footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
  
<script>
import { lists, edit, update, changeStatus, create, del } from "@/api/auth/role";
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
            drawerFormVisible: false,
            showSearch: true,
            rules: {
                name: [
                    { required: true, message: '请输入角色', trigger: 'blur' },
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
                page: 1,
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
        status(e, id, index) {
            changeStatus(id, e).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        },
        add: function () {
            this.form = {}
            this.title = "新增角色";
            edit().then(res => {
                this.form = res.data
                this.form.status = 1
                this.drawerFormVisible = true
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
            this.title = "编辑角色";
            edit(e.id).then(res => {
                this.form = res.data
                this.drawerFormVisible = true
            })
        },
        rest: function () {
            this.queryData()
            this.getList();
        },
        checkChange(data, check) {
            let $data = this.$refs.menuRef
            // 父节点操作
            if (data.pid) {
                if (check === true) {
                    // 如果选中，设置父节点为选中
                    $data.setChecked(data.pid, true);
                } else {
                    // 如果取消选中，检查父节点是否该取消选中（可能仍有子节点为选中状态）
                    var parentNode = $data.getNode(data.pid);

                    var parentHasCheckedChild = false;
                    for (
                        var i = 0, parentChildLen = parentNode.childNodes.length;
                        i < parentChildLen;
                        i++
                    ) {
                        if (parentNode.childNodes[i].checked === true) {
                            parentHasCheckedChild = true;
                            break;
                        }
                    }
                    if (!parentHasCheckedChild)
                        $data.setChecked(data.pid, false);
                }
            }
            // 子节点操作，如果取消选中，取消子节点选中
            if (data.children != null && check === false) {
                for (var j = 0, len = data.children.length; j < len; j++) {
                    var childNode = $data.getNode(data.children[j].id);
                    if (childNode.checked === true) {
                        $data.setChecked(childNode.data.id, false);
                    }
                }
            }
        },
        selectChildren(data) {
            let ref = "menuRef"
            data && data.children && data.children.map(item => {
                this.$refs[ref].setChecked(item.id, true);
                if (data.children) {
                    this.selectChildren(item, ref)
                }
            });
        },
        handleCheck(data, { checkedKeys }) {
            let ref = "menuRef"

            // 节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
            //如果为取消
            if (checkedKeys.includes(data.id)) {
                //如果当前节点有子集
                this.selectChildren(data, ref);
            }
            let $data = this.$refs[ref]
            this.form.menu_ids = $data.getCheckedKeys().concat($data.getHalfCheckedKeys());
        },
        pageChange(page){
            this.page.page = page
            this.getList();
        },
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let api = this.form.id ? update(this.form) : create(this.form)

                    api.then(res => {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        })
                        this.drawerFormVisible = false
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
  
<style scoped></style>
  