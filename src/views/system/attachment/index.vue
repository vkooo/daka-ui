<template>
     <div class="app-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本配置" name="basic">
                <basic />
            </el-tab-pane>
            <el-tab-pane label="OSS配置" name="official">
                <oss />
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
import basic from "./components/basic"
import oss from "./components/oss"
export default {
    components:{basic, oss},
    data() {
        return {
            activeName: 'basic'
        };
    },
};
</script>