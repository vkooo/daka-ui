<template>
    <div class="app-container">
        <el-card class="show">
            <el-form inline :model="query" ref="queryForm" class="demo-form-inline" v-if="showSearch">
                <el-form-item label="用户邮箱">
                    <el-input v-model="query.keyword"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="query.status" clearable>
                        <el-option value="1" label="未支付"></el-option>
                        <el-option value="2" label="已支付"></el-option>
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
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>

            <el-table :data="list" row-key="id" ref="dragTable" v-fixed-scroll>
                <!-- 多选 -->
                <el-table-column label="ID" prop="id" />
                <el-table-column label="订单号" prop="ordersn" />
                <el-table-column label="用户" prop="member.email" />
                <el-table-column label="商品" prop="product_info_arr.name" />
                <el-table-column label="金额" prop="price" />
                <el-table-column prop="status_text" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 1 ? '' : 'success'">{{ scope.row.status_text}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-link type="primary" :underline="false"
                            @click="edit(scope.$index, scope.row)">详情</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination :total="total" @pageChange="pageChange" />
        </el-card>
        <el-drawer :title="title" v-if="drawerFormVisible" :visible.sync="drawerFormVisible" :direction="'rtl'" :append-to-body="true" :modal-append-to-body="false" 
            size="50%"
            custom-class="drawer" ref="drawer">
            <div class="vk-drawer__content  pr10 pl10">
                <div class="vk-section">
                    <div class="title">订单信息</div>
                    <ul class="list">
                        <li class="item">
                            <div>订单编号：</div>
                            <div class="value">
                                {{ form.ordersn }}
                            </div>
                        </li>
                        <li class="item">
                            <div>状态：</div>
                            <div class="value">
                                <el-tag :type="form.status == 1 ? '' : 'success'">{{ form.status_text}}</el-tag>
                            </div>
                        </li>
                        <li class="item">
                            <div>金额：</div>
                            <div class="value">
                                {{ form.price }}
                            </div>
                        </li>
                        <li class="item">
                            <div>支付方式：</div>
                            <div class="value">
                                {{ form.type }}
                            </div>
                        </li>
                        <li class="item">
                            <div>支付时间：</div>
                            <div class="value">
                                {{ form.created_at }}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="vk-section">
                    <div class="title">用户信息</div>
                    <ul class="list">
                        <li class="item">
                            <div>用户：</div>
                            <div class="value">
                                {{ form.member.email }}
                            </div>
                        </li>
                        <li class="item">
                            <div>用户ID：</div>
                            <div class="value">
                                {{ form.member.id }}
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="vk-section">
                    <div class="title">服务信息</div>
                    <ul class="list">
                        <li class="item">
                            <div>商品名称：</div>
                            <div class="value">
                                {{ form.product.name }}
                            </div>
                        </li>
                        <li class="item">
                            <div>天数：</div>
                            <div class="value">
                                {{ form.product.day }}
                            </div>
                        </li>
                        <li class="item">
                            <div>类型：</div>
                            <div class="value">
                                {{ form.product.type_text }}
                            </div>
                        </li>
                        <li class="item">
                            <div>归属：</div>
                            <div class="value">
                                {{ form.product.belong_text }}
                            </div>
                        </li>
                    </ul>
                </div>
                <div slot="footer" class="vk-drawer__footer">
                    <el-button @click="drawerFormVisible = false">确 定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
  
<script>
import { lists, edit } from "@/api/order/product";
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
            this.query.page = 1
            this.getList();
        },
        pageChange(page){
            this.query.page = page
            this.getList();
        },
       
        edit: function (index, e) {
            this.title = "订单详情";
            edit(e.id).then(res => {
                this.form = res.data
                this.drawerFormVisible = true
            })
        },
        rest: function () {
            this.queryData()
            this.getList();
        },
    }
}
</script>
  
<style scoped lang="scss">
.el-select {
    width: 100%;
}
</style>
  