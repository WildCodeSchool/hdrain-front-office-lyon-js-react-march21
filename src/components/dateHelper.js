const displayRelativeTime = (
  interval,
  unit = 'day',
  locale = 'en',
  style = 'long'
) =>
  new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
    style,
  }).format(interval, unit);

const displayRelativeTimeFromNow = (date1, date2 = new Date()) => {
  // Date difference converted to seconds
  let timeInterval = (date1.getTime() - date2.getTime()) / 1000;
  let unit = 'second';
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInWeek = 7 * secondsInDay;
  const secondsInMonth = 30 * secondsInDay;
  const secondsInYear = 365 * secondsInDay;
  if (Math.abs(timeInterval) >= secondsInYear) {
    unit = 'year';
    timeInterval /= secondsInYear;
  } else if (Math.abs(timeInterval) >= secondsInMonth) {
    unit = 'month';
    timeInterval /= secondsInMonth;
  } else if (Math.abs(timeInterval) >= secondsInWeek) {
    unit = 'week';
    timeInterval /= secondsInWeek;
  } else if (Math.abs(timeInterval) >= secondsInDay) {
    unit = 'day';
    timeInterval /= secondsInDay;
  } else if (Math.abs(timeInterval) >= secondsInHour) {
    unit = 'hour';
    timeInterval /= secondsInHour;
  } else if (Math.abs(timeInterval) >= secondsInMinute) {
    unit = 'minute';
    timeInterval /= secondsInMinute;
  }
  return displayRelativeTime(parseInt(timeInterval, 10), unit);
};

export default displayRelativeTimeFromNow;
