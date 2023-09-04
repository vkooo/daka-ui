<template>
  <div class="app-container">
    <iframe ref="iframe" src="https://daka.plus/log-viewer/logs" width="100%" height="100%"></iframe>
  </div>
</template>
  
<script>
import { mapState } from "vuex"
export default {
  name: "index",
  computed: {
    ...mapState('user', ["userInfo"]),
  },
  data() {
    return {
    }
  },
  mounted() {
    var tt = this;
    setTimeout(function () {
      tt.resetHeight();
    }, 1000);
  },
  created() {
  },
  methods: {
    resetHeight() {
      var iframe = this.$refs.iframe;
      var _wh = document.documentElement.clientHeight - 130;//浏览器中间数据展示区域高度
      var h = 0;
      try {
        var a = iframe.contentWindow.document.body.scrollHeight;
        var b = iframe.contentWindow.document.documentElement.scrollHeight;
        h = a > b ? a : b;
        h += 150;//buf
      } catch (e) { }
      //如果没有读到，那就使用默认的浏览器中间数据展示区域的高度
      if (!h || h < _wh) {
        h = _wh;
      }
      iframe.style.height = h + 'px';
    }
  }
}
</script>
  
<style scoped></style>
  