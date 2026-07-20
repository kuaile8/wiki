import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 导入自定义样式
    import('./custom.css')
  }
}
