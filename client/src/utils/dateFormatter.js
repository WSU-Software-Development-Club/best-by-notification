export const formatDate = (dateString) => {
  if (!dateString) {
    return "No date provided";
  }

  // Create a Date object from the provided dateString
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Format the date to include the day of the week, day, month, and year
  const options = {
    weekday: "short", // "Fri"
    day: "2-digit", // "31"
    month: "short", // "Jan"
    year: "numeric", // "2025"
  };

  // Use toLocaleDateString to format the date
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
