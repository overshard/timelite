import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    note: "Note",
    reset: "Reset",
    add: "Add"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    note: "注意",
    reset: "リセット",
    add: "追加する"
  }
});

export default strings;
