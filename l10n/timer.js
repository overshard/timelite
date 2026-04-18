import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    note: "Add a note with a #tag",
    reset: "Reset",
    add: "Add",
    pause: "Pause",
    resume: "Resume",
    paused: "Paused",
  },
  jp: {
    note: "#tagでメモを追加",
    reset: "リセット",
    add: "追加する",
    pause: "一時停止",
    resume: "再開",
    paused: "一時停止中",
  },
  pl: {
    note: "Dodaj wpis z #tagiem",
    reset: "Zeruj",
    add: "Dodaj",
    pause: "Pauza",
    resume: "Wznów",
    paused: "Zatrzymany",
  },
});

export default strings;
