export type RiskLevel = "clean" | "suspicious" | "detected" | "hostile";

export interface DetectionState {
  score: number;
  level: RiskLevel;
}

class AutomationDetector {
  private baseScore = 0;
  private decay = 0;
  private flagged = new Set<string>();
  private mouseTrail: Array<{ x: number; y: number; t: number }> = [];
  private clickTimestamps: number[] = [];
  private humanInteractions = 0;
  private cleanupFns: Array<() => void> = [];
  private active = false;
  private startTime = 0;

  start() {
    if (this.active || typeof window === "undefined") return;
    this.active = true;
    this.startTime = Date.now();
    this.probeEnvironment();
    this.trackBehavior();
  }

  private flag(reason: string, pts: number) {
    if (this.flagged.has(reason)) return;
    this.flagged.add(reason);
    this.baseScore = Math.min(100, this.baseScore + pts);
  }

  private probeEnvironment() {
    const w = window as any;

    if (navigator.webdriver === true) this.flag("webdriver", 35);

    if (
      w.__selenium_unwrapped || w.__webdriver_evaluate ||
      w.__driver_evaluate || w.__webdriver_unwrapped ||
      w.__driver_unwrapped || w.__fxdriver_evaluate ||
      w.__fxdriver_unwrapped || w._selenium || w.__nightmare
    ) this.flag("selenium", 45);

    if (w._phantom || w.__phantomas || w.callPhantom) this.flag("phantom", 45);

    if (w.__puppeteer_evaluation_script__ || w.__playwright) this.flag("puppeteer", 45);

    if (window.top !== window.self) this.flag("iframed", 25);

    try {
      const c = document.createElement("canvas");
      c.width = 200; c.height = 50;
      const ctx = c.getContext("2d");
      if (!ctx) { this.flag("no_canvas", 25); return; }
      ctx.textBaseline = "top"; ctx.font = "16px Arial";
      ctx.fillStyle = "#e87d22"; ctx.fillRect(80, 2, 80, 20);
      ctx.fillStyle = "#1a73e8"; ctx.fillText("ArcadiaProbe", 2, 15);
      ctx.fillStyle = "rgba(102,204,0,0.7)"; ctx.fillText("ArcadiaProbe", 4, 17);
      const len = c.toDataURL().length;
      if (len < 200) this.flag("canvas_anomaly", 30);
    } catch { this.flag("canvas_error", 25); }

    try {
      const gl = document.createElement("canvas").getContext("webgl2") ||
        document.createElement("canvas").getContext("webgl");
      if (!gl) { this.flag("no_webgl", 25); }
      else {
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        if (ext) {
          const r = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
          if (/SwiftShader|llvmpipe/i.test(r)) this.flag("soft_renderer", 35);
        }
      }
    } catch { this.flag("webgl_error", 15); }
  }

  private trackBehavior() {
    const onMove = (e: MouseEvent) => {
      this.mouseTrail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
      if (this.mouseTrail.length > 80) this.mouseTrail.shift();
      this.humanInteractions++;
      if (this.humanInteractions > 30) this.decay = Math.min(this.baseScore, this.decay + 2);
      if (this.mouseTrail.length >= 12) this.analyzeMouse();
    };
    const onClick = () => {
      this.clickTimestamps.push(Date.now());
      if (this.clickTimestamps.length > 15) this.clickTimestamps.shift();
      this.humanInteractions++;
      if (this.humanInteractions > 30) this.decay = Math.min(this.baseScore, this.decay + 3);
      if (this.clickTimestamps.length >= 6) this.analyzeClicks();
    };
    const onScroll = () => {
      this.humanInteractions++;
      if (this.humanInteractions > 30) this.decay = Math.min(this.baseScore, this.decay + 1);
    };
    const onTouch = () => {
      this.humanInteractions += 5;
      if (this.humanInteractions > 30) this.decay = Math.min(this.baseScore, this.decay + 3);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    this.cleanupFns.push(() => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouch);
    });

    setTimeout(() => {
      if (this.mouseTrail.length < 3 && this.humanInteractions < 5) {
        this.flag("no_interaction", 15);
      }
    }, 15000);
  }

  private analyzeMouse() {
    const pts = this.mouseTrail.slice(-12);
    let totalAngleDelta = 0;
    for (let i = 2; i < pts.length; i++) {
      const a1 = Math.atan2(pts[i - 1].y - pts[i - 2].y, pts[i - 1].x - pts[i - 2].x);
      const a2 = Math.atan2(pts[i].y - pts[i - 1].y, pts[i].x - pts[i - 1].x);
      totalAngleDelta += Math.abs(a2 - a1);
    }
    if (totalAngleDelta / (pts.length - 2) < 0.008) this.flag("linear_mouse", 25);

    const speeds: number[] = [];
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      const dt = pts[i].t - pts[i - 1].t;
      if (dt > 0) speeds.push(Math.sqrt(dx * dx + dy * dy) / dt);
    }
    if (speeds.length >= 6) {
      const mean = speeds.reduce((a, b) => a + b, 0) / speeds.length;
      const variance = speeds.reduce((a, b) => a + (b - mean) ** 2, 0) / speeds.length;
      if (mean > 0 && Math.sqrt(variance) / mean < 0.04) this.flag("constant_speed", 20);
    }
  }

  private analyzeClicks() {
    const ts = this.clickTimestamps;
    if (ts.length < 6) return;
    const gaps: number[] = [];
    for (let i = 1; i < ts.length; i++) gaps.push(ts[i] - ts[i - 1]);
    const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    if (mean === 0) return;
    const variance = gaps.reduce((a, b) => a + (b - mean) ** 2, 0) / gaps.length;
    if (Math.sqrt(variance) / mean < 0.06) this.flag("mechanical_clicks", 20);
  }

  getState(): DetectionState {
    const effective = Math.max(0, this.baseScore - this.decay);
    if (Date.now() - this.startTime < 10000) {
      return { score: 0, level: "clean" };
    }
    const level: RiskLevel =
      effective >= 70 ? "hostile" :
      effective >= 50 ? "detected" :
      effective >= 40 ? "suspicious" : "clean";
    return { score: effective, level };
  }

  stop() {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
    this.active = false;
  }
}

export const automationDetector = new AutomationDetector();
