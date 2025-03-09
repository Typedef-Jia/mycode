# css 备忘录

<ArticleMetadata />
### CSS 自定义属性（变量）
通过在 :root 伪类上设置自定义属性，然后在整个文档需要的地方使用，可以减少这样的重复性：
```css
:root {
  --main-bg-color: brown;
}

```
使用一个变量时用 var() 函数包裹以表示一个合法的属性值
```css
element {
  background-color: var(--main-bg-color);
}
```
### js 获取自定义值并修改
在 JavaScript 中获取或者修改 CSS 变量和操作普通 CSS 属性是一样的：
```js
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);

```
