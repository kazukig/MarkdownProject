import { AimdNode, TocDocument } from "../models";

const GENERATED_START = "<!-- aimd:generated-links:start -->";
const GENERATED_END = "<!-- aimd:generated-links:end -->";

export class TocSyncService {
  resolveTocFileName(hasIntroduction: boolean): string {
    return hasIntroduction ? "01_目次.md" : "00_目次.md";
  }

  generateToc(rootPath: string, nodes: AimdNode[], hasIntroduction: boolean, existingContent = ""): TocDocument {
    const tocPath = joinPath(rootPath, this.resolveTocFileName(hasIntroduction));
    const generatedBlock = [
      GENERATED_START,
      ...flattenNodes(nodes).map((node) => `${indent(node.depth)}- [${displayName(node.name)}](${node.path})`),
      GENERATED_END
    ].join("\n");

    const content = mergeGeneratedBlock(existingContent, generatedBlock);
    return {
      path: tocPath,
      content
    };
  }
}

function flattenNodes(nodes: AimdNode[], depth = 0): Array<AimdNode & { depth: number }> {
  return nodes.flatMap((node) => [{ ...node, depth }, ...flattenNodes(node.children, depth + 1)]);
}

function indent(depth: number): string {
  return "  ".repeat(depth);
}

function displayName(name: string): string {
  return name.replace(/\.(aimd-chapter|aimd-section|aimd-subsection|md)$/, "");
}

function mergeGeneratedBlock(existingContent: string, generatedBlock: string): string {
  if (existingContent.includes(GENERATED_START) && existingContent.includes(GENERATED_END)) {
    const startIndex = existingContent.indexOf(GENERATED_START);
    const endIndex = existingContent.indexOf(GENERATED_END, startIndex);
    if (startIndex >= 0 && endIndex >= 0) {
      const afterEnd = endIndex + GENERATED_END.length;
      return `${existingContent.slice(0, startIndex)}${generatedBlock}${existingContent.slice(afterEnd)}`;
    }
  }

  if (existingContent.trim().length === 0) {
    return generatedBlock;
  }

  return `${existingContent.trimEnd()}\n\n${generatedBlock}`;
}

function joinPath(rootPath: string, name: string): string {
  const normalizedRoot = rootPath.replace(/\\/g, "/").replace(/\/+$/, "");
  return normalizedRoot.length > 0 ? `${normalizedRoot}/${name}` : name;
}
