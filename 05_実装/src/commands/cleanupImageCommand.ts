import { CleanupImageResult } from "../models";

export function cleanupImageCommand(registeredAssets: string[], referencedAssets: string[]): CleanupImageResult {
  const referenced = new Set(referencedAssets);
  const keptPaths = registeredAssets.filter((asset) => referenced.has(asset));
  const removedPaths = registeredAssets.filter((asset) => !referenced.has(asset));
  return { keptPaths, removedPaths };
}
