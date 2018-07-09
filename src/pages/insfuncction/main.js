import Vue from 'vue'
import App from './index'
import '../../iconfont/iconfont.css';

const app = new Vue(App)
app.$mount()
export default {
  config: {
    "enablePullDownRefresh": false
  }
}
