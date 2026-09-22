import { AimdNode, ValidationIssue } from "../models";

export class DiagnosticsProvider {
  validate(nodes: AimdNode[]): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const metadataNodes = nodes.filter((node) => node.type === "metadata");

    if (metadataNodes.length > 1) {
      issues.push({
        severity: "warning",
        message: ".aimd-meta は 1 つに統一してください。",
        targetPath: metadataNodes[1].path,
        fixType: "restore-metadata"
      });
    }

    const tocExists = nodes.some((node) => /^0[01]_目次\.md$/.test(node.name));
    if (!tocExists) {
      issues.push({
        severity: "warning",
        message: "目次ファイルが見つかりません。",
        targetPath: nodes[0]?.path ?? "",
        fixType: "toc"
      });
    }

    issues.push(...this.validateOrder(nodes));
    return issues;
  }

  private validateOrder(nodes: AimdNode[]): ValidationIssue[] {
    return nodes.flatMap((node, index) => {
      if (node.order === Number.MAX_SAFE_INTEGER) {
        return [];
      }

      const expected = index;
      if (node.order !== expected && node.order !== expected + 1) {
        return [
          {
            severity: "info",
            message: `接頭辞順を確認してください: ${node.name}`,
            targetPath: node.path,
            fixType: "reorder"
          }
        ];
      }

      return [];
    });
  }
}
