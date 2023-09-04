<template>
    <div class="app-container">
        <el-card class="show">
            <el-form inline :model="query" ref="queryForm" class="vk-form-inline" v-if="showSearch">
                <el-form-item label="菜单">
                    <el-input v-model="query.keyword"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="query.status" clearable>
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="2" label="禁用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" @click='search()'>搜索</el-button>
                    <el-button @click='rest()'>重置</el-button>
                </el-form-item>
            </el-form>
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="add"
                        v-auth="['menu:create']">新增</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="delAll"
                        v-auth="['menu:delete']">删除</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>

            <el-table :data="list" row-key="id" ref="dragTable" 
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"    
                v-fixed-scroll
            >
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="菜单" prop="name">
                </el-table-column>
                <el-table-column prop="icon" label="图标" align="center" width="100">
                    <template slot-scope="scope" v-if="scope.row.icon">
                    <svg-icon :icon-class="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column prop="perms" label="权限标识" align="center" />
                <el-table-column prop="component" label="组件" align="center" />
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 1?'':'success'">{{ scope.row.status == 1?'正常':"禁用" }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="路由" align="center" />
                <el-table-column prop="sort" label="排序" align="center" />
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" icon="el-icon-edit" 
                            :underline="false" v-auth="'role:edit'"
                            @click="edit(scope.$index, scope.row)">编辑</el-link>
                        <el-link type="primary" icon="el-icon-delete" 
                            :underline="false" v-auth="'role:delete'"
                            @click="del(scope.$index, scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-drawer :title="title" :visible.sync="drawerFormVisible" :direction="'rtl'" 
            :append-to-body="true"
            :modal-append-to-body="false"
            size="35%"
            custom-class="drawer" ref="drawer">
            <div class="vk-drawer__content pr10 pl10">
                <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="菜单类型" prop="type">
                        <el-radio-group v-model="form.type">
                            <el-radio-button :label="1">目录</el-radio-button>
                            <el-radio-button :label="2">菜单</el-radio-button>
                            <el-radio-button :label="3">按钮</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="上级菜单" prop="pid">
                        <treeselect
                            v-model="form.pid"
                            :options="form.routers"
                            :normalizer="normalizer"
                            :show-count="true"
                            placeholder="选择上级菜单"
                        />
                    </el-form-item>
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图标" prop="icon">
                        <el-popover
                            placement="bottom-start"
                            width="460"
                            trigger="click"
                            @show="$refs['iconSelect'].reset()"
                        >
                            <IconSelect ref="iconSelect" @selected="selected" :active-icon="form.icon" />
                            <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                                <svg-icon
                                    v-if="form.icon"
                                    slot="prefix"
                                    :icon-class="form.icon"
                                    style="width: 25px;"
                                />
                                <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                            </el-input>
                        </el-popover>
                    </el-form-item>
                    <el-form-item label="组件" prop="component" v-if="form.type == 2">
                        <el-input v-model="form.component" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="权限标识" prop="perms">
                        <el-input v-model="form.perms" autocomplete="off"></el-input>
                    </el-form-item>
                    <div v-if="form.type != 3">
                        <el-form-item label="路由" prop="path">
                            <el-input v-model="form.path" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否外链" prop="isFrame">
                            <el-radio-group v-model="form.isFrame" @change="$forceUpdate()">
                                <el-radio-button :label="1">是</el-radio-button>
                                <el-radio-button :label="0">否</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <el-form-item label="排序" prop="sort">
                        <el-input-number v-model="form.sort" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="form.status" @change="$forceUpdate()">
                            <el-radio-button :label="1">正常</el-radio-button>
                            <el-radio-button :label="2">禁用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="form.type != 3" label="是否显示" prop="hidden">
                        <el-radio-group v-model="form.hidden" @change="$forceUpdate()">
                            <el-radio-button :label="0">显示</el-radio-button>
                            <el-radio-button :label="1">隐藏</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item v-if="form.type == 2" label="是否缓存" prop="noCache">
                        <el-radio-group v-model="form.noCache" @change="$forceUpdate()">
                            <el-radio-button :label="1">是</el-radio-button>
                            <el-radio-button :label="0">否</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="vk-drawer__footer">
                    <el-button @click="drawerFormVisible = false">取 消</el-button>
                    <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
  
<script>
import { lists, edit, update, changeStatus, create, del } from "@/api/auth/menu";
import { confirm } from "@/utils/message-box.js";
import { getTableIds } from "@/utils/index.js";
import { mapState } from "vuex"
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";

export default {
    name: "index",
    computed: {
		...mapState('user', ["userInfo"]),
    },
    components: { Treeselect, IconSelect },
    data() {
        return {
            query: {},
            list: [],
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
            }
        },
        getList() {
            let that = this
            lists(that.query).then(res => {
                if (res.code === 200) {
                    that.list = res.data
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
                this.form.hidden = 0
                this.form.isFrame = 0
                this.form.noCache = 1
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
                    location.reload();
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
                    location.reload();
                }).catch((error) => {
                    console.log(error);
                })
            }
            confirm("是否永久删除该数据？", fn);
        },
        selected(name) {
            this.form.icon = name;
            this.$forceUpdate()
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
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.id,
                label: node.name,
                children: node.children
            };
        },
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let api = this.form.id ? update(this.form) : create(this.form)

                    api.then(res => {
                        this.drawerFormVisible = false
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        })
                        location.reload();
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
  