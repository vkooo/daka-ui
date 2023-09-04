<template>
  <div>
    <el-drawer title="用户详情" v-if="dialogVisible" :visible.sync="dialogVisible" :direction="'rtl'" :append-to-body="true"
      :modal-append-to-body="false" size="60%" custom-class="drawer" ref="drawer">
      <div class="vk-drawer__content">
        <div class="vk-head pr10 pl10">
          <div class="full">
            <img src="https://shop.bjjhfy.com/system/img/f.5aa43cd3.png" alt="" class="order_icon">
            <div class="text">
              <div class="title">{{ form.email }}</div>
            </div>
            <div>
              <el-button type="primary" @click="$refs.editComponent.dialogVisible = true">编辑</el-button>
              <el-button type="primary" @click="$refs.moneyComponent.dialogVisible = true">设置余额</el-button>
            </div>
          </div>
          <div>
            <ul class="list">
              <li class="item">
                <div class="title">余额</div>
                <div class="value1">{{ form.money }}元</div>
              </li>
              <li class="item">
                <div class="title">积分</div>
                <div>{{ form.score }}</div>
              </li>
            </ul>
          </div>
        </div>

        <el-tabs type="border-card">
          <el-tab-pane label="用户信息">
            <div class="vk-section">
              <div class="title">基本资料</div>
              <ul class="list">
                <li class="item">
                  <div>用户ID：</div>
                  <div class="value">
                    {{ form.id }}
                  </div>
                </li>
                <li class="item">
                  <div>Email：</div>
                  <div class="value">
                    {{ form.email }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="vk-section">
              <div class="title">微信信息</div>
              <div class="list">
                <li class="item">
                  <div>公众号：</div>
                  <div>{{ form.wechat ? "已关注" : "未关注" }}</div>
                </li>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="服务列表" v-if="form.service">
            <div class="vk-section">
              <div class="title">职校家园-打卡</div>
              <div class="list">
                <li class="item">
                  <div>到期时间：</div>
                  <div>{{ form.service.zxjy_clock_in_expire }}</div>
                </li>
                <li class="item">
                  <div>开关：</div>
                  <div>{{ form.service.zxjy_clock_in_status == 1? "启用中":"禁用中" }}</div>
                </li>
              </div>
            </div>
            <div class="vk-section">
              <div class="title">职校家园-报告</div>
              <div class="list">
                <li class="item">
                  <div>到期时间：</div>
                  <div>{{ form.service.zxjy_report_expire? form.service.zxjy_report_expire: "未购买" }}</div>
                </li>
                <li class="item">
                  <div>日报开关：</div>
                  <div>{{ form.service.zxjy_report_day_status == 1? "启用中":"禁用中" }}</div>
                </li>
                <li class="item">
                  <div>周报开关：</div>
                  <div>{{ form.service.zxjy_report_week_status == 1? "启用中":"禁用中" }}</div>
                </li>
                <li class="item">
                  <div>月报开关：</div>
                  <div>{{ form.service.zxjy_report_month_status == 1? "启用中":"禁用中" }}</div>
                </li>
              </div>
            </div>


            <div class="vk-section">
              <div class="title">工学云-打卡</div>
              <div class="list">
                <li class="item">
                  <div>到期时间：</div>
                  <div>{{ form.service.gxy_clock_in_expire }}</div>
                </li>
                <li class="item">
                  <div>上班开关：</div>
                  <div>{{ form.service.gxy_clock_in_start_status == 1? "启用中":"禁用中" }}</div>
                </li>
                <li class="item">
                  <div>下班开关：</div>
                  <div>{{ form.service.gxy_clock_in_end_status == 1? "启用中":"禁用中" }}</div>
                </li>
              </div>
            </div>
            <div class="vk-section">
              <div class="title">工学云-报告</div>
              <div class="list">
                <li class="item">
                  <div>到期时间：</div>
                  <div>{{ form.service.gxy_report_expire }}</div>
                </li>
                <li class="item">
                  <div>日报开关：</div>
                  <div>{{ form.service.gxy_report_day_status == 1? "启用中":"禁用中" }}</div>
                </li>
                <li class="item">
                  <div>周报开关：</div>
                  <div>{{ form.service.gxy_report_week_status == 1? "启用中":"禁用中" }}</div>
                </li>
                <li class="item">
                  <div>月报开关：</div>
                  <div>{{ form.service.gxy_report_month_status == 1? "启用中":"禁用中" }}</div>
                </li>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="仓库信息">
            <div class="vk-section" v-if="form.zxjy">
              <div class="title">职校家园</div>
              <div class="list">
                <li class="item">
                  <div>实习项目：</div>
                  <div>{{ form.zxjy.title }}</div>
                </li>
                <li class="item">
                  <div>账号：</div>
                  <div>{{ form.zxjy.account }}</div>
                </li>
                <li class="item">
                  <div>密码：</div>
                  <div>{{ form.zxjy.password }}</div>
                </li>
                <li class="item">
                  <div>国家：</div>
                  <div>{{ form.zxjy.country }}</div>
                </li>
                <li class="item">
                  <div>省/市/区：</div>
                  <div>{{ form.zxjy.province }} - {{ form.zxjy.city }} - {{ form.zxjy.area }}</div>
                </li>
                <li class="item">
                  <div>经度：</div>
                  <div>{{ form.zxjy.lng }}</div>
                </li>
                <li class="item">
                  <div>维度：{{ form.zxjy.lat }}</div>
                  <div></div>
                </li>
                <li class="item">
                  <div>具体地址：{{ form.zxjy.address }}</div>
                  <div></div>
                </li>
              </div>
            </div>
            <div class="vk-section" v-if="form.gxy">
              <div class="title">工学云</div>
              <div class="list">
                <li class="item">
                  <div>实习项目：</div>
                  <div>{{ form.gxy.title }}</div>
                </li>
                <li class="item">
                  <div>账号：</div>
                  <div>{{ form.gxy.account }}</div>
                </li>
                <li class="item">
                  <div>密码：</div>
                  <div>{{ form.gxy.password }}</div>
                </li>
                <li class="item">
                  <div>国家：</div>
                  <div>{{ form.gxy.country }}</div>
                </li>
                <li class="item">
                  <div>省/市/区：</div>
                  <div>{{ form.gxy.province }} - {{ form.gxy.city }} - {{ form.gxy.area }}</div>
                </li>
                <li class="item">
                  <div>经度：</div>
                  <div>{{ form.gxy.lng }}</div>
                </li>
                <li class="item">
                  <div>维度：{{ form.gxy.lat }}</div>
                  <div></div>
                </li>
                <li class="item">
                  <div>具体地址：{{ form.gxy.address }}</div>
                  <div></div>
                </li>
              </div>
            </div>

          </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="vk-drawer__footer">
          <el-button @click="dialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-drawer>
    <editComponent ref="editComponent" :memberId="memberId" />
    <moneyComponent ref="moneyComponent" :memberId="memberId" />
  </div>
</template>

<script>
import { mapState } from "vuex"
import { edit } from "@/api/member";
import moneyComponent from "./money";
import editComponent from "./edit";

export default {
  components:{
    editComponent,
    moneyComponent
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
  props: {
    memberId: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    ...mapState('user', ["userInfo"]),
  },
  data() {
    return {
      dialogVisible: false,
      form: {}
    }
  },
  methods: {

  }
}
</script>