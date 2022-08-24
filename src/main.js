import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import locale from 'element-ui/lib/locale/lang/en'

import '@/mock/index'  //mock拦截请求

import NProgress from 'nprogress'   // 导入 nprogress
import 'nprogress/nprogress.css'   // 导入样式，否则看不到效果

NProgress.configure({ showSpinner: true })   // 显示右上角螺旋加载提示

// router.beforeEach((to, from, next) => {
//   NProgress.start()   // 开启进度条
//   // some code ...
//   NProgress.done()   // 关闭进度条
// })

//请求拦截  添加请求拦截器
axios.interceptors.request.use(config => {
  //开启进度条
  NProgress.start();

  //为请求头对象，添加token 验证的 Authorization 字段
  // config.headers.Authorization = sessionStorage.getItem("token");
  return config;
});

axios.interceptors.response.use(config=>{
  //关闭进度条
  NProgress.done();
  return config;
});




Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(ElementUI, { locale })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
