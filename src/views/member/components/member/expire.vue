<template>
    <div>
        <el-dialog
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        append-to-body
        title="修改到期时间"
      >
        <div class="dialog-content">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
            
            <div class="vk-section">
              <div class="title">职校家园</div>
              <el-form-item label="打卡到期" prop="zxjy_clock_in_expire" >
                <el-date-picker
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="form.zxjy_clock_in_expire"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker> 
              </el-form-item> 
              <el-form-item label="报告到期" prop="zxjy_report_expire" >
                <el-date-picker
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="form.zxjy_report_expire"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker> 
              </el-form-item> 
            </div>
            <div class="vk-section">
              <div class="title">工学云</div>
              <el-form-item label="打卡到期" prop="gxy_clock_in_expire" >
                <el-date-picker
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="form.gxy_clock_in_expire"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker> 
              </el-form-item> 
              <el-form-item label="报告到期" prop="gxy_report_expire" >
                <el-date-picker
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="form.gxy_report_expire"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker> 
              </el-form-item> 
            </div>
            
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" v-throttle="2000" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { update, edit } from "@/api/member/service";
import { mapState } from "vuex"
export default {
    props:{
      memberId: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
		...mapState('user', ["userInfo"]),
    },
    watch:{
        dialogVisible: {
            handler(newVal, oldVal){
              this.form = {}
              this.form.status = 1
                if(newVal){
                    edit(this.memberId).then(res => {
                      if(res.data)
                        this.form = res.data
                    })
                }
            },
            deep: true,
            immediate: true
        }
    },
    data () {
        return {
            dialogVisible: false,
            title: "",
            form: {},
            rules: {
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'change' }
                ],
                status: [
                    {required: true, message: '请选择状态', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
      submit(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
          update(this.memberId, this.form).then(res => {
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
      },
    }
}
</script>
<style scoped lang="scss">
.vk-section{
  .title{
    margin-bottom: 20px;
  }
}
</style>