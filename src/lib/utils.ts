export function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function truncateText(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export function encodePayload(data: any): string {
  const json = JSON.stringify(data);
  const encoded = new TextEncoder().encode(json);
  const deflated = new Uint8Array(encoded.length);
  deflated.set(encoded);
  let binary = "";
  for (let i = 0; i < deflated.length; i++) binary += String.fromCharCode(deflated[i]);
  return btoa(binary);
}

export function decodePayload(d: string): any | null {
  try {
    const binary = Uint8Array.from(atob(d), (c) => c.charCodeAt(0));
    const json = new TextDecoder().decode(binary);
    return JSON.parse(json);
  } catch {
    return null;
  }
}