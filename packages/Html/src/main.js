import * as vue from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";

// import Button from "@components/button";
// import Button from "../public/button.js";

export const app = vue.createApp(App);
// const importComponent = () => {
//   const script = document.createElement("script");
//   script.src = "./button.umd.cjs";
//   document.getElementById("app").appendChild(script);
//   script.onload = function () {
//     console.log(Button["default"]);
//     const { component } = Button["default"];
//     app.component(component.__name, component);
//   };
// };
// importComponent();
// console.log(Button);

// const registerComponent = ({ component, config }) => {
//   console.log({ component, config });
//   app.component(component.__name, component);
// };

// [Button].forEach((c) => registerComponent(c));
// window.Vue = vue;
// console.log(window["Vue"].toDisplayString);
// const { component } = Button["default"];
// app.component(component.__name, component);
app.mount("#app");
