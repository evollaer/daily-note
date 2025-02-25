<template>
    <div class="lazy-image-container" :style="containerStyle">
      <img
        v-if="loaded || !lazy"
        :src="src"
        :alt="alt"
        :style="imageStyle"
        @load="onImageLoad"
        @error="onImageError"
      />
      <img
        v-else
        :src="placeholder"
        :alt="alt"
        :style="imageStyle"
      />
    </div>
  </template>
  
  <script>
//   虽然 Intersection Observer API 已被大多数现代浏览器支持，
//   但在一些旧版浏览器（如 IE11）中可能无法使用, 
//   解决方案：1.使用滚动监听  2.vue-lazyload等第三方库可以自动处理兼容性问题
  import { ref, onMounted, onUnmounted, watch } from "vue";
  
  export default {
    name: "LazyImage",
    props: {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: "",
      },
      placeholder: {
        type: String,
        default: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", // 透明占位图
      },
      lazy: {
        type: Boolean,
        default: true,
      },
      width: {
        type: [String, Number],
        default: "auto",
      },
      height: {
        type: [String, Number],
        default: "auto",
      },
    },
    setup(props) {
      const loaded = ref(false);
      const observer = ref(null);
  
      // 样式绑定
      const containerStyle = ref({});
      const imageStyle = ref({});
  
      watch(
        () => props.width,
        (newVal) => {
          imageStyle.value.width = newVal;
        },
        { immediate: true }
      );
  
      watch(
        () => props.height,
        (newVal) => {
          imageStyle.value.height = newVal;
        },
        { immediate: true }
      );
  
      // 初始化 Intersection Observer
      const initObserver = () => {
        if (!props.lazy) return;
  
        observer.value = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                loaded.value = true;
                observer.value.unobserve(entry.target);
              }
            });
          },
          {
            rootMargin: "100px", // 提前加载的范围
          }
        );
  
        observer.value.observe(document.querySelector(".lazy-image-container"));
      };
  
      // 图片加载成功
      const onImageLoad = () => {
        console.log(`Image loaded: ${props.src}`);
      };
  
      // 图片加载失败
      const onImageError = () => {
        console.error(`Failed to load image: ${props.src}`);
      };
  
      // 生命周期钩子
      onMounted(() => {
        initObserver();
      });
  
      onUnmounted(() => {
        if (observer.value) {
          observer.value.disconnect();
        }
      });
  
      return {
        loaded,
        containerStyle,
        imageStyle,
        onImageLoad,
        onImageError,
      };
    },
  };
  </script>
  
  <style scoped>
  .lazy-image-container {
    display: inline-block;
    position: relative;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  </style>