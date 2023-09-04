<template>
    <div>
        <el-dialog
            v-if="dialogVisible"
            :visible.sync="dialogVisible"
            append-to-body
            title="修改用户代理"
        >
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
                <el-form-item label="代理" prop="agent_id">
                    <el-select v-model="form.agent_id" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in form.agents"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
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
import { setAgent, edit } from "@/api/member";
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
            },
            form: {},
        }
    },
    methods:{
        submit(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    setAgent(this.form).then(res => {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    })
                    this.dialogVisible = false
                    this.$emit("getList")
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>