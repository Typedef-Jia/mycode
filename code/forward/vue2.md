# Vue2代码片段


<ArticleMetadata />

## 条件渲染

```vue
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
<!-- v-else -->
<div v-if="Math.random() > 0.5">
  现在你看到我了
</div>
<div v-else>
  现在你看不见我了
</div>
<!-- v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面 -->
```


## 列表渲染
```vue
<!-- v-for -->
<ul id="example-1">
  <li
    v-for="item in items"
    :key="item.message">
    {{ item.message }}
  </li>
</ul>
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

```
#### v-for 使用对象
```vue 
<!-- v-for 使用对象 -->

<li v-for="value in object">
  {{ value }}
</li>
<!-- 如下 data -->

data: {
  object: {
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  }
}
```


## Class 与 Style 绑定
#### 对象语法
```vue
<div v-bind:class="{ active: isActive }">

</div>
```
#### 三元表达式
```vue
<div v-bind:class="[
  isActive ? activeClass : ''
]">
</div>
```
#### 内联样式
```vue
<div v-bind:style="{
    color: activeColor,
    fontSize: fontSize + 'px'
}"></div>
<!-- 如下 data -->

data: {
  activeColor: 'red',
  fontSize: 30
}
<!-- 结果渲染为 -->
<div style="color: red; font-size: 30px;"></div>
```
#### 内联样式对象
```vue
<div v-bind:style="styleObject"></div>
<!-- 如下 data -->
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```


##
::: details 点击查看
```vue

```
::::


## 验证码组件（基于canvas）
::: details 点击查看
```vue
<template>
    <div class="code-box" @click="changeCode">
        <canvas
            id="s-canvas"
            :height="contentHeight"
            :width="contentWidth"
        ></canvas>
    </div>
</template>

<script>
export default {
    name: "VerificationCode",
    props: {
        identifyCodes: {
            //验证码从该字段中抽取生成
            type: String,
            default: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
        fontSizeMin: {
            // 字体最小值
            type: Number,
            default: 25,
        },
        fontSizeMax: {
            // 字体最大值
            type: Number,
            default: 35,
        },
        backgroundColorMin: {
            // 验证码图片背景色最小值
            type: Number,
            default: 200,
        },
        backgroundColorMax: {
            // 验证码图片背景色最大值
            type: Number,
            default: 220,
        },
        dotColorMin: {
            // 背景干扰点最小值
            type: Number,
            default: 60,
        },
        dotColorMax: {
            // 背景干扰点最大值
            type: Number,
            default: 120,
        },
        contentWidth: {
            //容器宽度
            type: Number,
            default: 100,
        },
        contentHeight: {
            //容器高度
            type: Number,
            default: 44,
        },
    },
    emits: ["change"],
    data() {
        return {
            identifyCode: "",
        };
    },
    watch: {
        identifyCode() {
            this.drawPic();
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.drawPic();
            this.makeCode(this.identifyCodes, 4);
        });
    },
    methods: {
        // 生成一个随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        // 生成一个随机的颜色
        randomColor(min, max) {
            let r = this.randomNum(min, max);
            let g = this.randomNum(min, max);
            let b = this.randomNum(min, max);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        drawPic() {
            let canvas = document.getElementById("s-canvas");
            let ctx = canvas.getContext("2d");
            ctx.textBaseline = "bottom";
            // 绘制背景
            ctx.fillStyle = this.randomColor(
                this.backgroundColorMin,
                this.backgroundColorMax
            );
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
            // 绘制文字
            for (let i = 0; i < this.identifyCode.length; i++) {
                this.drawText(ctx, this.identifyCode[i], i);
            }
            this.drawLine(ctx);
            this.drawDot(ctx);
        },
        drawText(ctx, txt, i) {
            ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
            ctx.font =
                this.randomNum(this.fontSizeMin, this.fontSizeMax) +
                "px SimHei"; //随机生成字体大小
            let x =
                (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
            let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
            const deg = this.randomNum(-30, 30);
            // 修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate((deg * Math.PI) / 180);
            ctx.fillText(txt, 0, 0);
            // 恢复坐标原点和旋转角度
            ctx.rotate((-deg * Math.PI) / 180);
            ctx.translate(-x, -y);
        },
        drawLine(ctx) {
            // 绘制干扰线
            for (let i = 0; i < 4; i++) {
                ctx.strokeStyle = this.randomColor(100, 200);
                ctx.beginPath();
                ctx.moveTo(
                    this.randomNum(0, this.contentWidth),
                    this.randomNum(0, this.contentHeight)
                );
                ctx.lineTo(
                    this.randomNum(0, this.contentWidth),
                    this.randomNum(0, this.contentHeight)
                );
                ctx.stroke();
            }
        },
        drawDot(ctx) {
            // 绘制干扰点
            for (let i = 0; i < 30; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(
                    this.randomNum(0, this.contentWidth),
                    this.randomNum(0, this.contentHeight),
                    1,
                    0,
                    2 * Math.PI
                );
                ctx.fill();
            }
        },
        /* 切换验证码 */
        changeCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(e, n) {
            for (let i = 0; i < n; i++) {
                this.identifyCode += e[this.randomNum(0, e.length)];
            }
            this.$emit("change", this.identifyCode);
        },
    },
};
</script>

<style scoped>
.code-box {
    cursor: pointer;
}
</style>

```
::::

