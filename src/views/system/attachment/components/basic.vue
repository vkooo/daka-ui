<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
            <el-form-item label="缩略设置" prop="enable_thumb">
                <el-radio-group v-model="form.enable_thumb">
                    <el-radio-button :label="1">启用</el-radio-button>
                    <el-radio-button :label="2">禁用</el-radio-button>
                </el-radio-group>
                <div class="s-guidance">是否开启图片缩略图</div>
            </el-form-item>  
            <el-form-item label="支持后缀" prop="ext">
                <el-input v-model="form.ext" autocomplete="off"></el-input>
                <div class="s-guidance">以 “|” 分割</div>
            </el-form-item>
            <el-form-item label="支持文件大小" prop="size">
                <el-input type="number" v-model="form.size" autocomplete="off"></el-input>
                <div class="s-guidance">默认单位为MB</div>
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
            form: {
                enable_thumb: 2
            },
            rules: {},
        };
    },
    created(){
        get("upload", "default").then(res=>{
            if(res.code == 200 && res.data){
                this.form = res.data
            }
        })
    },
    methods: {
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    save({
                        name: "upload",
                        key: "default",
                        data: this.form
                    }).then(res=>{
                        if(res.code == 200){
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            })
                        }
                    })
                }
            })
        }
    }
};
</script>