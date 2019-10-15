import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import { store } from './store.js'
const fb = require('./firebaseConfig.js')


Vue.config.productionTip = false
let app 
fb.auth.onAuthStateChanged(user =>{
  if (!app){
    app=new Vue({
      el:'#app',
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    
  }
})
