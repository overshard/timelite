import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    name: "Timelite",
    timer: "Timer",
    log: "Log",
    about: "About",
    summary: "Summary",
  },
  // TODO: None of this is accurate past this line, someone please help me translate...
  jp: {
    name: "タイムライト",
    timer: "タイマー",
    log: "ログ",
    about: "約",
    summary: "概要",
  },
  pl: {
    name: "Timelite",
    timer: "Zegar",
    log: "Dziennik",
    about: "O Timelite",
    summary: "Streszczenie",
  },
});

export default strings;
