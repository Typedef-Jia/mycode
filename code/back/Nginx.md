# Nginx

<ArticleMetadata />

### 服务管理
```sh
sudo systemctl status nginx # nginx当前状态
sudo systemctl reload nginx # 重新加载 nginx
sudo systemctl restart nginx # 重启nginx

sudo nginx -t   # 检查语法
nginx           # 启动
nginx -s reload # 重启
nginx -s stop   # 关闭进程
nginx -s quit   # 平滑关闭nginx
nginx -V        # 查看nginx的安装状态，
```
### 简单代理
```sh
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_redirect      off;
  proxy_set_header    Host $host;
}
```