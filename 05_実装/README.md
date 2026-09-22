# 05_実装 README

`05_実装` は VS Code 拡張機能の TypeScript 実装を配置するディレクトリです。現時点では `src/` 配下のソースと `tsconfig.json` によるビルド設定を管理しています。

## 前提条件
- VS Code
- Node.js / npm
- TypeScript コンパイラ
  - グローバルインストール済みの `tsc` を使うか、`npx tsc` で実行します。

## VS Code での開き方
1. VS Code を起動します。
2. **[ファイル] → [フォルダーを開く]** から、このリポジトリのルートフォルダを開きます。
3. エクスプローラーで `05_実装/` を開き、`src/extension.ts` を起点に実装を確認します。
4. **[ターミナル] → [新しいターミナル]** で統合ターミナルを開き、以降のコマンドを実行します。

## VS Code 拡張機能としての実行・確認方法
このディレクトリは VS Code 拡張機能の実装置き場です。現在の構成では `package.json` や `.vscode/launch.json` は未配置のため、まずは TypeScript のコンパイルで実装内容を確認します。

### 型チェックのみ行う場合
```bash
cd <repo-root>
tsc --project ./05_実装/tsconfig.json --noEmit
```

### JavaScript を出力して確認する場合
```bash
cd <repo-root>
tsc --project ./05_実装/tsconfig.json
```

- コンパイル結果は `05_実装/dist/` に出力されます。
- 変更しながら確認したい場合は、次の watch モードが便利です。

```bash
cd <repo-root>
tsc --project ./05_実装/tsconfig.json --watch
```

## `src/` 配下のコンパイル対象
`tsconfig.json` では、次のファイルをコンパイル対象にしています。

- `05_実装/src/**/*.ts`

主な起点ファイル:
- `05_実装/src/extension.ts`
- `05_実装/src/core/`
- `05_実装/src/providers/`
- `05_実装/src/services/`
- `05_実装/src/commands/`
- `05_実装/src/webview/`

## 補足
- `tsc` コマンドが見つからない場合は、`npx tsc --project ./05_実装/tsconfig.json --noEmit` のように `npx` 付きで実行してください。
- 将来的に VS Code 拡張機能として F5 実行を行う場合は、`05_実装` 配下またはリポジトリルートに `package.json` とデバッグ設定を追加してください。
