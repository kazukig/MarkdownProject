import { AiChangeSet } from "../models";

export function applyAiDiffCommand(changeSet: AiChangeSet, approved: boolean): string {
  if (!approved) {
    return "discard";
  }

  return changeSet.requiresMetadataUpdate ? "apply-with-metadata-update" : "apply";
}
