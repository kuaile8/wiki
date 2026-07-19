# 贡献指南

感谢你愿意为 Edgeless Wiki 做出贡献！本指南将帮助你了解如何参与协作。

## 协作流程

### 1. Fork 仓库

点击右上角的 **Fork** 按钮，将仓库复制到你的 GitHub 账户。

### 2. 克隆到本地

```bash
git clone https://github.com/YOUR_USERNAME/REPO.git
cd REPO
```

### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-fix-name
```

### 4. 编辑文档

在 `docs/` 目录下进行编辑。遵循以下规范：

- 使用 **中文** 或 **英文**（保持一致）
- 代码块标注语言类型（如 `\`\`\`javascript`）
- 使用相对路径引用其他文档
- 保持适当的标题层级（H2 > H3 > H4）

### 5. 提交更改

```bash
git add .
git commit -m "feat: 添加 XXX 文档"
git push origin feature/your-feature-name
```

### 6. 创建 Pull Request

在你的 GitHub 仓库页面点击 **Compare & pull request**，填写：

- **标题**：简洁描述改动内容
- **描述**：详细说明改动的目的和内容

## 文档规范

### 命名规范

- 文件名使用小写英文，单词间用连字符分隔（如 `getting-started.md`）
- 文件夹名称使用小写英文

### 格式规范

- 使用 **4 空格缩进**
- 段落之间空一行
- 链接使用 Markdown 标准语法

## 审核流程

1. 维护者会审查你的 PR
2. 可能需要根据反馈进行修改
3. 审核通过后合并到主分支
4. 自动触发 GitHub Actions 构建部署

## 问题反馈

如果有问题或建议，可以通过以下方式反馈：

- 在仓库中提交 **Issue**
- 在 **Discussions** 中讨论