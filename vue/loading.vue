<template lang="html">
  <div class="el-loading-mask is-fullscreen" v-if="isLoading">
    <div class="el-loading-spinner">
      <svg viewBox="25 25 50 50" class="circular">
        <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Loading",
  data() {
    return {};
  },
  // store文件下有很多个modeules，modules中有一个叫example的，将其中的state中的isLoading映射过来
  computed: {
    ...mapState({
      isLoading: state => state.example.isLoading
    })
  }
};
</script>

<style lang="scss" scoped>
.is-fullscreen {
  z-index: 99999;
  display: block;
}
</style>
