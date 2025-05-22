export const datetimeFormat = (dateTimeString: string) => {
  const date = new Date(dateTimeString);

  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {formattedDate, formattedTime};
};
