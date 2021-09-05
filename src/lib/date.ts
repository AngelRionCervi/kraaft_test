export const formatDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
};
