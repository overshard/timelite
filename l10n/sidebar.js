import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    name: "Timelite",
    timer: "Timer",
    log: "Log",
    about: "About",
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    name: "タイムライト",
    timer: "タイマー",
    log: "ログ",
    about: "約",
  },
  pl: {
    name: "Timelite",
    timer: "Zegar",
    log: "Dziennik",
    about: "O Timelite",
  },
});

export default strings;
