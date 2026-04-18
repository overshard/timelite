import React, { useEffect, useRef, useContext, useMemo } from "react";
import Chart from "chart.js/auto";

import Page from "../components/page";
import { Context } from "../components/context";
import strings from "../l10n/summary";

import styles from "../styles/pages/summary.module.css";

const PALETTE = [
  "#6B9E78",
  "#C9A84C",
  "#C47055",
  "#7EAAB8",
  "#7DB88C",
  "#DDC06A",
];

const MS = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
};

const formatDuration = (ms, s) => {
  if (!ms) return "0" + s.hoursSuffix;
  const hours = ms / MS.hour;
  if (hours >= 1) return `${hours.toFixed(hours >= 10 ? 0 : 1)}${s.hoursSuffix}`;
  const mins = Math.round(ms / MS.minute);
  return `${mins}${s.minsSuffix}`;
};

const formatHours = (ms) => Math.round((ms / MS.hour) * 100) / 100;

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const Summary = () => {
  const { state } = useContext(Context);
  strings.setLanguage(state.language);

  const tagCanvasRef = useRef(null);
  const dayCanvasRef = useRef(null);

  const log = state.log;
  const hasData = log.length > 0;

  // Derived stats ----------------------------------------------------------
  const stats = useMemo(() => {
    if (!hasData) return null;
    const now = Date.now();
    const today = startOfDay(now).getTime();
    const weekAgo = today - 6 * MS.day;

    let totalMs = 0;
    let todayMs = 0;
    let weekMs = 0;
    let longestMs = 0;
    const tagSet = new Set();

    for (const e of log) {
      const start = +new Date(e.start);
      const end = +new Date(e.end);
      const dur = end - start;
      totalMs += dur;
      if (dur > longestMs) longestMs = dur;
      if (start >= today) todayMs += dur;
      if (start >= weekAgo) weekMs += dur;
      for (const t of e.tags || []) tagSet.add(t);
    }

    return {
      totalMs,
      entryCount: log.length,
      todayMs,
      weekMs,
      longestMs,
      tagCount: tagSet.size,
    };
  }, [log, hasData]);

  // Hours per tag
  const perTag = useMemo(() => {
    if (!hasData) return { labels: [], data: [] };
    const map = new Map();
    for (const e of log) {
      const dur = +new Date(e.end) - +new Date(e.start);
      for (const t of e.tags || []) {
        map.set(t, (map.get(t) || 0) + dur);
      }
    }
    const entries = [...map.entries()].sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map(([t]) => t),
      data: entries.map(([, ms]) => formatHours(ms)),
    };
  }, [log, hasData]);

  // Hours per day over last 14 days
  const perDay = useMemo(() => {
    if (!hasData) return { labels: [], data: [] };
    const days = 14;
    const todayStart = startOfDay(Date.now()).getTime();
    const buckets = new Array(days).fill(0);
    const labels = new Array(days).fill(0).map((_, i) => {
      const d = new Date(todayStart - (days - 1 - i) * MS.day);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    for (const e of log) {
      const start = +new Date(e.start);
      const daysAgo = Math.floor((todayStart - startOfDay(start).getTime()) / MS.day);
      if (daysAgo < 0 || daysAgo >= days) continue;
      const dur = +new Date(e.end) - start;
      buckets[days - 1 - daysAgo] += dur;
    }
    return { labels, data: buckets.map((ms) => formatHours(ms)) };
  }, [log, hasData]);

  // Chart: hours per tag ---------------------------------------------------
  useEffect(() => {
    if (!hasData || !tagCanvasRef.current) return;
    const chart = new Chart(tagCanvasRef.current, {
      type: "bar",
      data: {
        labels: perTag.labels,
        datasets: [
          {
            label: strings.numHours,
            data: perTag.data,
            backgroundColor: perTag.labels.map(
              (_, i) => PALETTE[i % PALETTE.length] + "cc"
            ),
            borderColor: perTag.labels.map(
              (_, i) => PALETTE[i % PALETTE.length]
            ),
            borderWidth: 1,
            borderRadius: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#13120e",
            borderColor: "rgba(107,158,120,0.3)",
            borderWidth: 1,
            titleFont: { family: "JetBrains Mono, monospace" },
            bodyFont: { family: "JetBrains Mono, monospace" },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#a09890",
              font: { family: "JetBrains Mono, monospace", size: 11 },
            },
            grid: { color: "rgba(221,215,205,0.04)" },
          },
          y: {
            ticks: {
              color: "#a09890",
              font: { family: "JetBrains Mono, monospace", size: 11 },
            },
            grid: { color: "rgba(221,215,205,0.04)" },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [perTag, hasData, state.language]);

  // Chart: hours per day ---------------------------------------------------
  useEffect(() => {
    if (!hasData || !dayCanvasRef.current) return;
    const chart = new Chart(dayCanvasRef.current, {
      type: "line",
      data: {
        labels: perDay.labels,
        datasets: [
          {
            label: strings.numHours,
            data: perDay.data,
            fill: true,
            tension: 0.35,
            backgroundColor: "rgba(107,158,120,0.14)",
            borderColor: "#6B9E78",
            borderWidth: 1.5,
            pointBackgroundColor: "#7DB88C",
            pointBorderColor: "#0e0d0a",
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#13120e",
            borderColor: "rgba(107,158,120,0.3)",
            borderWidth: 1,
            titleFont: { family: "JetBrains Mono, monospace" },
            bodyFont: { family: "JetBrains Mono, monospace" },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#a09890",
              font: { family: "JetBrains Mono, monospace", size: 10 },
            },
            grid: { color: "rgba(221,215,205,0.04)" },
          },
          y: {
            ticks: {
              color: "#a09890",
              font: { family: "JetBrains Mono, monospace", size: 10 },
            },
            grid: { color: "rgba(221,215,205,0.04)" },
            beginAtZero: true,
          },
        },
      },
    });
    return () => chart.destroy();
  }, [perDay, hasData, state.language]);

  if (!hasData) {
    return (
      <Page title="Summary">
        <div className="page-grid">
          <main className="page-main">
            <h1 className="page-title">{strings.pageTitle}</h1>
          </main>
        </div>
        <div className="empty-state">
          <p className="empty-state-title">{strings.empty}</p>
          <p className="empty-state-hint">{strings.emptyHint}</p>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Summary">
      <div className="page-grid">
        <main className="page-main">
          <h1 className="page-title">{strings.pageTitle}</h1>

          <div className={styles.tiles}>
            <Tile label={strings.statTotal}>
              {formatDuration(stats.totalMs, strings)}
            </Tile>
            <Tile label={strings.statToday}>
              {formatDuration(stats.todayMs, strings)}
            </Tile>
            <Tile label={strings.statWeek}>
              {formatDuration(stats.weekMs, strings)}
            </Tile>
            <Tile label={strings.statLongest}>
              {formatDuration(stats.longestMs, strings)}
            </Tile>
            <Tile label={strings.statEntries}>{stats.entryCount}</Tile>
            <Tile label={strings.statTags}>{stats.tagCount}</Tile>
          </div>

          <h2 className="section-label">{strings.sectionPerTag}</h2>
          <div className={styles.chartCard}>
            <canvas ref={tagCanvasRef} />
          </div>

          <h2 className="section-label">{strings.sectionPerDay}</h2>
          <div className={styles.chartCard}>
            <canvas ref={dayCanvasRef} />
          </div>
        </main>
      </div>
    </Page>
  );
};

const Tile = ({ label, children }) => (
  <div className={styles.tile}>
    <span className={styles.tileLabel}>{label}</span>
    <span className={styles.tileValue}>{children}</span>
  </div>
);

export default Summary;
