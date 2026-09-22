export interface MetadataView {
  originalPath: string;
  virtualPath: string;
  content: string;
}

export class MetadataGuardService {
  isProtectedPath(targetPath: string): boolean {
    return targetPath.replace(/\\/g, "/").includes("/.aimd-meta/") || targetPath.endsWith("/.aimd-meta");
  }

  canWrite(targetPath: string, initiatedBySystem = false): boolean {
    return initiatedBySystem || !this.isProtectedPath(targetPath);
  }

  buildReadonlyView(originalPath: string, content: string): MetadataView {
    return {
      originalPath,
      virtualPath: `aimd-meta:${originalPath}`,
      content: `# 読み取り専用メタデータ表示\n\n元ファイル: ${originalPath}\n\n---\n${content}`
    };
  }
}
