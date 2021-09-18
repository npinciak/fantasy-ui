/**
 *
 * @returns Date in format yyyymmdd
 */
const currentDate = (delim?: string) => {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}${delim ? delim : ''}${month <= 9 ? '0' + month : month}${delim ? delim : ''}${day <= 9 ? '0' + day : day}`;
};

const addHoursToDate = (date: Date, hours: number): Date => new Date(new Date(date).setHours(date.getHours() + hours));

export { addHoursToDate, currentDate };
