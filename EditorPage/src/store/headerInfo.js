import { defineStore } from "pinia";

export const useHeaderInfoStore = defineStore("headerInfo", {
  state: () => ({
    canvasSize: { width: 600, height: 600 },
  }),

  actions: {},
});
