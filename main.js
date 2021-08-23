import Vue from 'vue/dist/vue.esm';
import ElementUI from 'element-ui';
import {setTheme} from "./lib/theme"
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
var app = new Vue({
  el: '#app',
  data: {
    message: '更换颜色',
    colors:["#ff0000","#FF9966","#99CCCC","#99CCFF","#FF6600","#0066CC"],
  },
  methods: {
    chnageColor(color){
      setTheme(color)
    }
  },
})