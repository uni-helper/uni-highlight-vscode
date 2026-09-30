# uni-highlight-vscode

VSCode extension that syntax-highlights and folds uni-app conditional-compilation comments (`#ifdef` / `#ifndef` / `#endif`) and flags unknown platform names. Published to the VSCode Marketplace and OpenVSX as `uni-helper.uni-highlight-vscode`.

## Project

- TypeScript, `strict`; bundled by tsup into a single CJS file `dist/index.js` (`vscode` stays external). Build output is not committed.
- Package manager pnpm 12.3.4 (`packageManager`); Node is pinned to 26 by `.node-version`. pnpm settings and build-script approvals (`allowBuilds` for esbuild/keytar/vsce-sign) live in `pnpm-workspace.yaml`.
- `engines.vscode` and `@types/vscode` are both `^1.138.0` — move them together.
- Distributed only through the VSCode Marketplace and OpenVSX (`vsce`/`ovsx`); not an npm package — never `npm publish` (there is no `private` guard anymore).
- The vsix is controlled by the npm `files` field (`LICENSE`, `logo.png`, `dist`) — there is no `.vscodeignore`. A new runtime asset must be added to `files` or it will be missing from the package (and `vsce` fails hard on the `icon` file).
- Release flow: `pnpm release` (bumpp) pushes a `v*` tag → `.github/workflows/release.yml` → changelogithub creates the GitHub Release, then `vsce` + `ovsx` publish.
- The `dev` and `vscode:prepublish` scripts call `nr` from `@antfu/ni`.
- CI matrix is Node 22/24/26 × ubuntu/macos/windows, one job running build → lint → typecheck → test.

## Commands

```bash
pnpm build        # tsup: src/index.ts → dist/index.js (CJS)
pnpm dev          # tsup --watch via nr
pnpm lint         # eslint flat config (@antfu/eslint-config); playground/ ignored
pnpm lint:fix     # eslint --fix
pnpm test         # vitest; watch in a TTY, single run in CI
pnpm typecheck    # tsc --noEmit
pnpm release      # bumpp: bump version, commit, tag, push → release.yml publishes
```

## Architecture

Pipeline: document text → `parseComment` (regex AST) → `getPlatformInfo` (typed tokens) → `transformPlatform` (vscode ranges) → `setPlatformColor` (decorations).

| Module | Role |
| --- | --- |
| `src/index.ts` | `activate()`: reads `uni-highlight.platform` config, merges builtin + custom labels, registers the folding/hover providers and the two commands |
| `src/getVscodeRange.ts` | `Ranges` class — module-level mutable state (`platformInfo`/`platformList` are statics); every `new Ranges()` recomputes highlights and toggles the `uni.hasComment` context key |
| `src/parseComment/` | `constants/regex.ts` matches comment lines; `parsePlatform` splits multi-platform `A \|\| B` |
| `src/getPlatformInfo.ts` | AST → `PlatformInfo[]`; known platforms carry a color, unknown ones become `unPlatform` |
| `src/transformPlatform.ts` | String offsets → `vscode.Range[]` grouped into prefix / per-color platform / unknown |
| `src/setPlatformColor.ts` | One decoration type per color; unknown platforms get a dashed underline with a hover suggesting the Levenshtein-closest platform (`utils/findClosestPlatform.ts`) |
| `src/CommentFoldingRangeProvider.ts` | Folding ranges for `#ifdef`/`#ifndef`…`#endif` pairs; `.uvue`/`.uts` files are blacklisted |
| `src/foldOtherPlatformComment.ts` | Quick pick → `editor.fold`/`editor.unfold` around the chosen platform |
| `src/HoverProvider.ts` | Hover on a platform token shows its configured label |
| `src/builtinPlatforms.ts` | The 27 builtin platforms (colors + Chinese labels); user config overrides merge on top |
| `src/constants/patterns.ts` | Document selectors (15 file extensions) and `foldBlacklist` |

## Conventions

- `src/constants/platform.ts` reads `workspace.getConfiguration('uni-highlight')` **at module load** — this is why every test file starts with `vi.mock('vscode', …)`. Settings changes need a window reload; nothing listens to `onDidChangeConfiguration`, and the reload command only rescans the document, it does not re-read config.
- Tests: vitest with inline snapshots, `test/` mirrors the `src/` layout.
- `playground/` is a manual test bench for the F5 extension dev host; excluded from lint via `eslint.config.js` and from the vsix via `files`.
- `.editorconfig` is committed (2-space indent, LF, UTF-8).
- Comments and user-facing strings in `src/` are Simplified Chinese; docs are Chinese; this file is English.
- Conventional Commits (`feat:`, `fix:`, `chore:`, …); release tags are `v*`.
