// export const getFormattedDate = (date) => {
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   return date;
// };

// export const getFormattedDate = (date) => {
//   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };
export const getFormattedDate = (date) => {
  return date.substring(0, 10);
};

export const getDateMinusDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
  // return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
