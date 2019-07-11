import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    loadedEntries: "Loaded entries from local storage.",
    loadedTime: "Loaded time from local storage.",
    loadedLanguage: "Loaded language from local storage.",
    addedEntry: "You've added an entry.",
    deletedEntry: "You've deleted an entry.",
    resetLog: "You've reset your log."
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    loadedEntries: "ローカルストレージからエントリをロードしました。",
    loadedTime: "ローカルストレージから時間をロードしました。",
    loadedLanguage: "ローカルストレージから言語をロードしました。",
    addedEntry: "エントリを追加しました。",
    deletedEntry: "エントリを削除しました。",
    resetLog: "ログをリセットしました。"
  }
});

export default strings;
