import { ReorderNodeRequest } from "../models";

export function reorderNodeCommand(request: ReorderNodeRequest): string {
  return `${request.sourcePath} => ${request.targetPath}`;
}
