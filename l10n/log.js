import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    total: "Total",
    subtotal: "Subtotal",
    start: "Start Time",
    nothing: "No times added to your log yet!",
    tags: "Tags",
    show: "Show All",
    clear: "Clear"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    total: "合計",
    subtotal: "小計",
    start: "開始",
    nothing: "時間はまだログに追加されていません。",
    tags: "タグ",
    show: "すべて",
    clear: "クリア"
  }
});

export default strings;
