export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
  const day = String(today.getDate()).padStart(2, "0"); // Ensure the day is always two digits

  return `${year}-${month}-${day}`;
};
