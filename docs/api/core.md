# API 核心接口

## 核心模块

### 文档渲染

VitePress 使用 Markdown 作为内容源，支持丰富的扩展语法。

### 路由系统

- 基于文件的动态路由
- 支持嵌套路由
- 自动生成分页链接

## 进阶用法

### 自定义组件

```vue
<template>
  <div class="custom-component">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
</script>
```

### 插件系统

VitePress 支持通过 Vite 插件扩展功能：

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import myPlugin from 'vitepress-plugin-my-plugin'

export default defineConfig({
  // ...
  vite: {
    plugins: [myPlugin()]
  }
})
```