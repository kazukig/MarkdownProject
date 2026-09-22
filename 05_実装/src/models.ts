export type WorkspaceKind = "aimd" | "markdown";

export interface WorkspaceMode {
  mode: WorkspaceKind;
  rootPath: string;
  workspaceName: string;
}

export interface WorkspaceFolderEntry {
  path: string;
  name: string;
}

export interface ActivationResult {
  workspaces: WorkspaceMode[];
  commonProviders: string[];
  aimdWorkspaceFeatures: Record<string, string[]>;
}

export type AimdNodeType =
  | "chapter"
  | "section"
  | "subsection"
  | "document"
  | "imageFolder"
  | "metadata"
  | "folder";

export interface AimdNode {
  path: string;
  name: string;
  type: AimdNodeType;
  order: number;
  children: AimdNode[];
  readonly?: boolean;
}

export interface FileEntry {
  path: string;
  name: string;
  isDirectory: boolean;
  children?: FileEntry[];
}

export interface ImageAssetInfo {
  sourceFile: string;
  targetPath: string;
  sequence: number;
  label: string;
  referencePath: string;
}

export type ValidationSeverity = "error" | "warning" | "info";
export type ValidationFixType = "rename" | "toc" | "restore-metadata" | "reorder";

export interface ValidationIssue {
  severity: ValidationSeverity;
  message: string;
  targetPath: string;
  fixType: ValidationFixType;
}

export interface AiChangeSet {
  targetFiles: string[];
  diff: string;
  requiresMetadataUpdate: boolean;
  summary: string;
}

export interface ManifestNode {
  id: string;
  path: string;
  type: AimdNodeType;
}

export interface ManifestAsset {
  id: string;
  path: string;
  ownerNodeId: string;
}

export interface ManifestModel {
  version: string;
  rootDocument: string;
  toc: string;
  nodes: ManifestNode[];
  assets: ManifestAsset[];
  rulesRef: string[];
}

export interface TocDocument {
  path: string;
  content: string;
}

export interface ContextFile {
  path: string;
  content: string;
}

export interface AiContextBundle {
  rules?: ContextFile;
  context?: ContextFile;
  manifest?: ContextFile;
}

export interface AiPanelState {
  visible: boolean;
  reason: string;
}

export interface ConversionPlan {
  rootPath: string;
  snapshotPath: string;
  mode: "standard" | "ai-assisted";
  operations: string[];
}

export interface CreateNodeRequest {
  parentPath: string;
  nodeName: string;
  nodeType: AimdNodeType;
}

export interface ReorderNodeRequest {
  sourcePath: string;
  targetPath: string;
}

export interface CleanupImageResult {
  keptPaths: string[];
  removedPaths: string[];
}
