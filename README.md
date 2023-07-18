<h1 align="center"><font color="#2a9838">uni-helper/uni-highlight-vscode</font></h1>
<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-highlight-vscode" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/uni-helper.uni-highlight-vscode.svg?color=4d9375&amp;label=Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>
<a href="https://open-vsx.org/extension/uni-helper/uni-highlight-vscode" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/uni-helper.uni-highlight-vscode.svg?color=c160ef&amp;label=OpenVSX&logo=OpenVSX" alt="Visual Studio Marketplace Version" /></a>
</p>

## VS Code条件编译语法高亮支持

在`VS Code`中对条件编译的代码注释部分提供了语法高亮，可分辨出写法是否正确，使得代码更加清晰

***

### 基础使用

<img src="./.github/images/base.png" width="300">

***

### 错误提示

<img src='./.github/images/error.png' width="400">

### 注释块折叠

<img src="./.github/images/folding.png" width="300">

***

### 多平台高亮

<img src="./.github/images/more.png" width="300">

***

### 自定义高亮

```jsonc
/**
 * 文件路径：.vscode/settings.json
 * 配置项：uni-highlight.platform
 * 配置说明：1. 可以覆盖原有高亮颜色
 *          2. 可以添加新的平台及颜色
 */
{
  "uni-highlight.platform": {
    "MP-DINGTALK": "#41b883"
  }
}
```

***

### 各平台多种颜色高亮

<img src="./.github/images/colorful.png" width="300">

***

### css高亮

<img src='./.github/images/css.png' width="300">

***

### html高亮

<img src='./.github/images/html.png' width="300">
