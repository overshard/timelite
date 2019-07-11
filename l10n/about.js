import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    title: "Timelite?",
    quote:
      "Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all this time?",
    name: "— Isaac Bythewood"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    title: "タイムライト？",
    quote:
      "なぜ午前5時ですか。常に行っていることを追跡するために使用できる簡単なものはありますか？",
    name: "— アイザックバイザウッド"
  }
});

export default strings;
