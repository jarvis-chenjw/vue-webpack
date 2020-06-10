import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false

import "./assets/styles/test.css";
import "./assets/styles/test-stylus.styl";
import "./assets/images/logobg.png";

// const root = document.createElement("div");
// document.body.appendChild(root);

new Vue({
    // el: "#app",
    render: h => h(App)
}).$mount('#app')
