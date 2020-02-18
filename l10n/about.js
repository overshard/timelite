import LocalizedStrings from "react-localization";

const strings = new LocalizedStrings({
  en: {
    title: "Timelite?",
    quote:
      "Why is it 5 AM? Isn't there something simple I can use to track what I'm doing with all this time?",
    name: "Isaac Bythewood",
    keyReset: "alt+r - reset timer",
    keyAddLog: "alt+a - add log entry",
    keyTimerPage: "alt+t - move to timer page",
    keyLogPage: "alt+l - move to log page",
    keyAboutPage: "alt+o - move to about page",
    keyClearLog: "alt+c - clear log entries",
    keyNextLogEntry: "ArrowDown - move to next log entry",
    keyPreviousLogEntry: "ArrowUp - move to previous log entry",
    keyEditEntry: "alt+e - edit log enrty"
  },
  // None of this is accurate past this line, someone please help me translate...
  jp: {
    title: "タイムライト？",
    quote:
      "なぜ午前5時ですか。常に行っていることを追跡するために使用できる簡単なものはありますか？",
    name: "アイザックバイザウッド"
  },
  pl: {
    title: "Timelite?",
    quote:
      "Czemu jest piąta rano? Nie ma czegoś prostego co mógłbym użyć do śledzenia, czemu mi czas ucieka?",
    name: "Isaac Bythewood",
    keyReset: "alt+r - zerowanie zagara",
    keyAddLog: "alt+a - dodaj wpis do dziennika",
    keyTimerPage: "alt+t - przejdź na stronę zegara",
    keyLogPage: "alt+l - przejdź na stronę dziennika",
    keyAboutPage: "alt+o - przejdź na stronę o timelite",
    keyClearLog: "alt+c - wyczyść wpisy dziennika",
    keyNextLogEntry: "ArrowDown - przejdź do następnego wpisu",
    keyPreviousLogEntry: "ArrowUp - przejdź do poprzedniego wpisu",
    keyEditEntry: "alt+e - edytuj wpis dziennika"
  }
});

export default strings;
