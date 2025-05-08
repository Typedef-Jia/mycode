---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "main中世界"
  text: "Code Notes"
  tagline: 为快捷而生
  
  # 背景图
  image:
    src: /log.png
    alt: 背景图

  actions:
    - theme: brand
      text: 前往仓库
      link: /code/Preface.md
    
    - theme: alt
      text: 网站导航
      # link: /code/back/Overview
      link: /nav/index.md

features:
  - title: minio使用示例
    details: 
    link: /code/back/minio.md
    linkText: 立即查看

  - title:  vue3 mock使用示例
    details: 
    link: /code/forward/mock.md
    linkText: 立即查看

  - title:  WebSocket 使用示例
    details: 
    link: /code/forward/WebSocket.md
    linkText: 立即查看
  - title: 📄 内容精炼
    details: 具有较高的价值、准确性
    link: /code/Preface.md
    linkText: Go to

---


<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/log.png',
    name: 'Typedef-Joy',
    title: '文档维护',

    links: [
      { icon: 'github', link: 'https://github.com/Typedef-Joy' },
     
    ]
  },

]
</script>

### 成员

<VPTeamMembers size="medium" :members="members" />


<HomeUnderline />

