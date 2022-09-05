import { defineStore } from "pinia";

export const useComponentStore = defineStore("component", {
  state: () => ({
    componentList: [],
  }),

  actions: {},
});
