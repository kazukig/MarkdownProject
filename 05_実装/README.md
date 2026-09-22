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

## VS Code 拡張機能としてのデバッグ手順
現状の `05_実装` は TypeScript の実装スキャフォールドまでが配置されており、拡張機能として F5 実行するためのマニフェストやデバッグ設定はまだありません。そのため、拡張機能デバッグは次の流れで行います。

1. リポジトリルートを VS Code で開きます。
2. 統合ターミナルで次の watch コンパイルを開始し、`dist/` に JavaScript を継続出力します。

   ```bash
   cd <repo-root>
   tsc --project ./05_実装/tsconfig.json --watch
   ```

3. 拡張機能として起動する準備として、`05_実装` 配下またはリポジトリルートに以下を用意します。
   - `package.json`（拡張機能名、`main`、`activationEvents`、`contributes` などを定義）
   - `.vscode/launch.json`（`Run Extension` / `Launch Extension` 構成）
4. 準備後、VS Code の **[実行とデバッグ]** で `Launch Extension` を選択して F5 を押します。
5. 別ウィンドウの **Extension Development Host** が起動するので、そのウィンドウでコマンドやビューを操作して動作確認します。
6. 元の VS Code ウィンドウで、ブレークポイント・変数・コールスタック・デバッグコンソールを使って原因調査を行います。

### デバッグ時の注意
- 現在の `tsconfig.json` には `sourceMap` 設定がないため、TypeScript ファイルに直接ブレークポイントを張るには source map の追加が必要です。
- source map を追加しない場合は、`05_実装/dist/` に出力された JavaScript を基準に動作確認してください。
- `package.json` と `.vscode/launch.json` が未配置のままでは、拡張機能としての F5 実行はできません。

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
- VS Code 拡張機能としてデバッグ実行する場合は、`05_実装` 配下またはリポジトリルートに `package.json` と `.vscode/launch.json` を追加してください。
