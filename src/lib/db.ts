

import type { MapEntry } from "./api";

export interface Dao3CoAuthor {
  userId: number;
  nickname: string;
  avatar: string;
  avatarFrame: string;
  previewUrl: string | null;
}

export interface Dao3Label {
  labelId: number;
  labelName: string;
  labelKey: string;
}

export interface Dao3Tab {
  tabName: string;
  tabKey: string;
}

export interface Dao3MapEntry {
  contentId: number;
  name: string;
  description: string;
  playHash: string;
  preview: string;
  playCount: number;
  onlineCount: number;
  likeCount: number;
  viewCount: number;
  favoritesCount: number;
  commentCount: number;
  author: {
    authorId: number;
    userId: number;
    nickname: string;
    avatar: string;
    avatarFrame: string | null;
    previewUrl: string | null;
    followerNum: number;
  };
  coAuthors: Dao3CoAuthor[];
  labels: Dao3Label[];
  tab: Dao3Tab;
  banner: string[];
  publishedAt: string;
  notice: string;
  publishedVersion: number;
  teamable: boolean;
  updateAt: string;
}

export interface Box3SearchAuthor {
  userId: number;
  avatar: string;
  displayname: string;
  tag: number;
}

export interface Box3SearchPublicInfo {
  playContainerName: string;
  editContainerName: string;
  commentStatus: number;
  commentCount: number;
}

export interface Box3SearchEntry {
  contentId: number;
  name: string;
  describe: string;
  image: string;
  hash: string;
  audioHash: string;
  duration: number;
  contentType: 1 | 2 | 3;
  createdAt: string;
  version: number;
  versionId: number;
  playCount: number;
  viewCount: number;
  url: string;
  author: Box3SearchAuthor;
  publicInfo: Box3SearchPublicInfo;
}

export type DataSource = "box3" | "dao3" | "box3-search";

export type SearchFilter =
  | { key: "tab"; value: string }
  | { key: "contentType"; value: 1 | 2 | 3 };

export const DAO3_TABS = [
  { tabKey: "mapRolePlaying", tabName: "RPG" },
  { tabKey: "mapSports", tabName: "竞技" },
  { tabKey: "mapCasual", tabName: "休闲" },
  { tabKey: "mapSimulator", tabName: "创造" },
  { tabKey: "mapParkour", tabName: "跑酷" },
  { tabKey: "mapSurvival", tabName: "生存" },
  { tabKey: "mapRacing", tabName: "竞速" },
  { tabKey: "mapPuzzle", tabName: "解密" },
  { tabKey: "mapTycoon", tabName: "模拟" },
  { tabKey: "mapOther", tabName: "其他" },
] as const;

export const BOX3_CONTENT_TYPES = [
  { value: 1 as const, label: "地图" },
  { value: 2 as const, label: "模型" },
  { value: 3 as const, label: "音乐" },
] as const;

export interface SearchConfig {
  sources: DataSource[];
  fields: SearchField[];
  filters: SearchFilter[];
  sortBy: "relevance" | "name" | "playCount" | "likeCount" | "viewCount";
  sortOrder: "asc" | "desc";
}

export type SearchField =
  | "name"
  | "author"
  | "authorId"
  | "coAuthor"
  | "hash"
  | "description"
  | "contentId";

export const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  sources: ["box3", "dao3", "box3-search"],
  fields: ["name", "author", "authorId", "coAuthor", "hash", "contentId"],
  filters: [],
  sortBy: "relevance",
  sortOrder: "desc",
};

export const SEARCH_FIELD_LABELS: Record<SearchField, string> = {
  name: "名称",
  author: "作者",
  authorId: "作者ID",
  coAuthor: "合作者",
  hash: "Hash",
  description: "描述",
  contentId: "内容ID",
};

export const SEARCH_FIELD_SOURCE: Record<SearchField, DataSource[]> = {
  name: ["box3", "dao3", "box3-search"],
  author: ["box3", "dao3", "box3-search"],
  authorId: ["box3", "dao3", "box3-search"],
  coAuthor: ["dao3"],
  hash: ["box3", "box3-search"],
  description: ["box3", "dao3", "box3-search"],
  contentId: ["dao3", "box3-search"],
};

const FIELD_PRIORITY: SearchField[] = [
  "name",
  "author",
  "coAuthor",
  "hash",
  "contentId",
  "authorId",
  "description",

];

export function getVisibleFieldsForSources(sources: DataSource[]): SearchField[] {
  return FIELD_PRIORITY.filter((field) =>
    SEARCH_FIELD_SOURCE[field].some((source) => sources.includes(source))
  );
}

export function normalizeSearchConfig(config: SearchConfig): SearchConfig {
  const sources = config.sources.length > 0 ? config.sources : [...DEFAULT_SEARCH_CONFIG.sources];
  const visibleFields = getVisibleFieldsForSources(sources);
  const fields = config.fields.filter((field) => visibleFields.includes(field));
  const filters = config.filters.filter((f) => {
    if (f.key === "tab") return sources.includes("dao3");
    if (f.key === "contentType") return sources.includes("box3-search");
    return true;
  });

  return {
    ...config,
    sources,
    fields: fields.length > 0 ? fields : visibleFields.slice(0, Math.min(4, visibleFields.length)),
    filters,
  };
}

export interface UnifiedSearchResult {
  source: DataSource;
  box3Entry?: MapEntry;
  dao3Entry?: Dao3MapEntry;
  box3SearchEntry?: Box3SearchEntry;
  relevance: number;
}

export async function clientSearch(params: { q: string; sources: string[]; contentType?: number; tab?: string }): Promise<UnifiedSearchResult[]> {
  const { signedFetch, API_BASE } = await import("./api");
  try {
    const sp = new URLSearchParams();
    sp.set("q", params.q);
    sp.set("sources", params.sources.join(","));
    if (params.contentType) sp.set("contentType", String(params.contentType));
    if (params.tab) sp.set("tab", params.tab);
    const resp = await signedFetch(API_BASE + "/search?" + sp.toString());
    if (!resp.ok) return [];
    const data = await resp.json();
    if (data.code !== 200 && !data.results) return [];
    return (data.results || []).map((r: any) => {
      if (r.source === "box3") return { source: "box3", box3Entry: r.data, relevance: 0 };
      if (r.source === "dao3") return { source: "dao3", dao3Entry: r.data, relevance: 0 };
      if (r.source === "box3-search") return { source: "box3-search", box3SearchEntry: r.data, relevance: 0 };
      return { source: r.source, relevance: 0 };
    });
  } catch {
    return [];
  }
}


