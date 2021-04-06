const timeDiff = (time) => {
  const timeNow = new Date();
  return timeNow - time;
};

const timeString = (timeDiff) => {
  // timeDiff should be milliseconds
  const timerTotal = [
    (timeDiff / 1000 / 60 / 60) % 60, // Hours
    (timeDiff / 1000 / 60) % 60, // Minutes
    (timeDiff / 1000) % 60, // Seconds
  ];
  return timerTotal
    .map((timer) => {
      let stringTime = Math.floor(timer).toString();
      if (stringTime.length < 2) stringTime = `0${stringTime}`;
      return stringTime;
    })
    .join(":");
};

export { timeDiff, timeString };
