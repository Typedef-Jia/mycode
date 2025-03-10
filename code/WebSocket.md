# WebSocket代码示例
## 前端代码
> WebsocketTool.js
``` JavaScript
//在JavaScript中实现WebSocket连接失败后3分钟内尝试重连3次

/**
 * @param {string} url  Url to connect
 * @param {number} maxReconnectAttempts Maximum number of times
 * @param {number} reconnect Timeout
 * @param {number} reconnectTimeout Timeout
 *
 */
class WebSocketReconnect {
  constructor(
    url,
    maxReconnectAttempts = 3,
    reconnectInterval = 20000,
    maxReconnectTime = 180000
  ) {
    this.url = url;
    this.maxReconnectAttempts = maxReconnectAttempts;
    this.reconnectInterval = reconnectInterval;
    this.maxReconnectTime = maxReconnectTime;
    this.reconnectCount = 0;
    this.reconnectTimeout = null;
    this.startTime = null;
    this.socket = null;
    this.connect();
  }

  // 连接操作
  connect() {
    console.log("connecting...");
    this.socket = new WebSocket(this.url);

    // 连接成功建立的回调方法
    this.socket.onopen = () => {
      console.log("WebSocket Connection Opened!");
      this.clearReconnectTimeout();
      this.reconnectCount = 0;
    };
    // 连接关闭的回调方法
    this.socket.onclose = (event) => {
      console.log("WebSocket Connection Closed:", event);
      this.handleClose();
    };
    // 连接发生错误的回调方法
    this.socket.onerror = (error) => {
      console.error("WebSocket Connection Error:", error);
      // 重连
      this.handleClose();
    };
  }

  //断线重连操作
  handleClose() {
    if (
      this.reconnectCount < this.maxReconnectAttempts &&
      (this.startTime === null ||
        Date.now() - this.startTime < this.maxReconnectTime)
    ) {
      this.reconnectCount++;
      console.log(
        `正在尝试重连 (${this.reconnectCount}/${this.maxReconnectAttempts})次...`
      );
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);

      if (this.startTime === null) {
        this.startTime = Date.now();
      }
    } else {
      console.log("超过最大重连次数或重连时间超时，已放弃连接");
      // 重置连接次数0
      this.reconnectCount = 0;
      // 重置开始时间
      this.startTime = null;
    }
  }

  //清除重连定时器
  clearReconnectTimeout() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  // 关闭连接
  close() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
    this.clearReconnectTimeout();
    this.reconnectCount = 0;
    this.startTime = null;
  }
}

// WebSocketReconnect 类封装了WebSocket的连接、重连逻辑。
// maxReconnectAttempts 是最大重连尝试次数。
// reconnectInterval 是每次重连尝试之间的间隔时间。
// maxReconnectTime 是总的重连时间限制，超过这个时间后不再尝试重连。
// reconnectCount 用于记录已经尝试的重连次数。
// startTime 用于记录开始重连的时间。
// connect 方法用于建立WebSocket连接，并设置相应的事件监听器。
// handleClose 方法在WebSocket连接关闭或发生错误时被调用，根据条件决定是否尝试重连。
// clearReconnectTimeout 方法用于清除之前设置的重连定时器。
// close 方法用于关闭WebSocket连接，并清除重连相关的状态。

// 使用示例
// const webSocketReconnect = new WebSocketReconnect('ws://your-websocket-url')
// 当不再需要WebSocket连接时，可以调用close方法
// webSocketReconnect.close();

export default WebSocketReconnect;
```
>vue3应用示例
``` vue
<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import WebSocketReconnect from './util/WebsocketTool.js'
// --------------------------------------------
let textarea1 = ref('【消息】---->')
let websocket = null
// 判断当前浏览器是否支持WebSocket
for (let a = 0; a < 10; a++) {
  if ('WebSocket' in window) {
    // 连接WebSocket节点
    websocket = new WebSocketReconnect('ws://127.0.0.1:8080' + `/dev-api/websocket/${a}`)
  } else {
    alert('浏览器不支持webSocket')
  }

}


// 接收到消息的回调方法
websocket.socket.onmessage = function (event) {
  let data = event.data
  console.log('后端传递的数据:' + data)
  // 数据渲染至页面
  textarea1.value = textarea1.value + data + '' + '【消息】----> '
}
// 当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  websocket.close()
}
// 关闭连接
function closeWebSocket() {
  websocket.close()
}
const userinfo = ref()
// 发送消息
function send() {
  websocket.socket.send(JSON.stringify({ key: userinfo.value }))
}


</script>

<template>

  <div>{{ textarea1 }}</div>


  <input type="text" v-model="userinfo">
  <button @click="send">发送消息</button>
</template>

```

## 后端代码
>添加依赖
``` html
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.1.0</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>2.0.22</version>
        </dependency>
```

>配置类：WebSocketConfig
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
* <b>Function: </b> todo
* @program: WebSocketConfig
* @Package: com.king.websocket.config
* @author: dingcho
* @date: 2025/01/20
* @version: 1.0
* @Copyright: 2025 www.kingbal.com Inc. All rights reserved.
*/
@Configuration
public class WebSocketConfig {

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

}
```
>逻辑类:WebSocketServer
```java
import cn.hutool.core.util.StrUtil;
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import org.springframework.stereotype.Component;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

/**
 * <b>Function: </b> todo
 *
 * @program: WebSocketServer
 * @Package: com.king.websocket.server
 * @author: dingcho
 * @date: 2025/01/20
 * @version: 1.0
 * @Copyright: 2025 www.kingbal.com Inc. All rights reserved.
 */
@ServerEndpoint("/dev-api/websocket/{userId}")
@Component
public class WebSocketServer {

    static Log log = LogFactory.get(WebSocketServer.class);

    // 静态变量，用来记录当前在线连接数
    private static int onlineCount = 0;

    // 存放每个客户端对应的MyWebSocket对象
    private static ConcurrentHashMap<String, WebSocketServer> webSocketMap = new ConcurrentHashMap<>();

    // 与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    // 接收userId
    private String userId = "";

    /**
     * 连接建立成功调用的方法
     *
     * @param session
     * @param userId
     */
    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userId) {
        this.session = session;
        this.userId = userId;
        if (webSocketMap.containsKey(userId)) {
            webSocketMap.remove(userId);
            webSocketMap.put(userId, this);
        } else {
            webSocketMap.put(userId, this);
            addOnlineCount();
        }
        log.info("用户连接:" + userId + ",当前在线人数为:" + getOnlineCount());
        try {
            sendMessage("连接成功");
        } catch (IOException e) {
            log.error("用户:" + userId + ",网络异常!!!!!!");
        }
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
        if (webSocketMap.containsKey(userId)) {
            webSocketMap.remove(userId);
            //从set中删除
            subOnlineCount();
        }
        log.info("用户退出:" + userId + ",当前在线人数为:" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        log.info("用户消息:" + userId + ",报文:" + message);
        //可以群发消息
        //消息保存到数据库redis
        if (!StrUtil.isEmpty(message)) {
            try {
                //解析发送的报文
                JSONObject jsonObject = JSON.parseObject(message);

            } catch (Exception e) {

                log.error("用户:" + userId + ", 接收报文异常!!!!!!");
            }
        }
    }

    /**
     * 会话异常
     *
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error) {
        log.error("用户错误:" + this.userId + ",原因:" + error.getMessage());
    }

    /**
     * 实现服务器主动推送
     */
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    /**
     * 实现服务器主动推送
     */
    public static void sendAllMessage(String message) throws IOException {
        ConcurrentHashMap.KeySetView<String, WebSocketServer> userIds = webSocketMap.keySet();
        for (String userId : userIds) {
            WebSocketServer webSocketServer = webSocketMap.get(userId);
            webSocketServer.session.getBasicRemote().sendText(message);
            System.out.println("webSocket实现服务器主动推送成功 userId >> " + userId);
        }
    }

    /**
     * 发送自定义消息
     */
    public static void sendInfo(String message, @PathParam("userId") String userId) throws IOException {
        log.info("发送消息到:" + userId + "，报文:" + message);
        if (!StrUtil.isEmpty(message) && webSocketMap.containsKey(userId)) {
            webSocketMap.get(userId).sendMessage(message);
        } else {
            log.error("用户" + userId + ",不在线！");
        }
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }

}

```
>接口示例:WebSocketController
```java
import com.alibaba.fastjson2.JSONObject;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * <b>Function: </b> todo
 *
 * @program: WebSocketController
 * @Package: com.king.websocket.controller
 * @author: dingcho
 * @date: 2025/01/20
 * @version: 1.0
 * @Copyright: 2025 www.kingbal.com Inc. All rights reserved.
 */
@RestController
@RequestMapping("/message")
public class WebSocketController {

    // 设置定时十秒一次
    @Scheduled(cron = "0/50 * * * * ?")
    @PostMapping("/send")
    public String sendMessage() throws Exception {
        Map<String, Object> map = new HashMap<>();
        // 获取当前日期和时间
        LocalDateTime nowDateTime = LocalDateTime.now();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println(dateTimeFormatter.format(nowDateTime));
        map.put("server_time", dateTimeFormatter.format(nowDateTime));
        map.put("server_code", "200");
        map.put("server_message", "服务器消息来了！！！");
        JSONObject jsonObject = new JSONObject(map);
        WebSocketServer.sendAllMessage(jsonObject.toString());
        return jsonObject.toString();
    }

}

```
>启动类
```java
@EnableScheduling
@ServletComponentScan
@SpringBootApplication
public class WebsocketdemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebsocketdemoApplication.class, args);
    }

}

```