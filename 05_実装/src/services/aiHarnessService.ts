import { AiChangeSet, AiContextBundle, AiPanelState, ContextFile } from "../models";

export class AiHarnessService {
  collectContext(files: ContextFile[]): AiContextBundle {
    return {
      rules: files.find((file) => file.path.endsWith("AI_RULES.md")),
      context: files.find((file) => file.path.endsWith("AI_CONTEXT.md")),
      manifest: files.find((file) => file.path.endsWith("manifest.yaml"))
    };
  }

  buildChangeSet(targetFiles: string[], diff: string, requiresMetadataUpdate: boolean): AiChangeSet {
    return {
      targetFiles,
      diff,
      requiresMetadataUpdate,
      summary: `${targetFiles.length} ファイルに対する変更提案`
    };
  }

  evaluatePanelState(enabledSetting: boolean, aiAvailable: boolean, online: boolean): AiPanelState {
    if (!enabledSetting) {
      return { visible: false, reason: "ユーザー設定で AI パネルが無効化されています。" };
    }

    if (!online) {
      return { visible: false, reason: "オフラインのため AI パネルを非表示にします。" };
    }

    if (!aiAvailable) {
      return { visible: false, reason: "AI プロバイダが利用できません。" };
    }

    return { visible: true, reason: "AI パネルを表示できます。" };
  }
}
