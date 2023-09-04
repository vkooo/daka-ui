<template>
    <div>
        <el-dialog
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            append-to-body
            title="修改用户余额"
        >
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="修改余额" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">增加</el-radio>
                        <el-radio :label="2">减少</el-radio>
                        <el-radio :label="3">最终余额</el-radio>
                    </el-radio-group>
                </el-form-item>
                
                <el-form-item label="金额" prop="data">
                    <el-input-number v-model="form.data" autocomplete="off"  />
                    <div class="s-guidance">用户当前余额：{{form.money}}</div>
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
import { setMoney, edit } from "@/api/member";
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
            form: {},
            rules: {
                status: [
                    {required: true, message: '请选择状态', trigger: 'change' }
                ],
                data: [
                    {required: true, message: '请输入金额', trigger: 'change' }
                ], 
            }
        }
    },
    methods:{
        submit(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    setMoney(this.form).then(res => {
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