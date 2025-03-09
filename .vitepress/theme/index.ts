import DefaultTheme from 'vitepress/theme'
import MNavLinks from './components/MNavLinks.vue'
import MyLayout from './components/MyLayout.vue'
import update from "./components/update.vue"
import mediumZoom from 'medium-zoom';
import ArticleMetadata from "./components/ArticleMetadata.vue"
import HomeUnderline from "./components/HomeUnderline.vue"
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import { h } from 'vue'
import './style/index.css'
import './style/custom-font.css'
import { useData } from 'vitepress'
export default {
  extends: DefaultTheme,

  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },


  enhanceApp({ app }) {
    // 注册组件
    app.component('MNavLinks', MNavLinks)
    app.component('update', update)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('HomeUnderline', HomeUnderline)
  },
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(MyLayout)
    // return h(DefaultTheme.Layout, props, {
    //   'doc-footer-before': () => h(backtotop), // 使用doc-footer-before插槽
    // })
  },
}