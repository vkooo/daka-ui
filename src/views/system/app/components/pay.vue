<template>
    <div>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
            <el-form-item label="是否沙盒" prop="WECHAT_PAYMENT_SANDBOX">
                <el-radio-group v-model="form.WECHAT_PAYMENT_SANDBOX" @change="$forceUpdate()">
                    <el-radio-button :label="true">是</el-radio-button>
                    <el-radio-button :label="false">否</el-radio-button>
                </el-radio-group>
            </el-form-item>  
            <el-form-item label="Appid" prop="WECHAT_PAYMENT_APPID">
                <el-input v-model="form.WECHAT_PAYMENT_APPID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商户id" prop="WECHAT_PAYMENT_MCH_ID">
                <el-input v-model="form.WECHAT_PAYMENT_MCH_ID" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="商户密钥" prop="WECHAT_PAYMENT_KEY">
                <el-input v-model="form.WECHAT_PAYMENT_KEY" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="证书cert" prop="WECHAT_PAYMENT_CERT_PATH">
                <el-upload
                class="upload-demo"
                :action="domain + '/admin/settings/wechat/upload'"
                :headers="headers"
                :on-success="(response, file, fileList)=>successUpload(response, 'WECHAT_PAYMENT_CERT_PATH')"
                :limit="1">
                    <el-button size="small" type="primary">
                        点击上传
                        <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                    {{ WECHAT_PAYMENT_CERT_PATH?"（已上传）":"" }}
                </el-upload>
                <div class="s-guidance">可选, 仅在退款、红包等情况时需要用到</div>
            </el-form-item>     
            <el-form-item label="证书key" prop="WECHAT_PAYMENT_KEY_PATH">
                <el-upload
                class="upload-demo"
                :action="domain + '/admin/settings/wechat/upload'"
                :headers="headers"
                :on-success="(response, file, fileList)=>successUpload(response, 'WECHAT_PAYMENT_KEY_PATH')"
                :limit="1">
                    <el-button size="small" type="primary">
                        点击上传
                        <i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                    {{ WECHAT_PAYMENT_KEY_PATH?"（已上传）":"" }}
                </el-upload>
                <div class="s-guidance">可选, 仅在退款、红包等情况时需要用到</div>
            </el-form-item>    
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-throttle="2000">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { savePay } from "@/api/settings/wechat";
import { get } from "@/api/settings";
import { getToken } from '@/utils/auth'

let DOMAIN = process.env.VUE_APP_BASE_DOMAIN

export default {
    data() {
        return {
            form: {
                WECHAT_PAYMENT_SANDBOX: false
            },
            rules: {
                WECHAT_PAYMENT_APPID: [
                    { required: true, message: '请输入Appid', trigger: 'blur' },
                ],
                WECHAT_PAYMENT_MCH_ID: [
                    { required: true, message: '请输入Secret', trigger: 'blur' }
                ],
            },
            domain: DOMAIN,
            headers: {
                Authorization: "Bearer " + getToken()
            },
            WECHAT_PAYMENT_CERT_PATH: false,
            WECHAT_PAYMENT_KEY_PATH: false,
        };
    },
    created(){
        get("wechat", "payment.default").then(res=>{
            if(res.code == 200 && res.data){
                this.form = {
                    WECHAT_PAYMENT_SANDBOX: res.data.sandbox == 1,
                    WECHAT_PAYMENT_APPID: res.data.app_id,
                    WECHAT_PAYMENT_MCH_ID: res.data.mch_id,
                    WECHAT_PAYMENT_KEY: res.data.key,
                }
                if(res.data.cert_path){
                    this.WECHAT_PAYMENT_CERT_PATH = true
                }
                if(res.data.key_path){
                    this.WECHAT_PAYMENT_KEY_PATH = true
                }
            }
        })
    },
    methods: {
        successUpload(response, type){
            const data = response.data
            this.form[type] = data
            console.log(this.form)
        },
        onSubmit() {
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    savePay({
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