import { createApp } from "vue";
import "/src/shared/style.css";
import App from "/src/app/App.vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount("#app");
