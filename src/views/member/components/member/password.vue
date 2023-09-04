<template>
    <div>
        <el-dialog
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            append-to-body
            title="修改用户密码"
        >
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password" autocomplete="off" />
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { setPassword, edit } from "@/api/member";
import { mapState } from "vuex"
export default {
    props:{
        memberId: {
            type: [Number, String],
        default: 0
      }
    },
    watch:{
        dialogVisible: {
            handler(newVal, oldVal){
                this.form = {}
                if(newVal){
                    edit(this.memberId).then(res => {
                        this.form.data = 0
                        this.form = res.data
                    })
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
		...mapState('user', ["userInfo"]),
    },
    data () {
        return {
            dialogVisible: false,
            rules: {
                password: [
                    {required: true, message: '请输入密码', trigger: 'change' }
                ],
            },
            form: {},
        }
    },
    methods:{
        submit(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    setPassword(this.form).then(res => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    })
                    this.dialogVisible = false
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>