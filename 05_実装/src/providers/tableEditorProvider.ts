export class TableEditorProvider {
  isMarkdownTable(text: string): boolean {
    const lines = text.split(/\r?\n/).filter((line) => line.length > 0);
    return lines.length >= 2 && lines.every((line) => line.includes("|"));
  }

  addRow(table: string, insertIndex?: number): string {
    const rows = parseTable(table);
    if (rows.length === 0) {
      return table;
    }

    const targetIndex = insertIndex ?? rows.length;
    const columnCount = rows[0].length;
    const newRow = Array.from({ length: columnCount }, () => " ");
    rows.splice(targetIndex, 0, newRow);
    return stringifyTable(rows);
  }

  removeRow(table: string, rowIndex: number): string {
    const rows = parseTable(table);
    if (rowIndex < 0 || rowIndex >= rows.length) {
      return table;
    }

    rows.splice(rowIndex, 1);
    return stringifyTable(rows);
  }

  addColumn(table: string, insertIndex?: number): string {
    const rows = parseTable(table);
    if (rows.length === 0) {
      return table;
    }

    const targetIndex = insertIndex ?? rows[0].length;
    rows.forEach((row) => row.splice(targetIndex, 0, " "));
    return stringifyTable(rows);
  }
}

function parseTable(table: string): string[][] {
  return table
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));
}

function stringifyTable(rows: string[][]): string {
  return rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
}
