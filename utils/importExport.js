const stripSanitizePrefix = (s) =>
  typeof s === "string" && s.startsWith("'") ? s.slice(1) : s;

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch === "\r") {
        // skip
      } else {
        cell += ch;
      }
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0] !== ""));
};

const extractTagsFromNote = (note) =>
  (note || "")
    .split(/\s+/)
    .filter((w) => w.startsWith("#") && w.length > 1)
    .map((w) => w.toLowerCase());

const normalizeEntry = (raw) => {
  const start = raw.start instanceof Date ? raw.start : new Date(raw.start);
  const end = raw.end instanceof Date ? raw.end : new Date(raw.end);
  if (isNaN(+start) || isNaN(+end)) return null;
  const note = stripSanitizePrefix(raw.note || "");
  let tags = raw.tags;
  if (typeof tags === "string") {
    tags = stripSanitizePrefix(tags)
      .split(/\s+/)
      .filter((t) => t.startsWith("#") && t.length > 1)
      .map((t) => t.toLowerCase());
  } else if (Array.isArray(tags)) {
    tags = tags
      .filter((t) => typeof t === "string" && t.startsWith("#") && t.length > 1)
      .map((t) => t.toLowerCase());
  } else {
    tags = extractTagsFromNote(note);
  }
  return {
    id: raw.id || null,
    start,
    end,
    note,
    tags,
  };
};

export const parseImport = (text, filename) => {
  const lower = (filename || "").toLowerCase();
  const looksLikeJson = lower.endsWith(".json") || text.trim().startsWith("[") || text.trim().startsWith("{");

  if (looksLikeJson) {
    const data = JSON.parse(text);
    const list = Array.isArray(data) ? data : data.log;
    if (!Array.isArray(list)) throw new Error("JSON must be an array of entries");
    return list.map(normalizeEntry).filter(Boolean);
  }

  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const [header, ...body] = rows;
  const idx = {};
  header.forEach((h, i) => {
    idx[h.trim().toLowerCase()] = i;
  });
  if (idx.start === undefined || idx.end === undefined) {
    throw new Error("CSV must include start and end columns");
  }
  return body
    .map((r) =>
      normalizeEntry({
        id: idx.id !== undefined ? r[idx.id] : null,
        start: r[idx.start],
        end: r[idx.end],
        note: idx.note !== undefined ? r[idx.note] : "",
        tags: idx.tags !== undefined ? r[idx.tags] : undefined,
      })
    )
    .filter(Boolean);
};

export const mergeEntries = (existing, incoming, makeId) => {
  const existingIds = new Set(existing.map((e) => e.id));
  const prepared = incoming.map((e) => ({
    ...e,
    id: !e.id || existingIds.has(e.id) ? makeId() : e.id,
  }));
  return [...existing, ...prepared].sort(
    (a, b) => +new Date(b.start) - +new Date(a.start)
  );
};

export const buildJsonExport = (log) =>
  JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      log: log.map((e) => ({
        id: e.id,
        start: (e.start instanceof Date ? e.start : new Date(e.start)).toISOString(),
        end: (e.end instanceof Date ? e.end : new Date(e.end)).toISOString(),
        note: e.note || "",
        tags: e.tags || [],
      })),
    },
    null,
    2
  );

export const buildMarkdownExport = (log) => {
  if (log.length === 0) return "# Timelite Log\n\n*(empty)*\n";
  const groups = new Map();
  for (const e of log) {
    const d = e.start instanceof Date ? e.start : new Date(e.start);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!groups.has(key)) groups.set(key, { date: d, entries: [] });
    groups.get(key).entries.push(e);
  }
  const sortedKeys = [...groups.keys()].sort().reverse();

  const pad = (n) => String(n).padStart(2, "0");
  const hms = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };
  const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

  const lines = ["# Timelite Log", ""];
  for (const key of sortedKeys) {
    const group = groups.get(key);
    const dayLabel = group.date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const total = group.entries.reduce(
      (sum, e) => sum + (+new Date(e.end) - +new Date(e.start)),
      0
    );
    lines.push(`## ${dayLabel} — ${hms(total)}`);
    lines.push("");
    for (const e of group.entries) {
      const s = e.start instanceof Date ? e.start : new Date(e.start);
      const en = e.end instanceof Date ? e.end : new Date(e.end);
      const dur = hms(+en - +s);
      const note = (e.note || "").trim();
      const tags = (e.tags || []).length ? ` *${e.tags.join(", ")}*` : "";
      lines.push(`- \`${dur}\` ${hm(s)} → ${hm(en)}${note ? ` — ${note}` : ""}${tags}`);
    }
    lines.push("");
  }
  return lines.join("\n");
};

export const downloadTextFile = (text, filename, mime) => {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
