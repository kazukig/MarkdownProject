import { ConversionPlan, FileEntry } from "../models";

export class ConversionWizardService {
  planStandardConversion(rootPath: string, entries: FileEntry[]): ConversionPlan {
    const operations = entries.map((entry, index) => {
      const prefix = String(index + 1).padStart(2, "0");
      const normalizedName = entry.isDirectory
        ? `${prefix}_${stripExtension(entry.name)}.aimd-chapter`
        : `${prefix}_${stripExtension(entry.name)}.md`;
      return `${entry.path} -> ${rootPath}/${normalizedName}`;
    });

    return {
      rootPath,
      snapshotPath: `${rootPath}/.aimd-snapshots/latest`,
      mode: "standard",
      operations
    };
  }

  planAiAssistedConversion(rootPath: string, operations: string[]): ConversionPlan {
    return {
      rootPath,
      snapshotPath: `${rootPath}/.aimd-snapshots/latest`,
      mode: "ai-assisted",
      operations
    };
  }
}

function stripExtension(name: string): string {
  return name.replace(/\.[^.]+$/, "");
}
