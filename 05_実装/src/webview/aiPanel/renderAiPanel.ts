import { AiPanelState } from "../../models";

export function renderAiPanel(state: AiPanelState): string {
  const status = state.visible ? "利用可能" : "非表示";
  return `<!DOCTYPE html>
<html lang="ja">
  <body>
    <h1>AIMD AI パネル</h1>
    <p>状態: ${escapeHtml(status)}</p>
    <p>${escapeHtml(state.reason)}</p>
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
