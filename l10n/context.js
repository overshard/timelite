import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    loaded: "Loaded state from local storage.",
    addedEntry: "You've added an entry.",
    editedEntry: "You've edited an entry.",
    deletedEntry: "You've deleted an entry.",
    resetLog: "You've reset your log."
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    loaded: "ローカルストレージから状態をロードしました。",
    addedEntry: "エントリを追加しました。",
    editedEntry: "エントリを編集しました。",
    deletedEntry: "エントリを削除しました。",
    resetLog: "ログをリセットしました。"
  }
});

export default strings;
