<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="使用帮助" prop="help">
                <quii-editor v-model="form.help" @updateValue="(content)=>{
                    form.help = content
                }"/>
            </el-form-item>

            <el-form-item label="联系客服" prop="contact">
                <el-input v-model="form.contact" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="售后群" prop="sales_group">
                <el-input v-model="form.sales_group" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-throttle="2000">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { save, get } from "@/api/settings";
import QuiiEditor from "@/components/QuiiEditor";

export default {
    components: {QuiiEditor},
    data() {
        return {
            form: {},
            rules: {},
        };
    },
    created(){
        get("vksystem", "help").then(res=>{
            if(res.code == 200 && res.data){
                this.form = res.data
            }
        })
    },
    methods: {
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                save({
                    name: "vksystem",
                    key: "help",
                    data: this.form
                }).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        })
                    }
                })
            })
        },
    }
};
</script>