import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    log: "Log",
    total: "Total",
    subtotal: "Subtotal",
    start: "Start Time",
    nothing: "No times added to your log yet!",
    clear: "Clear Log"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    log: "ログ",
    total: "合計",
    subtotal: "小計",
    start: "開始",
    nothing: "時間はまだログに追加されていません。",
    clear: "クリア"
  }
});

export default strings;
