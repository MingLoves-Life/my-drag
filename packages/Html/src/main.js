import { createApp,defineComponent } from "vue";
import App from "./App.vue";

// import Button from "@components/button";
// import Button from "../public/button.js";

export const app = createApp(App);
const importComponent = () => {
//   const script = document.createElement("script");
//   script.src = "./button.umd.cjs";
//   document.getElementById("app").appendChild(script);
//   script.onload = function () {
    console.log(Button["default"]);
    const { component } = Button["default"];
    app.component(component.__name, component);
//   };
};
importComponent();
// console.log(Button);

// const registerComponent = ({ component, config }) => {
//   console.log({ component, config });
//   app.component(component.__name, component);
// };

// [Button].forEach((c) => registerComponent(c));
app.mount("#app");
