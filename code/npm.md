# npm包
>本页展示个人开发的npm包
## 发布npm包的步骤和注意事项

1、创建一个npm账号
如果你还没有npm账号，可以在npm官网上注册一个。在注册过程中，你需要提供用户名、密码和邮箱。

2、初始化你的npm包
在本地创建一个文件夹来承载你的npm包。打开命令行终端，并通过cd命令进入到该文件夹。然后运行以下命令初始化你的npm包：
```npm 
npm init
```


>这个命令会引导你填写一些关于你的包的信息，比如名称、版本号、描述等。按照提示填写并确认这些信息。


**配置package.json文件**
在初始化步骤中，npm会自动生成一个package.json文件。你也可以手动创建该文件，并根据你的包的需求进行配置。

>其中一些重要的配置项包括：

- “name”：你的包的名称，应该是唯一的。
- “version”：你的包的版本号，遵循语义化版本规范。
- “description”：对你的包的简要描述。
- “main”：指定入口文件，即其他开发者在使用你的包时会引用的文件。
- “keywords”：关键词数组，用于描述你的包。
- “author"和"contributors”：作者和贡献者的信息。
- “license”：选择适合你的包的开源许可证。

**登录npm账号**
在终端中输入以下命令登录你的npm账号：
```vue
npm login
```
按照提示输入你的用户名、密码和邮箱。

**发布npm包**
登录成功后，运行以下命令将你的包发布到npm官方仓库中：
```vue
npm publish
```


更新npm包
如果你需要更新你的npm包，可以修改package.json文件中的版本号，并确保你的代码已经做出相应的修改。然后再次运行npm publish命令来发布新版本的包。

维护npm包
一旦你的包发布成功，你就需要维护它。这包括及时响应用户的反馈和问题，修复bug，以及不断改进和更新你的包。

## npm login 没有出现 username,跳转cnpm注册的解决方法
查看淘宝镜像
```vue
npm get registry
```

如果不是https://registry.npmjs.org/
重新设置
```vue
npm config set registry https://registry.npmjs.org/
```

重新执行
```vue
npm login
```


## 如果开发一个npm包
1. 创建项目目录结构
   **确保你的项目目录结构类似于以下内容：**
***
   ![hh](https://pic.imgdb.cn/item/668408b6d9c307b7e95abff7.png "图片")

2. 在项目根目录下运行以下命令初始化 package.json：
   ```npm     
   npm init -y
   ```
3. 安装 TypeScript 和其他依赖
  在项目根目录下运行以下命令：
   ```npm 
   npm install typescript --save-dev
   ```
4. 配置 tsconfig.json
在项目根目录下创建 tsconfig.json 文件，内容如下：
```json
{
  "name": "ljjkyyh",//包名
  "version": "1.0.0",//包的版本
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "author":"ljjk",
  "description": "这是一个关于全屏樱花开启和关闭的npm包",//包的描述
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^4.0.0"
  }
}

```
5. 编写 TypeScript 代码<br>
 在 src 目录下创建 index.ts 
 >如果没有src请创建
 这是一个九九乘法表的示例
 ```ts
 export function generateMultiplicationTable(): string {
  let table = '';
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      table += `${i} * ${j} = ${i * j}\t`;
    }
    table += '\n';
  }
  return table;
}

 ```
 6. 编译 TypeScript 代码<br>
   在项目根目录下运行以下命令进行编译：
 ```npm
   npx tsc
```
>运行npx tsc后 项目中会多一个dist文件夹 并且目录下生成了 index.js 和 index.d.ts 文件。
7. 发布到 npm<br>
   在项目根目录下运行以下命令发布包：
   ```npm 
   npm publish --access public
   ```
这样别人就可以用npm命令来安装你的包，并且使用了。
<br>
安装格式为:npm i 你的包名
 


::: info
这是一条信息，info后面的文字可修改
:::

::: tip 说明
这是一个提示，tip后面的文字可修改
:::

::: warning 警告
这是一条警告，warning后面的文字可修改
:::

::: danger 危险
这是一个危险警告，danger后面的文字可修改
:::

::: details 点我查看代码
这是一条详情，details后面的文字可修改
:::
* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />