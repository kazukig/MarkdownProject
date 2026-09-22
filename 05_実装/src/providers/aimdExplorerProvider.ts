import { AimdNode, AimdNodeType, FileEntry } from "../models";

const DISPLAYABLE_NAMES = new Set(["99_Image", ".aimd-meta"]);
const DISPLAYABLE_SUFFIXES = [".aimd-chapter", ".aimd-section", ".aimd-subsection", ".md"];

export class AimdExplorerProvider {
  buildTree(entries: FileEntry[]): AimdNode[] {
    return entries
      .flatMap((entry) => this.collectNodes(entry))
      .sort(compareNodes);
  }

  refresh(entries: FileEntry[]): AimdNode[] {
    return this.buildTree(entries);
  }

  private isDisplayable(name: string): boolean {
    return DISPLAYABLE_NAMES.has(name) || DISPLAYABLE_SUFFIXES.some((suffix) => name.endsWith(suffix));
  }

  private collectNodes(entry: FileEntry): AimdNode[] {
    const children = (entry.children ?? [])
      .flatMap((child) => this.collectNodes(child))
      .sort(compareNodes);

    if (!this.isDisplayable(entry.name)) {
      return children;
    }

    return [
      {
        path: entry.path,
        name: entry.name,
        type: detectNodeType(entry.name),
        order: extractOrder(entry.name),
        children,
        readonly: entry.name === ".aimd-meta"
      }
    ];
  }
}

function detectNodeType(name: string): AimdNodeType {
  if (name === "99_Image") {
    return "imageFolder";
  }

  if (name === ".aimd-meta") {
    return "metadata";
  }

  if (name.endsWith(".aimd-chapter")) {
    return "chapter";
  }

  if (name.endsWith(".aimd-section")) {
    return "section";
  }

  if (name.endsWith(".aimd-subsection")) {
    return "subsection";
  }

  if (name.endsWith(".md")) {
    return "document";
  }

  return "folder";
}

function extractOrder(name: string): number {
  const match = name.match(/^(\d+)_/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

function compareNodes(left: AimdNode, right: AimdNode): number {
  if (left.order !== right.order) {
    return left.order - right.order;
  }

  return left.name.localeCompare(right.name, "ja");
}
