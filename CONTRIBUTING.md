# 参与贡献

感谢你愿意为 uni-highlight-vscode 贡献代码！本文档介绍项目结构、本地开发流程、测试方式和提交规范。

## 前置条件

- Node.js（仓库没有 `.node-version` 之类的固定版本，CI 在 16.x 上运行）
- pnpm 8.3.1（见 `package.json` 的 `packageManager`）

## 仓库结构

```
.github/
  workflows/          # CI 与发布工作流
  images/             # README 截图
src/
  index.ts            # 插件入口：读取配置、合并平台、注册提供器和命令
  parseComment/       # 条件编译注释解析为 AST
  constants/          # 正则、文件匹配模式、内置平台颜色
  utils/              # 平台名纠错（编辑距离）
  *.ts                # 高亮、折叠、悬停的具体实现
test/                 # vitest 测试（内联快照）
playground/           # 手动调试用例
```

## 本地开发

```bash
pnpm install
pnpm build      # tsup 打包到 dist/
pnpm dev        # watch 模式
```

调试方式：在 VSCode 中按 F5 启动扩展开发宿主（`.vscode/launch.json` 已配置好），`playground/` 里有各种条件编译用例可以验证效果。

## 测试与检查

```bash
pnpm lint       # eslint 检查
pnpm lint:fix   # eslint 自动修复
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest；本地默认 watch，CI 中单次运行
```

CI 在 Node 16.x 上运行 lint 和 typecheck，并在 ubuntu/macos/windows 三个系统上先 build 再 test。

## 提交规范

1. Fork 仓库，从 `main` 拉分支，分支名用 `feat/xxx`、`fix/xxx`、`docs/xxx` 风格。
2. 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/)，如 `feat:`、`fix:`、`docs:`。
3. 提交前跑 `pnpm lint`、`pnpm typecheck` 和 `pnpm test`。
4. 推送并打开 PR。

## Pull Request 指南

- 保持改动聚焦，一个 PR 只解决一个问题。
- 新增或调整内置平台时，同步 `src/builtinPlatforms.ts` 与 README 中的相关说明。
- CI 通过后等待 review；拿不准方案时先开 issue 讨论。

## 发布

维护者操作：运行 `pnpm release`，bumpp 会提升版本号、提交、打 tag 并推送；tag 触发 `.github/workflows/release.yml`，自动发布到 VSCode Marketplace 和 OpenVSX。

## 行为准则

参与本项目请遵守[组织级行为准则](https://github.com/uni-helper/.github/blob/main/CODE_OF_CONDUCT.md)。

有任何问题欢迎在 [Issues](https://github.com/uni-helper/uni-highlight-vscode/issues) 提出。
