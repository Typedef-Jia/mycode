# Vue3代码片段

<ArticleMetadata />

## 创建vue3项目命令
```vue3
npm create vue@latest
```
## 组件通信
::: details 点我查看代码
第一种方法，Props
>父组件把数据给子组件
父组件
```vue
<template>
  <div>
    <h2>父亲</h2>
    <!--  把数据给儿子 -->
    <son :car="car" ></son>
  </div>
</template>
<script setup>
import son from '@/components/SonandFather/son.vue'
import { ref } from 'vue'
let car = ref('宝马')
```
>子组件获取父亲的数据
```vue3
<template>
  <div>
    <h3>儿子</h3>
    <h4>父亲给的{{ car }}</h4>
    <!-- -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 获取父亲传来的数据
 defineProps(['car'])

</script>

<style scoped></style>
```
 第二种方法，mitt
先安装mitt
```vue3
npm i mitt
```
安装后导入,然后默认导出
```vue3
import mitt from "mitt";

const mymitt = mitt()

export default mymitt
```
使用方法<br/>
**要获取数据的组件这样写↓**
```vue3
<template>
  <div>
  </div>
</template>
<script setup>
import { ref, onUnmounted } from 'vue'
// 导入mitt
import mymitt from '@/tools/evemitt'
// 用mymittt绑定事件获取父亲的数据
mymitt.on('get-car', (value) => {
  console.log('父亲的车' + value)
  mittcar.value = value
})

//组件卸载时要解除事件
onUnmounted(() => {
  mymitt.off('get-car')
})
</script>
<style scoped></style>

```
**提供数据的组件这样写↓**
```vue
<template>
  <div>
    <button @click="mittcar">通过mitt传数据</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// 导入mitt
import mymitt from '@/tools/evemitt'

let car = ref('宝马')

function mittcar() {
  // 触发定义的事件把车传过去
  mymitt.emit('get-car', car.value)
}


</script>
<style scoped></style>

```
:::

## 自定义全局指令
```vue3
app.directive('chanage', {
  mounted(el) {
    el.innerText = '哈哈哈'
  }
})

```
## axios二次封装
::: details 点我查看代码

```vue 
// 对于axios进行二次封装
import axios from "axios";

// 1:利用axios对象的方法create,去创建一个axios实例
// 2:request就是axios,只不过稍微配置一下
const requests = axios.create({
//  配置对象
//  基础路由，发请求的时候，路径当中会出现api
  baseURL: "/api",
//  代表请求超时的时间5S
  timeout: 5000,
});

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
//  config: 配置对象，对象里面有一个属性很重要，headers请求头
  return config;
});

//响应拦截器
requests.interceptors.response.use((res) => {
//  成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
  return res.data;
}, (error) => {
//  响应失败的回调函数
//   return Promise.reject(new Error('fail'));
  nprogress.done();
});

// 对外暴露
export default requests;
```
:::


