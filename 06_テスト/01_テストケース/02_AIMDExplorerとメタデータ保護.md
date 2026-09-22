# テストケース02: AIMD Explorer表示と .aimd-meta 保護

## 目的
AIMDモード時にAIMD Explorerが使え、`.aimd-meta` が保護表示・保護動作になることを確認する。

## 操作
1. VS Codeで `06_テスト/Document.aimd` を開く。
2. サイドバーのAIMD Explorerで `.aimd-meta` が鍵付き・グレー表示であることを確認する。
3. `.aimd-meta/AI_CONTEXT.md` を開く。
4. 任意の文字を追記して保存を試みる。

## 結果
- `.aimd-meta` は通常ノードと区別された保護表示になる。
- `.aimd-meta` 配下ファイルは読み取り専用として扱われる、または保存前に警告/確認が表示される。
- 手動編集をそのまま確定できない（保護ガードが働く）。

## 要件・基本設計の根拠
- `02_要件定義/AIMDStudio.md` 2.1（メタデータ保護制御）
- `03_基本設計・外部設計/基本設計書.md` 4.2（AIMD Explorer）、4.6（メタデータ保護）
