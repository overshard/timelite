import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    loaded: "Loaded state from local storage.",
    addedEntry: "You've added an entry.",
    editedEntry: "You've edited an entry.",
    deletedEntry: "You've deleted an entry.",
    resetLog: "You've reset your log.",
  },
  // TODO: None of this is accurate past this line, someone please help me translate...
  jp: {
    loaded: "ローカルストレージから状態をロードしました。",
    addedEntry: "エントリを追加しました。",
    editedEntry: "エントリを編集しました。",
    deletedEntry: "エントリを削除しました。",
    resetLog: "ログをリセットしました。",
  },
  pl: {
    loaded: "Wczytano stan z lokalnego zapisu.",
    addedEntry: "Dodałeś wpis.",
    editedEntry: "Zmieniłeś wpis.",
    deletedEntry: "Skasowałeś wpis.",
    resetLog: "Wyczyściłeś dziennik.",
  },
});

export default strings;
