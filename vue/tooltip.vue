<template>
  <div @click="tooltipClick">
    <el-tooltip :disabled="isShowTooltip" class="tooltip" placement="top">
      <pre class="tooltip__tip" slot="content">{{ message }}</pre>
      <div class="tooltip__words" @mouseenter="enterEvents">{{ message }}</div>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowTooltip: false,
    };
  },
  props: {
    message: {
      required: true,
      type: String,
      default: "",
    },
  },
  mounted() {},
  methods: {
    tooltipClick() {
      this.$emit("tooltipClick");
    },
    enterEvents(e) {
      let tableContentBoxWidth = e.target.getBoundingClientRect().width;
      let tableContentWidth = this.getElementTextWidth(e.target);
      if (tableContentWidth >= tableContentBoxWidth) {
        this.isShowTooltip = false;
      } else {
        this.isShowTooltip = true;
      }
    },
    getElementTextWidth(el) {
      const range = new Range();
      range.selectNodeContents(el);
      const width = range.getBoundingClientRect().width;
      return width;
    },
  },
};
</script>
<style lang="scss" scoped>
.tooltip__words {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.tooltip__tip {
  margin: 0;
  overflow-y: auto;
  white-space: pre-line;
  cursor: pointer;
}

.tooltip__tip::-webkit-scrollbar {
  width: 6px;
}

.tooltip__tip::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.tooltip__tip::-webkit-scrollbar-thumb:hover {
  background: #fff;
}

.tooltip__tip::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: #888;
}
</style>
