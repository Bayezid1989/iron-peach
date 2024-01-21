export const getStThNd = (number: number, onlySuffix?: boolean): string => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return onlySuffix ? "st" : `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return onlySuffix ? "nd" : `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return onlySuffix ? "rd" : `${number}rd`;
  }
  return onlySuffix ? "th" : `${number}th`;
};

export const convertMonth = (month: number | undefined): string => {
  switch (month) {
    case 1:
      return "Janurary";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
    default:
      return "January";
  }
};

export const generateUsername = (email: string): string => {
  const [username] = email.split("@");
  return username;
};

export const getGameTimeText = (
  year: number,
  round: number,
  totalYears: number,
) => {
  return `${convertMonth(round)}, Year ${year} of ${totalYears}`;
};

export const convertPrice = (kPrice: number) => {
  if (kPrice < 1000) {
    return `${kPrice}K$`;
  } else if (kPrice < 1000000) {
    return `${kPrice / 1000}M$`;
  } else if (kPrice < 1000000000) {
    return `${kPrice / 1000000}B$`;
  } else {
    return `${kPrice / 1000000000}T$`;
  }
};
