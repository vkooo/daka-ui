<template>
     <div class="app-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="小程序配置" name="mini">
                <mini />
            </el-tab-pane>
            <el-tab-pane label="公众号配置" name="official">
                <official />
            </el-tab-pane>
            <el-tab-pane label="微信支付配置" name="pay">
                <pay />
            </el-tab-pane>
        </el-tabs>
    </div>
    
</template>
<script>
import official from "./components/official"
import mini from "./components/mini"
import pay from "./components/pay"
export default {
    components:{ official, mini, pay},
    data() {
        return {
            activeName: 'mini'
        };
    },
    methods: {
        handleClick(tab, event) {
        }
    }
};
</script>