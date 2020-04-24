import Vue from 'vue'

import App from './App'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import ECharts from 'vue-echarts/components/Echarts'

import 'echarts/lib/chart/line'

import 'echarts/lib/chart/scatter'

// import VueHighlightJS from 'vue-highlight.js'

// import python from 'vue-highlight.js/lib/languages/python'

// import 'highlight.js/styles/atom-one-light.css'

// import hljs from 'highlight.js'

// hljs.registerLanguage('python', python)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.component('chart', ECharts)

// Vue.use(VueHighlightJS, {
//   language: {
//     python
//   }
// })

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
