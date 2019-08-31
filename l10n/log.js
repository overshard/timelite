import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    total: "Total",
    subtotal: "Subtotal",
    start: "Start Time",
    nothing: "No times added to your log yet!",
    clear: "Clear"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    total: "合計",
    subtotal: "小計",
    start: "開始",
    nothing: "時間はまだログに追加されていません。",
    clear: "クリア"
  }
});

export default strings;
