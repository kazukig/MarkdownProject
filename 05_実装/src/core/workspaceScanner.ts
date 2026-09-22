import { ModeManager } from "./modeManager";
import { WorkspaceFolderEntry, WorkspaceMode } from "../models";

export class WorkspaceScanner {
  constructor(private readonly modeManager: ModeManager) {}

  scan(workspaceFolders: WorkspaceFolderEntry[]): WorkspaceMode[] {
    return this.modeManager.detectWorkspaceModes(workspaceFolders);
  }
}
