<template>
    <div>
        <el-dialog
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        append-to-body
        :title="title"
      >
        <div class="dialog-content">
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="90px">
            
              <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" autocomplete="off" />
              </el-form-item>
              <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="form.nickname" autocomplete="off" />
              </el-form-item>
              <el-form-item label="真实姓名" prop="realname" >
                  <el-input v-model="form.realname" autocomplete="off" />
              </el-form-item>

              <el-form-item label="手机号" prop="mobile" >
                  <el-input type="number" v-model="form.mobile" autocomplete="off" />
              </el-form-item>
            
              <el-form-item label="状态" prop="status" >
                  <el-radio-group v-model="form.status">
                    <el-radio :label="1">正常</el-radio>
                    <el-radio :label="2">禁用</el-radio>
                  </el-radio-group>
              </el-form-item>
            
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
import { update, create, edit } from "@/api/member";
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
                        this.form.data = 0
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
            let api = this.form.id? update(this.form): create(this.form)
            api.then(res => {
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