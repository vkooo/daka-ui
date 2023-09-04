<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="推广金额" prop="amount">
                <el-input-number v-model="form.amount" autocomplete="off" />
                <div class="s-guidance">为0为不赠送</div>
            </el-form-item>

            <el-form-item label="推广短语" prop="phrases">
                <el-input type="textarea" v-model="form.phrases" autocomplete="off"></el-input>
                <div class="s-guidance">为空则为邀请链接，链接用 <span style="color: red;font-weight: bold;">%PATH%</span> 替代</div>
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

export default {
    data() {
        return {
            form: {},
            rules: {},
        };
    },
    created(){
        get("vksystem", "promotion").then(res=>{
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
                    key: "promotion",
                    data: this.form
                }).then(res=>{
                    if(res.code == 200){
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        })
                        this.$store.dispatch('website/init');
                    }
                })
            })
        },
    }
};
</script>