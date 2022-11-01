import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "/src/assets/reset.css";
import "ant-design-vue/dist/antd.css";
import Button from "@components/button";
import Text from "@components/text";
import Image from "@components/image";

import { useComponentStoreHooks } from "./store/component.js";
const app = createApp(App);
export const pinia = createPinia();

app.use(pinia).mount("#app");

const componentStore = useComponentStoreHooks();

const registerComponent = ({ component, config }) => {
  console.log({ component, config });
  app.component(component.__name, component);
  componentStore.addComponent(config);
};

[Button, Text, Image].forEach((c) => registerComponent(c));
