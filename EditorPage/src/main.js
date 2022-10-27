import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "/src/assets/reset.css";
import "ant-design-vue/dist/antd.css";

import MyText from "/src/component/MyText.vue";
import MyBtn from "/src/component/MyBtn.vue";
import MyImg from "/src/component/MyImg.vue";

const app = createApp(App);
const pinia = createPinia();

app.component('my-text',MyText);
app.component('my-button',MyBtn);
app.component('my-image',MyImg);

app.use(pinia).mount("#app");
