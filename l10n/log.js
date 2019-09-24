import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    total: "Total",
    subtotal: "Subtotal",
    start: "Start Time",
    nothing: "Your log is empty.",
    tags: "Tags",
    show: "Show All",
    clear: "Clear"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    total: "合計",
    subtotal: "小計",
    start: "開始",
    nothing: "ログは空です。",
    tags: "タグ",
    show: "すべて",
    clear: "クリア"
  }
});

export default strings;
