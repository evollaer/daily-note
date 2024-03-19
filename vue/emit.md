```html
// 仅适用vue2版本
// 父组件
<template>
  <div class="home">
    {{ originStr }}
   第一种写法
  <!--  <hello-world :message="originStr" @update:message="changeMessage" />  -->
  第二种写法(.sync语法糖的写法)
 <hello-world :message.sync="originStr" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      originStr: "你好",
    };
  },
  methods: {
    // 语法糖版本无需定义该方法
    changeMessage(str) {
      console.log(str);
      this.originStr = str;
    },
  },
};
</script>

//子组件
<template>
  <div class="hello">
    <hr />
    <button @click="btnclick">兄弟点我</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  components: {},
  props: {
    message: {
      type: String,
      default: "",
    },
  },
  methods: {
    btnclick() {
      console.log("触发了事件");
      this.$emit("update:message", "Hello World");
    },
  },
};
</script>

<style scoped lang="scss"></style>
```
