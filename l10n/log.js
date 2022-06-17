import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    total: "Total",
    subtotal: "Subtotal",
    start: "Start Time",
    nothing: "Your log is empty.",
    tags: "Tags",
    show: "Show All",
    clear: "Clear",
    export: "Export",
  },
  // TODO: None of this is accurate past this line, someone please help me translate...
  jp: {
    total: "合計",
    subtotal: "小計",
    start: "開始",
    nothing: "ログは空です。",
    tags: "タグ",
    show: "すべて",
    clear: "すべてクリア",
    export: "書き出す",
  },
  pl: {
    total: "Razem",
    subtotal: "Podsuma",
    start: "Czas początkowy",
    nothing: "Twój dziennik nie ma wpisów.",
    tags: "Tagi",
    show: "Pokaż wszystko",
    clear: "Wyczyść",
    export: "Wyeksportuj",
  },
});

export default strings;
