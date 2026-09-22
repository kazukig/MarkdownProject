export class TableEditorProvider {
  isMarkdownTable(text: string): boolean {
    const parsed = parseTable(text);
    return parsed !== undefined;
  }

  addRow(table: string, insertIndex?: number): string {
    const parsed = parseTable(table);
    if (!parsed) {
      return table;
    }

    const targetIndex = clamp(insertIndex ?? parsed.body.length, 0, parsed.body.length);
    const columnCount = parsed.header.length;
    const newRow = Array.from({ length: columnCount }, () => " ");
    parsed.body.splice(targetIndex, 0, newRow);
    return stringifyTable(parsed);
  }

  removeRow(table: string, rowIndex: number): string {
    const parsed = parseTable(table);
    if (!parsed || rowIndex < 0 || rowIndex >= parsed.body.length) {
      return table;
    }

    parsed.body.splice(rowIndex, 1);
    return stringifyTable(parsed);
  }

  addColumn(table: string, insertIndex?: number): string {
    const parsed = parseTable(table);
    if (!parsed) {
      return table;
    }

    const targetIndex = clamp(insertIndex ?? parsed.header.length, 0, parsed.header.length);
    parsed.header.splice(targetIndex, 0, " ");
    parsed.delimiter.splice(targetIndex, 0, "---");
    parsed.body.forEach((row) => row.splice(targetIndex, 0, " "));
    return stringifyTable(parsed);
  }
}

interface ParsedTable {
  header: string[];
  delimiter: string[];
  body: string[][];
}

function parseTable(table: string): ParsedTable | undefined {
  const rows = table
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()));

  if (rows.length < 2) {
    return undefined;
  }

  const [header, delimiter, ...body] = rows;
  if (!header || !delimiter || !delimiter.every((cell) => /^:?-{3,}:?$/.test(cell))) {
    return undefined;
  }

  return { header, delimiter, body };
}

function stringifyTable(table: ParsedTable): string {
  return [table.header, table.delimiter, ...table.body].map((row) => `| ${row.join(" | ")} |`).join("\n");
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
