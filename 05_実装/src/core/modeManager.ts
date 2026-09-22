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
    return workspaces.some(
      (workspace) => workspace.mode === "aimd" && targetPath.startsWith(workspace.rootPath)
    );
  }
}
