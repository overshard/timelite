import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    pageTitle: "Summary",
    empty: "Your log is empty.",
    emptyHint:
      "Start the timer and add a tagged note to see your stats aggregate here.",
    // Metric tile labels
    statTotal: "Total Hours",
    statEntries: "Entries",
    statToday: "Today",
    statWeek: "This Week",
    statLongest: "Longest Session",
    statTags: "Unique Tags",
    // Section labels
    sectionPerTag: "Hours per tag",
    sectionPerDay: "Hours per day · last 14 days",
    // Chart legend
    numHours: "hours",
    // Unit suffixes / fallback
    hoursSuffix: "h",
    minsSuffix: "m",
    none: "—",
  },
  jp: {
    pageTitle: "概要",
    empty: "ログは空です。",
    emptyHint: "タイマーを開始してタグ付きメモを追加すると、統計がここに表示されます。",
    statTotal: "合計時間",
    statEntries: "エントリ数",
    statToday: "今日",
    statWeek: "今週",
    statLongest: "最長セッション",
    statTags: "タグ数",
    sectionPerTag: "タグごとの時間",
    sectionPerDay: "日ごとの時間 · 過去14日間",
    numHours: "時間",
    hoursSuffix: "時",
    minsSuffix: "分",
    none: "—",
  },
  pl: {
    pageTitle: "Streszczenie",
    empty: "Twój dziennik nie ma wpisów.",
    emptyHint:
      "Uruchom zegar i dodaj notatkę z tagiem, aby zobaczyć tutaj statystyki.",
    statTotal: "Razem godzin",
    statEntries: "Wpisy",
    statToday: "Dzisiaj",
    statWeek: "Ten tydzień",
    statLongest: "Najdłuższa sesja",
    statTags: "Unikalne tagi",
    sectionPerTag: "Godziny na tag",
    sectionPerDay: "Godziny na dzień · ostatnie 14 dni",
    numHours: "godzin",
    hoursSuffix: "g",
    minsSuffix: "m",
    none: "—",
  },
});

export default strings;
