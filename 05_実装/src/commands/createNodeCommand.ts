import { CreateNodeRequest } from "../models";

export function createNodeCommand(request: CreateNodeRequest): string {
  return joinPath(request.parentPath, segmentFor(request.nodeName, request.nodeType));
}

function segmentFor(nodeName: string, nodeType: CreateNodeRequest["nodeType"]): string {
  switch (nodeType) {
    case "chapter":
      return `${nodeName}.aimd-chapter`;
    case "section":
      return `${nodeName}.aimd-section`;
    case "subsection":
      return `${nodeName}.aimd-subsection`;
    case "document":
      return `${nodeName}.md`;
    case "imageFolder":
      return "99_Image";
    case "metadata":
      return ".aimd-meta";
    default:
      return nodeName;
  }
}

function joinPath(parentPath: string, segment: string): string {
  const normalizedParent = parentPath.replace(/\\/g, "/").replace(/\/+$/, "");
  return normalizedParent.length > 0 ? `${normalizedParent}/${segment}` : segment;
}
