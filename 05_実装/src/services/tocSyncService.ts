import { AimdNode, TocDocument } from "../models";

const GENERATED_START = "<!-- aimd:generated-links:start -->";
const GENERATED_END = "<!-- aimd:generated-links:end -->";

export class TocSyncService {
  resolveTocFileName(hasIntroduction: boolean): string {
    return hasIntroduction ? "01_目次.md" : "00_目次.md";
  }

  generateToc(rootPath: string, nodes: AimdNode[], hasIntroduction: boolean, existingContent = ""): TocDocument {
    const tocPath = `${rootPath}/${this.resolveTocFileName(hasIntroduction)}`;
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
    return existingContent.replace(
      new RegExp(`${escapeRegExp(GENERATED_START)}[\\s\\S]*${escapeRegExp(GENERATED_END)}`),
      generatedBlock
    );
  }

  if (existingContent.trim().length === 0) {
    return generatedBlock;
  }

  return `${existingContent.trimEnd()}\n\n${generatedBlock}`;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
