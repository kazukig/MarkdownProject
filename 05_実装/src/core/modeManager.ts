import { WorkspaceFolderEntry, WorkspaceMode } from "../models";

export class ModeManager {
  detectWorkspaceMode(workspace: WorkspaceFolderEntry): WorkspaceMode {
    return {
      mode: workspace.name.endsWith(".aimd") ? "aimd" : "markdown",
      rootPath: workspace.path,
      workspaceName: workspace.name
    };
  }

  detectWorkspaceModes(workspaces: WorkspaceFolderEntry[]): WorkspaceMode[] {
    return workspaces.map((workspace) => this.detectWorkspaceMode(workspace));
  }

  isAimdPath(targetPath: string, workspaces: WorkspaceMode[]): boolean {
    const normalizedTarget = normalizePath(targetPath);
    return workspaces.some((workspace) => {
      if (workspace.mode !== "aimd") {
        return false;
      }

      const normalizedRoot = trimTrailingSlash(normalizePath(workspace.rootPath));
      return normalizedTarget === normalizedRoot || normalizedTarget.startsWith(`${normalizedRoot}/`);
    });
  }
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}

function trimTrailingSlash(path: string): string {
  return path.replace(/\/+$/, "");
}
