export interface SlashCommandTemplate {
  label: string;
  insertText: string;
  detail: string;
}

const DEFAULT_TEMPLATES: SlashCommandTemplate[] = [
  { label: "/h1", insertText: "# ", detail: "見出し1" },
  { label: "/h2", insertText: "## ", detail: "見出し2" },
  { label: "/table", insertText: "| 列1 | 列2 |\n| --- | --- |\n| 値1 | 値2 |", detail: "表テンプレート" },
  { label: "/quote", insertText: "> ", detail: "引用" },
  { label: "/code", insertText: "```text\n\n```", detail: "コードブロック" }
];

export class SlashCommandProvider {
  constructor(private readonly templates: SlashCommandTemplate[] = DEFAULT_TEMPLATES) {}

  suggest(line: string): SlashCommandTemplate[] {
    const trimmed = line.trim();
    if (trimmed.length === 0 || trimmed === "/") {
      return [...this.templates];
    }

    if (!trimmed.startsWith("/")) {
      return [];
    }

    return this.templates.filter((template) => template.label.startsWith(trimmed));
  }

  applySelection(document: string, selectionStart: number, selectionEnd: number, command: SlashCommandTemplate): string {
    return `${document.slice(0, selectionStart)}${command.insertText}${document.slice(selectionEnd)}`;
  }
}
