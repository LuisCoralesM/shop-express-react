const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthName(date) {
  return monthNames[date.getMonth()];
}

export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
