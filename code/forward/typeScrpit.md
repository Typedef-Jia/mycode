# typeScrpit常用代码片段


<ArticleMetadata />

### ts枚举（enum）
::: details 点我查看代码
 1. 数字枚举
>定义枚举格式
```ts
enum Direction {
 Up,
 Down,
 Left,
 Right,
}
```
>枚举使用
```ts
Direction.Up //获取当前属性的索引，索引是从零开始的，结果为0
Direction.[0] //获取当前索引属性的值，为UP
```
 2. 字符串枚举
>枚举成员的值是字符串
```ts
enum Direction {
 Up = "up",
 Down = "down",
 Left = "left",
 Right = "right"
}
let dir: Direction = Direction.Up;
console.log(dir); // 输出: "up"
```

:::
### type自定义类型

1. 基本⽤法
>类型别名使⽤ type 关键字定义， type 后跟类型名称，例如下⾯代码中 num 是类型别名。
```ts 
type num = number;
let price: num
price = 100
```
1. 联合类型 
>联合类型是⼀种⾼级类型，它表示⼀个值可以是⼏种不同类型之⼀。
```ts
type Status = number | string
type Gender = '男' | '⼥'
function printStatus(status: Status) {
 console.log(status);
}
function logGender(str:Gender){
 console.log(str)
}
printStatus(404);
printStatus('200');
printStatus('501');
logGender('男')
logGender('⼥')
```
1. 交叉类型
>交叉类型（Intersection Types）允许将多个类型合并为⼀个类型。合并后的类型将拥有所有被合并类型的成员。交叉类型通常⽤于对象类型,并且的意思。 
```ts
//⾯积
type Area = {
 height: number; //⾼
 width: number; //宽
};
//地址
type Address = {
 num: number; //楼号
 cell: number; //单元号
 room: string; //房间号
};
// 定义类型House，且House是Area和Address组成的交叉类型
type House = Area & Address;
const house: House = {
 height: 180,
 width: 75,
 num: 6,
 cell: 3,
 room: '702'
};
```






