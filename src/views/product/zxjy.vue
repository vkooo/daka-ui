<template>
    <div class="app-container">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
            <el-tabs v-model="activeName">
                <el-tab-pane label="打卡" name="clock_ins">
                    <el-form-item
                        v-for="(item, index) in form.clock_ins"
                        :key="index"
                        required
                        label-width="0"
                    >
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="名称" :prop="'clock_ins.'+index+'.name'" :rules="rules.name">
                                    <el-input placeholder="请输入名称" v-model="item.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="价格" :prop="'clock_ins.'+index+'.price'" :rules="rules.price">
                                    <el-input-number placeholder="请输入价格" v-model="item.price" :precision="2" :step="0.1"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="时间" :prop="'clock_ins.'+index+'.day'" :rules="rules.day">
                                    <el-input type="number" placeholder="请输入有效天数" v-model="item.day">
                                        <template slot="append">天</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-button @click.prevent="remove(index)">删除</el-button>
                            </el-col>
                        </el-row>
                        
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="报告" name="reports">
                    <el-form-item
                        v-for="(item, index) in form.reports"
                        :key="index"
                        required
                        label-width="0"
                    >
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="名称" :prop="'reports.'+index+'.name'" :rules="rules.name">
                                    <el-input placeholder="请输入名称" v-model="item.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="价格" :prop="'reports.'+index+'.price'" :rules="rules.price">
                                    <el-input-number placeholder="请输入价格" v-model="item.price" :precision="2" :step="0.1"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="时间" :prop="'reports.'+index+'.day'" :rules="rules.day">
                                    <el-input type="number" placeholder="请输入有效天数" v-model="item.day">
                                        <template slot="append">天</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-button @click.prevent="remove(index)">删除</el-button>
                            </el-col>
                        </el-row>
                        
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="全包" name="fulls">
                    <el-form-item
                        v-for="(item, index) in form.fulls"
                        :key="index"
                        required
                        label-width="0"
                    >
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <el-form-item label="名称" :prop="'fulls.'+index+'.name'" :rules="rules.name">
                                    <el-input placeholder="请输入名称" v-model="item.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="价格" :prop="'fulls.'+index+'.price'" :rules="rules.price">
                                    <el-input-number placeholder="请输入价格" v-model="item.price" :precision="2" :step="0.1"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="时间" :prop="'fulls.'+index+'.day'" :rules="rules.day">
                                    <el-input type="number" placeholder="请输入有效天数" v-model="item.day">
                                        <template slot="append">天</template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-button @click.prevent="remove(index)">删除</el-button>
                            </el-col>
                        </el-row>
                        
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
            <el-form-item>
                <el-button @click="addDay">新增时间</el-button>
                <el-button type="primary" @click="onSubmit" v-throttle="2000">提交</el-button>
            </el-form-item>
            
        </el-form>
    </div>
</template>
<script>
import { get, save } from "@/api/product/zxjy";
export default {
    data() {
        return {
            activeName: 'clock_ins',
            form: {
                clock_ins: [],
                reports: [],
                fulls: []
            },
            rules: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'change' }
                ],
                price: [
                    { required: true, message: '价格不能为空', trigger: 'change' }
                ],
                day: [
                    { required: true, message: '天数不能为空', trigger: 'change' }
                ],
            }
        };
    },
    created: function(){
        get().then(res=>{
            this.form = res.data
        })
    },
    methods: {
        addDay(){
            this.form[this.activeName].push({
                name: '',
                price: 0,
                day: 0,
            });
        },
        remove(index){
            this.form[this.activeName].splice(index, 1)
        },
        onSubmit() {
            console.log(this.form)
            this.$refs.ruleForm.validate((valid) => {
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
        }
    }
};
</script>