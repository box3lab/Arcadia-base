"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { decodePayload } from "../../lib/utils";
import PageLayout from "../../components/PageLayout";
import Dao3DetailPanel from "../../components/Dao3DetailPanel";
import Box3SearchDetailPanel from "../../components/Box3SearchDetailPanel";
import { type Dao3MapEntry, type Box3SearchEntry } from "../../lib/db";
import { blockImageUrl, loadImageMap, type Box3RecommendItem, type MapEntry } from "../../lib/api";
import AudioPlayer from "../../components/AudioPlayer";
import LoadingCube from "../../components/LoadingCube";

const TYPE_LABELS: Record<number, string> = { 1: "地图", 2: "模型", 3: "音乐" };

function formatCount(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "万";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function formatDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function MapDetailInner() {
  const searchParams = useSearchParams();
  const d = searchParams.get("d");

  const [payload, setPayload] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadImageMap().catch(() => {});
  }, []);

  useEffect(() => {
    if (!d) { setNotFound(true); return; }
    const decoded = decodePayload(d);
    if (decoded) {
      setPayload(decoded);
    } else {
      setNotFound(true);
    }
  }, [d]);

  if (notFound) {
    return (
      <PageLayout>
        <main style={{ flex: "1 1 0%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 8 }}>未找到内容</div>
            <a href="/search" style={{ fontSize: 13, color: "var(--color-accent)" }}>返回搜索</a>
          </div>
        </main>
      </PageLayout>
    );
  }

  if (!payload) {
    return (
      <PageLayout>
        <main style={{ flex: "1 1 0%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <LoadingCube size={24} />
        </main>
      </PageLayout>
    );
  }

  const breadcrumbName = payload.source === "dao3" ? payload.data?.name
    : payload.source === "box3-search" ? payload.data?.name
    : payload.source === "bs-recommend" ? payload.data?.name
    : payload.data?.n || "";

  return (
    <PageLayout breadcrumb={breadcrumbName}>
      <main style={{ flex: "1 1 0%", paddingTop: 0 }}>
        {payload.source === "dao3" && payload.data && (
          <Dao3DetailPanel entry={payload.data as Dao3MapEntry} onBack={() => { window.history.back(); }} />
        )}
        {payload.source === "box3-search" && payload.data && (
          <Box3SearchDetailPanel entry={payload.data as Box3SearchEntry} onBack={() => { window.history.back(); }} />
        )}
        {payload.source === "box3" && payload.data && (
          <Box3MapDetail entry={payload.data as MapEntry} />
        )}
        {payload.source === "bs-recommend" && payload.data && (
          <Box3RecommendDetail item={payload.data as Box3RecommendItem} />
        )}
      </main>
    </PageLayout>
  );
}

function Box3MapDetail({ entry }: { entry: any }) {
  return (
    <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }}>
      <div className="panel-card animate-slide-up">
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", lineHeight: 1.3, marginBottom: 8 }}>{entry.n}</h2>
        <div style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 8 }}>作者: {entry.a}</div>
        {entry.d && (
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{entry.d}</p>
        )}
        <div style={{ marginTop: 12, fontSize: 11, color: "var(--color-text-tertiary)" }}>
          Hash: {entry.h}
        </div>
      </div>
    </div>
  );
}

function Box3RecommendDetail({ item }: { item: Box3RecommendItem }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = item.image ? blockImageUrl(item.image) : "";

  return (
    <div style={{ width: "100%", maxWidth: 672, marginLeft: "auto", marginRight: "auto", paddingLeft: 24, paddingRight: 24, paddingTop: 24, paddingBottom: 24 }}>
      {imgSrc && !imgError && (
        <div style={{ width: "100%", height: 240, borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--color-base)", marginBottom: 16, position: "relative" }}>
          <img src={imgSrc} alt="" className="img-sharpen" style={{ width: "100%", height: "auto", position: "absolute", top: "50%", transform: "translateY(-50%)", display: "block" }} onError={() => setImgError(true)} />
        </div>
      )}

      <div className="panel-card animate-slide-up">
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "1px 5px", fontSize: 9, fontWeight: 600, borderRadius: "var(--radius-sm)", background: "var(--color-info-bg)", color: "var(--color-info)" }}>{TYPE_LABELS[item.type]}</span>
          {item.createdAt && (
            <span style={{ fontSize: 10, color: "var(--color-text-tertiary)" }}>{item.createdAt.slice(0, 10)}</span>
          )}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--color-text)", lineHeight: 1.3, marginBottom: 8 }}>{item.name}</h2>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          {item.authorAvatar && (
            <img src={blockImageUrl(item.authorAvatar)} alt="" loading="lazy" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
          )}
          <span style={{ fontSize: 14, color: "var(--color-accent)", fontWeight: 500 }}>{item.authorName}</span>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
          {item.type === 1 && item.playCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {formatCount(item.playCount)} 游玩
            </div>
          )}
          {item.viewCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {formatCount(item.viewCount)} 浏览
            </div>
          )}
          {item.type === 3 && item.duration > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-text-secondary)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {formatDuration(item.duration)}
            </div>
          )}
        </div>

        {item.describe && (
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: 16 }}>{item.describe}</p>
        )}

        {item.type === 3 && item.audioHash && (
          <div style={{ marginTop: 16 }}>
            <AudioPlayer audioHash={item.audioHash} duration={item.duration} name={item.name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MapDetailPage() {
  return (
    <Suspense fallback={<PageLayout><main style={{ flex: "1 1 0%", display: "flex", justifyContent: "center", alignItems: "center" }}><LoadingCube size={24} /></main></PageLayout>}>
      <MapDetailInner />
    </Suspense>
  );
}