import dayjs from "dayjs";

export const convertMilisecondsToMinutes = time => {
  const minutesMath = Math.floor(time / 60);

  if (minutesMath > 9) return minutesMath;

  return `0${minutesMath}`;
};

export const convertMilisecondsToSeconds = time => {
  const secondsMath = time % 60;

  if (secondsMath > 9) return secondsMath;

  return `0${secondsMath}`;
};

export const TreatDate = date => {
  let treatDate = null;
  if (date) {
    treatDate = dayjs(date).isValid() ? dayjs(date) : null;
  }
  return treatDate;
};
