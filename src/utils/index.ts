import { ERRORS } from "@/constants/dictionary/errors";

export class HandledError extends Error {
  name = "HandledError";
  constructor(public message: keyof typeof ERRORS) {
    super(message);
  }
}

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
  return `${kPrice.toLocaleString()}K$`;
};

export const convetToPercent = (number: number) =>
  `${Math.round(number * 100)}%`;

export const pickRandom = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const rollRandomDice = () => Math.floor(Math.random() * 6 + 1);
