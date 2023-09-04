<template>
    <div class="vk-pagination">
        <el-pagination 
            @size-change="sizeChange"
            @current-change="currentChange" 
            :current-page="currentPage"
            :page-size="pageSize" :layout="layout" :total="total">
        </el-pagination>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            pageSize: 20,
            layout: "total, prev, pager, next, jumper",
        }
    },
    name: "pagination",
    props: {
        currentPage: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        // 分页相关
        sizeChange(val) {
            this.$emit("pageChange", val);
        },
        currentChange(val) {
            this.$emit("pageChange", val);
        },
    },
}
</script>
  
<style scoped>
.vk-pagination{
    margin-top: 10px !important;
}
</style>
  