import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    loaded: "Loaded state from local storage.",
    addedEntry: "You've added an entry.",
    editedEntry: "You've edited an entry.",
    deletedEntry: "You've deleted an entry.",
    resetLog: "You've reset your log.",
    confirmClearLog: "Clear all log entries? This cannot be undone.",
    confirmClearTag: "Delete all entries with this tag? This cannot be undone.",
    confirmDeleteEntry: "Delete this entry?",
  },
  jp: {
    loaded: "ローカルストレージから状態をロードしました。",
    addedEntry: "エントリを追加しました。",
    editedEntry: "エントリを編集しました。",
    deletedEntry: "エントリを削除しました。",
    resetLog: "ログをリセットしました。",
    confirmClearLog: "すべてのログエントリを削除しますか？元に戻せません。",
    confirmClearTag: "このタグのすべてのエントリを削除しますか？元に戻せません。",
    confirmDeleteEntry: "このエントリを削除しますか？",
  },
  pl: {
    loaded: "Wczytano stan z lokalnego zapisu.",
    addedEntry: "Dodałeś wpis.",
    editedEntry: "Zmieniłeś wpis.",
    deletedEntry: "Skasowałeś wpis.",
    resetLog: "Wyczyściłeś dziennik.",
    confirmClearLog: "Usunąć wszystkie wpisy dziennika? Tej operacji nie można cofnąć.",
    confirmClearTag: "Usunąć wszystkie wpisy z tym tagiem? Tej operacji nie można cofnąć.",
    confirmDeleteEntry: "Usunąć ten wpis?",
  },
});

export default strings;
