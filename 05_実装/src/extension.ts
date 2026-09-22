import { ModeManager } from "./core/modeManager";
import { WorkspaceScanner } from "./core/workspaceScanner";
import { ActivationResult, WorkspaceFolderEntry } from "./models";

const COMMON_PROVIDERS = [
  "slashCommandProvider",
  "tableEditorProvider",
  "diagnosticsProvider"
];

const AIMD_FEATURES = [
  "aimdExplorerProvider",
  "tocSyncService",
  "metadataGuardService",
  "aiHarnessService",
  "scmIntegrationService",
  "conversionWizardService"
];

export function activate(workspaceFolders: WorkspaceFolderEntry[] = []): ActivationResult {
  const modeManager = new ModeManager();
  const scanner = new WorkspaceScanner(modeManager);
  const workspaces = scanner.scan(workspaceFolders);

  const aimdWorkspaceFeatures = workspaces
    .filter((workspace) => workspace.mode === "aimd")
    .reduce<Record<string, string[]>>((accumulator, workspace) => {
      accumulator[workspace.rootPath] = [...AIMD_FEATURES];
      return accumulator;
    }, {});

  return {
    workspaces,
    commonProviders: [...COMMON_PROVIDERS],
    aimdWorkspaceFeatures
  };
}

export const deactivate = (): void => {};
