import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    title: "Summary",
    totalHours: "Total number of hours spent across all tags.",
    varHours: (n) => `${n} hours`,
    tagHours: "The number of hours you've spent per-tag.",
    numHours: "# of hours",
    logEmpty: "Your log is empty.",
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    title: "概要",
    totalHours: "すべてのタグで費やされた合計時間数。",
    varHours: (n) => `${n}時間`,
    tagHours: "タグごとに費やした時間数。",
    numHours: "時間数",
    logEmpty: "ログは空です。",
  },
  pl: {
    title: "Streszczenie",
    totalHours: "Całkowita liczba godzin spędzonych na wszystkich tagach.",
    varHours: (n) => `${n} godzin`,
    tagHours: "Liczba godzin spędzonych na tagu.",
    numHours: "liczba godzin",
    logEmpty: "Twój dziennik nie ma wpisów.",
  },
});

export default strings;
