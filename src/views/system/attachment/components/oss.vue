<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
            <el-form-item label="开启阿里云OSS" prop="enable_oss" @change="$forceUpdate()">
                <el-radio-group v-model="form.enable_oss">
                    <el-radio-button :label="1">启用</el-radio-button>
                    <el-radio-button :label="2">禁用</el-radio-button>
                </el-radio-group>
                <div class="s-guidance">Access Key ID是您访问阿里云API的密钥，具有该账户完全的权限，请您妥善保管。</div>
            </el-form-item>  
            <el-form-item label="Access Key ID" prop="key">
                <el-input v-model="form.key" autocomplete="off"></el-input>
                <div class="s-guidance">Access Key ID是您访问阿里云API的密钥，具有该账户完全的权限，请您妥善保管。</div>
            </el-form-item>  
            <el-form-item label="Access Key Secret" prop="secret">
                <el-input v-model="form.secret" autocomplete="off"></el-input>
                <div class="s-guidance">Access Key Secret是您访问阿里云API的密钥，具有该账户完全的权限，请您妥善保管。(填写完Access Key ID 和 Access Key Secret 后请选择bucket)</div>
            </el-form-item>
            <el-form-item label="内网上传" prop="internal">
                <el-radio-group v-model="form.internal" @change="$forceUpdate()">
                    <el-radio-button :label="1">是</el-radio-button>
                    <el-radio-button :label="2">否</el-radio-button>
                </el-radio-group>
                <div class="s-guidance">如果此站点使用的是阿里云ecs服务器，并且服务器与bucket在同一地区（如：同在华北一区），您可以选择通过内网上传的方式上传附件，以加快上传速度、节省带宽。</div>
            </el-form-item>  
            <el-form-item label="Bucket选择" prop="bucket">
                <el-input v-model="form.bucket" autocomplete="off"></el-input>
                <div class="s-guidance">完善Access Key ID和Access Key Secret资料后可以选择存在的Bucket(请保证bucket为可公共读取的)，否则请手动输入。</div>
            </el-form-item>  
            <el-form-item label="自定义URL" prop="url">
                <el-input  v-model="form.url" autocomplete="off"></el-input>
                <div class="s-guidance">阿里云oss支持用户自定义访问域名，如果自定义了URL则用自定义的URL，如果未自定义，则用系统生成出来的URL。注：自定义url开头加http://或https://结尾不加 ‘/’例：http://abc.com</div>
            </el-form-item>  
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-throttle="2000">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <VkPicture ref="pictureRef" />
    </div>
</template>

<script>
import { save, get } from "@/api/settings";

export default {
    data() {
        return {
            form: {
                enable_oss: 2
            },
            rules: {},
        };
    },
    created(){
        get("upload", "oss").then(res=>{
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
                        key: "oss",
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