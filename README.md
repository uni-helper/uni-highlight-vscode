# @uni-helper/uni-highlight-vscode

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/uni-helper/uni-highlight-vscode@main/logo.png" alt="logo" width="256" height="256" />
</p>

<p align="center">
  <a href="https://github.com/uni-helper/uni-highlight-vscode/blob/main/LICENSE"><img src="https://img.shields.io/github/license/uni-helper/uni-highlight-vscode?labelColor=005947&color=eee&style=for-the-badge" alt="License"></a>
  <a href="https://github.com/uni-helper/uni-highlight-vscode/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/uni-highlight-vscode?labelColor=005947&color=eee&style=for-the-badge" alt="GitHub Stars"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-highlight-vscode"><img src="https://vsmarketplacebadges.dev/version-short/uni-helper.uni-highlight-vscode.svg?labelColor=005947&color=eee&style=for-the-badge" alt="VSCode version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-highlight-vscode"><img src="https://vsmarketplacebadges.dev/downloads-short/uni-helper.uni-highlight-vscode.svg?labelColor=005947&color=eee&style=for-the-badge" alt="VSCode downloads"></a>
</p>
<p align="center">
  <a href="https://github.com/FliPPeDround"><img src="https://img.shields.io/badge/Author-FliPPeDround-blue?style=for-the-badge" alt="Author"></a>
</p>

在 VS Code 中为 [uni-app](https://uniapp.dcloud.net.cn/) 条件编译的代码注释提供语法高亮、错误提示和折叠功能。

> **请考虑持续[赞助](https://afdian.com/a/flippedround)以维持该项目的持续健康发展，非常感谢！🙏**

想让 `uni-app` 开发变得更直观、高效？想要更好的 `uni-app` 开发体验？不妨看看 [uni-helper 主页](https://uni-helper.js.org) 和 [uni-helper GitHub Organization](https://github.com/uni-helper)！

## 插件特性

- 条件编译注释语法高亮，多平台分色显示
- 未知平台错误提示，并推测最接近的正确写法
- 条件编译注释块折叠，支持一键折叠其他平台
- 支持 Vue、JS、TS、CSS、HTML 等多种文件类型

### 基础使用

<img src="./.github/images/base.png" width="300">

### 错误提示

<img src="./.github/images/error.png" width="400">

### 错误推测

<img src="./.github/images/infer.png" width="400">

### 注释块折叠

<img src="./.github/images/folding.png" width="300">

### 多平台高亮

<img src="./.github/images/more.png" width="300">

### 各平台多种颜色高亮

<img src="./.github/images/colorful.png" width="300">

### CSS 高亮

<img src="./.github/images/css.png" width="300">

### HTML 高亮

<img src="./.github/images/html.png" width="300">

## 扩展设置

|设置|类型|默认值|说明|
|-|-|-|-|
|`uni-highlight.platform`|`object`|`{}`|自定义平台高亮和名称，可覆盖内置平台的颜色、标签，或添加新平台|

在 `.vscode/settings.json` 中配置，值可以直接写颜色：

```json
{
  "uni-highlight.platform": {
    "MP-DINGTALK": "#41b883"
  }
}
```

也可以带上平台说明：

```json
{
  "uni-highlight.platform": {
    "MP-DINGTALK": {
      "color": "#41b883",
      "label": "钉钉"
    }
  }
}
```

修改设置后需要重载窗口（`Developer: Reload Window`）才会生效。

## 命令

|命令|标题|说明|
|-|-|-|
|`uni.comment.reload`|Uni Helper: 重新加载条件编译高亮|重新扫描当前文件的条件编译注释，刷新高亮和折叠|
|`uni.comment.fold-other-platform`|Uni Helper: 选择平台并折叠其他平台注释|选择一个平台，折叠其余平台的注释块；检测到条件编译注释时，编辑器标题栏会显示对应按钮|

## 参与贡献

欢迎通过 Issue 或 Pull Request 参与改进本项目。开始前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)，了解项目结构、本地开发流程、测试方式与提交规范。

## 许可证

[MIT](https://github.com/uni-helper/uni-highlight-vscode/blob/main/LICENSE) © 2022-present [uni-helper](https://github.com/uni-helper) & Collaborators
