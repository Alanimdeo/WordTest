import { createApp } from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import router from "./router";

import App from "./App.vue";

const app = createApp(App);

app.use(VueToast);
app.use(router);
app.mount("#app");
