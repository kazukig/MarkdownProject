import { AiChangeSet } from "../../models";

export function renderPreviewDiff(changeSet: AiChangeSet): string {
  return `<!DOCTYPE html>
<html lang="ja">
  <body>
    <h1>変更プレビュー</h1>
    <p>対象ファイル数: ${changeSet.targetFiles.length}</p>
    <pre>${escapeHtml(changeSet.diff)}</pre>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
