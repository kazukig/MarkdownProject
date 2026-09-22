export class ScmIntegrationService {
  createBranchName(timestamp: Date, targetSlugSource: string, intentSlugSource: string): string {
    const stamp = formatTimestamp(timestamp);
    const targetSlug = slugify(targetSlugSource) || "target";
    const intentSlug = slugify(intentSlugSource) || "intent";
    return `ai/${stamp}-${targetSlug}-${intentSlug}`;
  }

  buildCommitMessage(summary: string, reason: string, impact: string): string {
    return `${summary}\n\n理由: ${reason}\n影響範囲: ${impact}`;
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatTimestamp(value: Date): string {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");
  const seconds = String(value.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
