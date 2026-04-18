import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    pageTitle: "Log",
    total: "Total",
    subtotal: "Subtotal",
    start: "Start Time",
    entries: "Entries",
    nothing: "Your log is empty.",
    emptyHint: "Add a tagged note from the timer page to see entries here.",
    nothingFiltered: "No entries match this tag.",
    tags: "Tags",
    show: "Show All",
    clear: "Clear",
    export: "Export CSV",
  },
  jp: {
    pageTitle: "ログ",
    total: "合計",
    subtotal: "小計",
    start: "開始",
    entries: "エントリ数",
    nothing: "ログは空です。",
    emptyHint: "タイマーページからタグ付きメモを追加するとここに表示されます。",
    nothingFiltered: "このタグに一致するエントリはありません。",
    tags: "タグ",
    show: "すべて",
    clear: "すべてクリア",
    export: "CSVに書き出す",
  },
  pl: {
    pageTitle: "Dziennik",
    total: "Razem",
    subtotal: "Podsuma",
    start: "Czas początkowy",
    entries: "Wpisy",
    nothing: "Twój dziennik nie ma wpisów.",
    emptyHint: "Dodaj notatkę z tagiem ze strony zegara, aby zobaczyć wpisy.",
    nothingFiltered: "Brak wpisów z tym tagiem.",
    tags: "Tagi",
    show: "Pokaż wszystko",
    clear: "Wyczyść",
    export: "Eksportuj CSV",
  },
});

export default strings;
