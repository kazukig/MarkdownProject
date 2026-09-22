import { ImageAssetInfo, WorkspaceKind } from "../models";

export interface ImageAssetRequest {
  sourceFile: string;
  currentDocumentPath: string;
  label: string;
  mode: WorkspaceKind;
  configuredAssetDirectory?: string;
  commonAncestorPath?: string;
  existingAssetPaths?: string[];
}

export class ImageAssetService {
  buildAssetInfo(request: ImageAssetRequest): ImageAssetInfo {
    const targetDirectory = this.resolveTargetDirectory(request);
    const sequence = nextSequence(request.existingAssetPaths ?? [], baseName(request.currentDocumentPath));
    const extension = extensionName(request.sourceFile) || ".png";
    const normalizedLabel = slugifyLabel(request.label);
    const documentStem = baseName(request.currentDocumentPath);
    const fileName = `${documentStem}_fig${String(sequence).padStart(2, "0")}_${normalizedLabel}${extension}`;
    const targetPath = `${targetDirectory}/${fileName}`;

    return {
      sourceFile: request.sourceFile,
      targetPath,
      sequence,
      label: request.label,
      referencePath: relativePath(directoryName(request.currentDocumentPath), targetPath)
    };
  }

  resolveTargetDirectory(request: ImageAssetRequest): string {
    if (request.mode === "aimd") {
      const baseDirectory = request.commonAncestorPath ?? directoryName(request.currentDocumentPath);
      return `${trimTrailingSlash(baseDirectory)}/99_Image`;
    }

    return `${trimTrailingSlash(directoryName(request.currentDocumentPath))}/${request.configuredAssetDirectory ?? "asset"}`;
  }
}

function nextSequence(existingAssetPaths: string[], documentStem: string): number {
  const matcher = new RegExp(`${escapeRegExp(documentStem)}_fig(\\d{2})_`, "i");
  const maxSequence = existingAssetPaths.reduce((currentMax, path) => {
    const match = path.match(matcher);
    return match ? Math.max(currentMax, Number(match[1])) : currentMax;
  }, 0);

  return maxSequence + 1;
}

function baseName(path: string): string {
  const normalized = path.replace(/\\/g, "/");
  const name = normalized.slice(normalized.lastIndexOf("/") + 1);
  return name.replace(/\.[^.]+$/, "");
}

function directoryName(path: string): string {
  const normalized = path.replace(/\\/g, "/");
  const index = normalized.lastIndexOf("/");
  return index >= 0 ? normalized.slice(0, index) : normalized;
}

function extensionName(path: string): string {
  const match = path.match(/(\.[^.\/]+)$/);
  return match?.[1] ?? "";
}

function slugifyLabel(label: string): string {
  const normalized = label.trim().replace(/\s+/g, "_").replace(/[\\/:*?"<>|]/g, "-");
  return normalized.length > 0 ? normalized : "image";
}

function trimTrailingSlash(path: string): string {
  return path.replace(/[\\/]+$/, "");
}

function relativePath(fromDir: string, targetPath: string): string {
  const fromParts = trimTrailingSlash(fromDir).split("/").filter(Boolean);
  const targetParts = trimTrailingSlash(targetPath).split("/").filter(Boolean);
  while (fromParts.length > 0 && targetParts.length > 0 && fromParts[0] === targetParts[0]) {
    fromParts.shift();
    targetParts.shift();
  }

  const up = fromParts.map(() => "..");
  return [...up, ...targetParts].join("/") || ".";
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
