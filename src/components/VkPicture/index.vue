<template>
    <div>
        <el-dialog title="请选择图片" 
            width="70%"
            :visible.sync="dialogVisible" @close="dialogClose">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="选择分类" type="text" clearable v-model="cateSeach.keyword">
                        <el-button type="primary" slot="append" @click="getCategoryList" icon="el-icon-search"></el-button>
                    </el-input>
                    <div class="pt10 pb10">
                        <el-tree :data="categoryList" 
                            :props="defaultProps" @node-click="cateTreeClick"
                            :render-content="renderTreeContent"
                        />
                    </div>
                </el-col>
                <el-col :span="18">
                    <div>
                        <el-button class="mb10 mr10" size="mini" type="primary" @click="selectImage">使用选中图片</el-button>
                        <el-upload
                            ref="upload"
                            :action="'/admin/attachment/upload'"
                            multiple
                            :show-file-list="false"
                            :headers="headers"
                            :auto-upload="false"
                            :on-change="fileChange"
                            :on-success="successUpload"
                            v-auth="['attachment:upload']"
                            style="display: inline-block;"
                            class="mb10 mr10"
                        >
                            <el-button size="mini" type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-upload>

                        <el-button class="mb10 mr10" size="mini" type="success" @click="categoryEdit(0)">添加分类</el-button>
                        <el-button class="mb10 mr10" size="mini" type="danger" :disabled="disabled">删除图片</el-button>
                    </div>
                    <div class="vk-flex">
                        <div class="mr10">
                            <el-input style="width: 230px;" placeholder="请输入图片名称搜索" clearable v-model="attachment.keyword">
                                <el-button type="primary" slot="append" icon="el-icon-search" @click="getList"></el-button>
                            </el-input>
                        </div>
                        <treeselect
                            style="width: 204px;"
                            v-model="moveCategoryId"
                            :options="categoryAllList"
                            :normalizer="normalizer"
                            :show-count="true"
                            placeholder="图片移动至"
                            @select="moveCategorySelect"
                            :disabled="disabled"
                        />
                    </div>
                    <div class="conters mt10">
                        <div class="gridPic" v-for="(item, index) in list">
                            <div @click="imageClick(item)" :class="selectIds.indexOf(item.id) > -1?'active':''">
                                <el-image 
                                    class="square-image"
                                    :src="item.full_url" />
                            </div>
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                                <p v-if="!item.edit" class="name" style="width: 80%;">{{item.name}}</p>
                                <el-input v-else v-model="item.name"></el-input>
                                <i @click="editName(index)" :class="item.edit?'el-icon-check':'el-icon-edit'"></i>
                            </div>
                            <p class="number"
                                v-if="selectIds.indexOf(item.id) > -1"
                            >
                                <el-badge :value="1" class="item">
                                    <i class="demo-badge" />
                                </el-badge>
                            </p>
                        </div>
                    </div>
                    <Pagination :total="total" @pageChange="pageChange" />

                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="添加分类" :visible.sync="dialogCategoryVisible">
            <el-form :model="categoryForm" 
                ref="categoryFormRef"
                :rules="categoryRules" label-width="80px">
                <el-form-item label="上级分类" prop="pid">
                    <treeselect
                        style="width: 204px;"
                        v-model="categoryForm.pid"
                        :options="categoryAllList"
                        :normalizer="normalizer"
                        :show-count="true"
                        placeholder="请选择上级分类"
                    />
                </el-form-item>
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="categoryForm.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="categoryForm.sort" placeholder="请输入排序" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="categorySubmit" v-throttle="2000">立即创建</el-button>
                    <el-button @click="dialogCategoryVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import * as attachmentApi from "@/api/attachment";
import * as categoryApi from "@/api/attachment/category";
import { confirm } from "@/utils/message-box.js";
import { getToken } from '@/utils/auth'
import SparkMD5 from 'spark-md5'

let DOMAIN = process.env.VUE_APP_BASE_DOMAIN
export default {
    props:{
        maxCount: {
            type: [Number, String],
            default: 0
        }
    },
    components: { Treeselect },
    data() {
        return {
            dialogVisible: false,
            list: [],
            total: 0,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            selectIds:[],
            selectUrls:[],
            categoryList: [],
            categoryAllList: [],
            moveCategoryId: null,
            disabled: true,
            cateSeach: {},
            attachment: {},
            dialogCategoryVisible: false,
            categoryForm: {},
            categoryRules: {
                name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ],
                sort: [
                    { required: true, message: '请输入排序', trigger: 'blur' },
                ],
            },
            domain: DOMAIN,
            headers: {
                Authorization: "Bearer " + getToken()
            }
        };
    },
    watch:{
        selectIds:{
            handler(newVal, oldVal){
                this.disabled = !(newVal.length > 0)
            },
            immediate: true,
            deep: true
        }
    },
    created: function(){
        this.getCategoryList()
        this.getCategoryAllList()
        this.getList()
    },
    methods: {
        getList(){
            attachmentApi.lists(this.attachment).then(res=>{
                const { list, total } = res.data
                this.list = list
                this.total = total
            }) 
        },
        getCategoryList(){
            categoryApi.lists(this.cateSeach).then(res=>{
                this.categoryList = res.data
            })
        },
        getCategoryAllList(){
            categoryApi.allLists().then(res=>{
                this.categoryAllList = res.data
            })
        },
        editName(index){
            let e = !this.list[index].edit;
            this.list[index].edit =e

            if(!e){
                attachmentApi.editName(this.list[index]).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        })
                    }
                })
            }
        },
        imageClick(item){
            let ids = new Set(this.selectIds)
                , urls = new Set(this.selectUrls);
            
            let fun = function (params, p) {
                params.has(p)? params.delete(p): params.add(p)
                return [...params];
            }
            this.selectIds = fun(ids, item.id)
			this.selectUrls = fun(urls, item.full_url)
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
        renderTreeContent(h, { node, data, store }) {
            let html = ""
            if(data.id > 0){
                html = <span>
                    <el-button size="mini" type="text" on-click={ () => this.categoryEdit(data.id) }>编辑</el-button>
                    <el-button size="mini" type="text" on-click={ () => this.categoryDel (data.id) }>删除</el-button>
                </span>
            }
            return (
            <span class="custom-tree-node">
                <span>{data.name}</span>
                {html}
            </span>);
        },
        cateTreeClick(data){
            this.attachment.category_id = data.id
            this.getList()     
        },
        categoryEdit(id){
            categoryApi.edit(id).then(res=>{
                this.categoryForm = id?res.data: {}
                this.dialogCategoryVisible = true 
            })
        },
        categoryDel(id){
            confirm("是否永久删除该数据？", ()=>{
                categoryApi.del(id).then(res=>{
                    this.$message({
                        type: 'success',
                        message: res.msg,
                    });
                    this.getCategoryList()
                })
            });
        },
        categorySubmit(){
            let that = this
            let form = that.categoryForm
            this.$refs.categoryFormRef.validate((valid) => {
                if (valid) {
                    let api = form.id? categoryApi.update(form): categoryApi.create(form)
                    api.then(res=>{
                        that.categoryForm = res.data
                        this.getCategoryList()
                        this.getCategoryAllList()
                        this.dialogCategoryVisible = false
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        fileChange(file){
            const _this = this  
            let fileReader = new FileReader()
            let Spark = new SparkMD5.ArrayBuffer()
            fileReader.readAsArrayBuffer(file.raw)
            fileReader.onload = function(e){
                Spark.append(e.target.result)
                let md5 = Spark.end()

                _this.$nextTick(_this.fileMd5(file, md5))
            }
            return false
        },
        fileMd5(file, md5){
            if(file.status != 'ready') {
                return false
            }
            attachmentApi.fileMd5({
                md5: md5
            }).then(res=>{
                if(res.code === 200){
                    if(res.data != null){
                        const data = res.data
                        this.list.push(data)
                        this.$refs.upload.handleRemove(file);
                        return
                    }else{
                        this.$refs.upload.submit();
                    }
                }
            })
        },
        successUpload(response, file, fileList){
            const data = response.data
            this.list.push(data)
        },
        pageChange(page){
            this.queryData()
            this.page = page
            this.getList();
        },
        moveCategorySelect(node){
            if(this.selectIds.length <= 0){
                this.$throw("请选择移动图片")
            }
            attachmentApi.move({
                categoryId: node.id,
                ids: this.selectIds
            }).then(res=>{
                this.$message({
                    message: "操作成功",
                    type: "success"
                })
            })
            console.log()
        },
        selectImage(){
            let ids = this.selectIds;
            let urls = this.selectUrls;
            let maxCount = Number(this.maxCount)
            if(urls.length <= 0)
                this.$throw("请选择图片")
            if(maxCount > 0 && urls.length > maxCount){
                this.$throw("最多选择" + maxCount + "张图片")
            }
            this.$emit("selectImage", {
                ids: ids,
                urls: urls,
            })
            this.dialogClose()
        },
        dialogClose(){
            this.cateSeach = {}
            this.attachment = {}
            this.selectIds = []
            this.selectUrls = []
            this.dialogVisible = false
            this.getList()
        }
    }
};
</script>
<style scoped lang="scss">
.conters{
    display: flex;
    flex-wrap: wrap;
    .gridPic{
        margin-right: 20px;
        margin-bottom: 10px;
        width: 110px;
        height: 150px;
        cursor: pointer;
        position: relative;
        .active{
            border: 2px solid #5fb878;
        }

        .name{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #515a6e;
            font-size: 12px;
        }
        .number{
            position: absolute;
            top: 0;
            right: 0;
            margin: 0;
        }
        .demo-badge{
            width: 42px;
            height: 42px;
            background: transparent;
            border-radius: 6px;
            display: inline-block;
        }
        ::v-deep .el-badge__content{
            position: absolute;
            transform: translateX(50%);
            top: -10px;
            right: 0;
            height: 20px;
            border-radius: 10px;
            min-width: 20px;
        }
    }
}
::v-deep .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>