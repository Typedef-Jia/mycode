# vue3中使用mock，模拟后端返回数据

### npm安装 vite-plugin-mock-server  mockjs
```sh
npm i vite-plugin-mock-server mockjs @types/mockjs
``` 
### vite.config.ts配置
```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import mockServer from 'vite-plugin-mock-server'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    mockServer({
      logLevel: "off",
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```
### 在项目根目录创建mock文件夹，这文件夹中创建es.mock.ts
```ts
/// es.mock.ts
import Mck from "mockjs"

let list = Mck.mock({

  "list|10": [{
    "name": "@cname",
    "id|+1": 1,
    "time": "@time"
  }
  ],
  "msg": "你成功了",
  "code": 200


})

const mocks: any[] = [
  {
    pattern: '/api/test1/1',
    method: "GET",
    handle: (req: any, res: any) => {
      res.end('Hello world!' + req.url)
    }
  },
  {
    pattern: '/api/test1/*',
    handle: (req: any, res: any) => {
      res.end('Hello world!' + req.url)
    }
  },
  {
    pattern: '/api/test1/users/{userId}',
    handle: (req: any, res: any) => {

      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(list))
    }
  },
  {
    pattern: '/api/test1/body/json',
    method: 'POST',
    handle: (req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json')

      //req is incomingMessage which extends stream.Readable 
      // --> https://nodejs.org/api/stream.html#readablereadsize
      // res.end need to be within the function
      // there is a size limit for the bodyString to get parsed 
      req.on('data', (bodyString: string) => {
        let body: object = JSON.parse(bodyString)
        res.end(JSON.stringify(body))
      })
    }
  },
]
export default mocks
```
### 请求示例
```ts
async function getEnrollmentTimeTableData() {
  await fetch("/api/test1/users/123").then((res) => {
    console.log(res);
  });
}
```


