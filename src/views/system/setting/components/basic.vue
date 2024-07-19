<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
            <el-form-item label="网站名称" prop="name">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备案号" prop="beian">
                <el-input v-model="form.beian" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="禁止IP" prop="forbiddenip">
                <el-input v-model="form.forbiddenip" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="代理池" prop="forbiddenip">
                <el-switch
                    v-model="form.proxy"
                    >
                </el-switch>
            </el-form-item>
            <el-form-item label="LOGO" prop="logo">
                <div @click="$refs.pictureRef.dialogVisible = true">
                    <el-image 
                        style="width: 100px; height: 100px"
                        :src="form.logo" >
                    </el-image>
                </div>
            </el-form-item>     
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-throttle="2000">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <VkPicture ref="pictureRef" :maxCount="1" @selectImage="selectImage" />
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
        get("vksystem", "basic").then(res=>{
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
                    key: "basic",
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
        selectImage(data){
            this.form.logo = data.urls[0]
            this.$forceUpdate()
        }
    }
};
</script>