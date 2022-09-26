import { defineStore } from "pinia";

export const useComponentStore = defineStore("component", {
  state: () => ({
    componentList: [
      {
        component: "my-text",
        label: "文字",
        propValue: "文字文字",
        style: {
          width: "100px",
          height: "100px",
        },
      },
      {
        component: "my-button",
        label: "按钮",
        propValue: "按钮按钮",
        style: {
          width: "100px",
          height: "100px",
        },
      },
      {
        component: "my-image",
        label: "图片",
        propValue:
          "https://xesfile.xesimg.com/app/happyexplore/2022/09/06/2450410_1662451249922_happyExplpre.jpg",
        style: {
          width: "100px",
          height: "100px",
        },
      },
    ],
    canvasComponent: [],
    curMouseDownComponent: {
      index: null,
      top: null,
      left: null,
      startClientX: null,
      startClientY: null,
      canvasComponent: {},
    },
    clickComponentWrap: {
      index: null,
    },
    snapshot: [[]],
    snapshotIndex: 0,
    attrList: {
      width: "宽度",
      height: "高度",
    },
    eventList: [
      {
        key: "redirect",
        label: "跳转事件",
      },
      {
        key: "alert",
        label: "alert事件",
      },
    ],
  }),

  actions: {
    addCanvasComponent(component) {
      this.canvasComponent.push(component);
      this.addSnapshot();
    },
    clearCanvas() {
      this.canvasComponent.length = 0;
    },
    addSnapshot() {
      if (this.snapshotIndex < this.snapshot.length - 1) {
        this.snapshot.splice(
          this.snapshotIndex + 1,
          this.snapshot.length - this.snapshotIndex - 1
        );
      }
      this.snapshotIndex++;
      this.snapshot.push([...this.canvasComponent]);
      console.log("addSnapshot", this.snapshotIndex, this.snapshot);
    },
    redoSnapshot() {
      if (this.snapshotIndex > 0) {
        this.snapshotIndex--;
        this.canvasComponent.length = 0;
        this.canvasComponent.push(...this.snapshot[this.snapshotIndex]);
        console.log("redoSnapshot", this.snapshotIndex, this.snapshot);
      }
    },
    undoSnapshot() {
      this.snapshotIndex++;
      this.canvasComponent.length = 0;
      this.canvasComponent.push(...this.snapshot[this.snapshotIndex]);
      console.log("undoSnapshot", this.snapshotIndex, this.snapshot);
    },
    saveComponent() {
      localStorage.setItem(
        "canvasComponent",
        JSON.stringify(this.canvasComponent)
      );
      console.log("saveComponent");
    },
  },
});
