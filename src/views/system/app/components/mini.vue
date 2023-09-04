<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
            <el-form-item label="Appid" prop="WECHAT_MINI_PROGRAM_APPID">
                <el-input v-model="form.WECHAT_MINI_PROGRAM_APPID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Secret" prop="WECHAT_MINI_PROGRAM_SECRET">
                <el-input v-model="form.WECHAT_MINI_PROGRAM_SECRET" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="Token(令牌)" prop="WECHAT_MINI_PROGRAM_TOKEN">
                <el-input v-model="form.WECHAT_MINI_PROGRAM_TOKEN" autocomplete="off"></el-input>
                <div class="s-guidance">必须为英文或数字，长度为3-32字符</div>
            </el-form-item>
            <el-form-item label="EncodingAESKey" prop="WECHAT_MINI_PROGRAM_AES_KEY">
                <el-input v-model="form.WECHAT_MINI_PROGRAM_AES_KEY" autocomplete="off"></el-input>
                <div class="s-guidance">消息加密密钥由43位字符组成，字符范围为A-Z,a-z,0-9</div>
            </el-form-item>     
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-throttle="2000">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { save } from "@/api/settings/wechat";
import { get } from "@/api/settings";

export default {
    data() {
        return {
            form: {},
            rules: {
                WECHAT_MINI_PROGRAM_APPID: [
                    { required: true, message: '请输入Appid', trigger: 'blur' },
                ],
                WECHAT_MINI_PROGRAM_SECRET: [
                    { required: true, message: '请输入Secret', trigger: 'blur' }
                ],
            },
        };
    },
    created(){
        get("wechat", "mini_program.default").then(res=>{
            if(res.code == 200 && res.data){
                this.form = {
                    WECHAT_MINI_PROGRAM_APPID: res.data.app_id,
                    WECHAT_MINI_PROGRAM_SECRET: res.data.secret,
                    WECHAT_MINI_PROGRAM_TOKEN: res.data.token,
                    WECHAT_MINI_PROGRAM_AES_KEY: res.data.aes_key,
                }
            }
        })
    },
    methods: {
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                let form = this.form
                if(valid){
                    save({
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
        },
    }
};
</script>