import { defineStore } from "pinia";
import { cloneDeep } from "lodash-es";
import { pinia } from "../main";
export const useComponentStore = defineStore("component", {
  state: () => ({
    componentList: [],
    componentConfigList: [],
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
    previewInfo: {
      visible: false,
    },
    isCtrlDown: false,
    copyComponent: {},
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
    preview(width, height) {
      this.previewInfo.visible = true;
      this.previewInfo.width = width;
      this.previewInfo.height = height;
      console.log("preview", this.previewInfo);
    },
    copy() {
      const canvasComponent = { ...this.curMouseDownComponent.canvasComponent };
      const style = { ...canvasComponent.style };
      style.top = Number(canvasComponent.style.top.slice(0, -2)) + 10 + "px";
      style.left = Number(canvasComponent.style.left.slice(0, -2)) + 10 + "px";
      canvasComponent.style = style;
      this.copyComponent = { ...canvasComponent };
      console.log("copy", this.copyComponent);
    },
    paste() {
      if (Object.keys(this.copyComponent)?.length > 0) {
        this.canvasComponent.push(cloneDeep(this.copyComponent));
        const newCopyComponent = cloneDeep(this.copyComponent);
        const { style } = newCopyComponent;
        style.top =
          Number(this.copyComponent.style.top.slice(0, -2)) + 10 + "px";
        style.left =
          Number(this.copyComponent.style.left.slice(0, -2)) + 10 + "px";
        this.copyComponent = newCopyComponent;
        console.log("paste", this.canvasComponent);
      }
    },
    cut() {
      const { index } = this.curMouseDownComponent;
      this.copyComponent = { ...this.curMouseDownComponent.canvasComponent };
      this.canvasComponent.splice(index, 1);
      console.log("cut", this.copyComponent, this.canvasComponent);
    },
    addComponent(component) {
      this.componentList.push(component.basicProps);
      this.componentConfigList.push(component);
    },
  },
});

export const useComponentStoreHooks = () => {
  return useComponentStore(pinia);
};
