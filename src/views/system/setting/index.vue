<template>
     <div class="app-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本配置" name="basic">
                <basic />
            </el-tab-pane>
            <el-tab-pane label="推广设置" name="invitation">
                <invitation />
            </el-tab-pane>
            <el-tab-pane label="售后设置" name="aftermarket">
                <aftermarket />
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
import basic from "./components/basic"
import invitation from "./components/invitation"
import aftermarket from "./components/aftermarket"

export default {
    components:{basic, invitation, aftermarket},
    data() {
        return {
            activeName: 'basic'
        };
    },
    methods: {
        handleClick(tab, event) {
        }
    }
};
</script>