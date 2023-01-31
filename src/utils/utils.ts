export const countMonths = (year: number) => {
  if (year) {
    return year * 12;
  }
  return 0;
};

export const monthsPayment = (sum: string, months: number) => {
  if (sum && months) {
    return Math.round(removeDigits(sum) / months);
  }
  return 0;
};

export const getSchedule = (range: number) => {
  const arrayMonths = new Array(range).fill(0).map((_, i) => i);
  return arrayMonths.map(el => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    return new Date(year, month + el, day).toDateString().slice(4);
  });
};

export const addDigits = (sum: number) => {
  if (sum) {
    return sum.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
  }
};

export const removeDigits = (sum: string) => {
  return +sum.replace(/[^\-0-9]/g, '');
};
