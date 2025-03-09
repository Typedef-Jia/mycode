# Sass备忘录

<ArticleMetadata />

### 变量
```sass
$defaultLinkColor: #46EAC2;
a {
  color: $defaultLinkColor;
}
```
### 字符串插值
```sass
$wk: -webkit-;
.rounded-box {
  #{$wk}border-radius: 4px;
}
```
### Extend继承样式
```sass
.button {
  ···
}
.push-button {
  @extend .button;
}
```
### 嵌套
```sass
nav {
  ul {
    padding: 0;
    list-style: none;
  }
  li { display: inline-block; }
  a {
    display: block;
  }
}
```
### 模块（片段）
```sass
// _base.scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;
//注意以下划线开头的 Sass 文件
// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```
### 混合(Mixins)
```sass
@mixin heading-font {
    font-family: sans-serif;
    font-weight: bold;
}
h1 {
    @include heading-font;
}
```
### @import
```sass
@import './other_sass_file';
@import '/code', 'lists';
// 纯 CSS @imports
@import "theme.css";
@import url(theme);
```
### 字符串插值
```sass
$defaultLinkColor: #46EAC2;
a {
  color: $defaultLinkColor;
}
```
### 字符串插值
```sass
$defaultLinkColor: #46EAC2;
a {
  color: $defaultLinkColor;
}
```
### 字符串插值
```sass
$defaultLinkColor: #46EAC2;
a {
  color: $defaultLinkColor;
}
```
### 字符串插值
```sass
$defaultLinkColor: #46EAC2;
a {
  color: $defaultLinkColor;
}
```
### 字符串插值
```sass
$defaultLinkColor: #46EAC2;
a {
  color: $defaultLinkColor;
}
```