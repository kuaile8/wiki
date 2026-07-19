# API 参考

## 概述

本节介绍 Edgeless Wiki 的核心 API 和使用方法。

## 核心接口

### 文档管理

- **创建文档**：在 `docs/` 目录下新建 `.md` 文件
- **编辑文档**：直接修改现有文件内容
- **删除文档**：移除文件并更新侧边栏配置

### 配置接口

所有配置项都在 `.vitepress/config.js` 中定义：

| 配置项 | 类型 | 说明 |
|--------|------|------|
| `title` | `string` | 站点标题 |
| `description` | `string` | 站点描述 |
| `lang` | `string` | 站点语言 |
| `base` | `string` | 部署路径 |

### 主题配置

| 配置项 | 说明 |
|--------|------|
| `nav` | 顶部导航栏 |
| `sidebar` | 左侧边栏 |
| `editLink` | GitHub 编辑链接 |
| `lastUpdated` | 最后更新时间 |