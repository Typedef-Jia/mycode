
# **git** 常用命令
## 本地项目推送到github仓库中
> 在git命令界面依次下面命令

```yml
 1：git init

 2：git add .

 3：git commit -m "任意提交消息"

 4：git branch -m master main

 5：git remote add origin 仓库地址的url

 6：git push -u origin main
```
::: tip 说明
**如果第六步推送失败，执行下面命令强制推送**
:::
```yml
git push -u origin main --force
```
## 清空github仓库中所有文件及文件夹
```yml
# 把仓库克隆到本地
 1：git clone 仓库的url

# 进入本地仓库
 2：cd 你克隆仓库的名字

# 删除所有文件及文件夹
 3：git rm -r *        

# 提交操作消息
 4：git commit -m '清空仓库'

# 推送到仓库中
 5：git push
```
### 清除 DNS 缓存 ipconfig /flushdns

### 取消代理
```bash
git config --global --unset http.proxy 
git config --global --unset https.proxy
```
  