import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    note: "Add a note with a #tag",
    reset: "Reset",
    add: "Add"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    note: "#tagでメモを追加",
    reset: "リセット",
    add: "追加する"
  }
});

export default strings;
