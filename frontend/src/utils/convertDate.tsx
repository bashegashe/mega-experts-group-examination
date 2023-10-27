export const convertDate = async (date: string) => {
  const dateStamp = new Date(date);
  const year = dateStamp.getFullYear();
  const month = String(dateStamp.getMonth() + 1).padStart(2, '0');
  const day = String(dateStamp.getDate()).padStart(2, '0');
  const hours = String(dateStamp.getHours()).padStart(2, '0');
  const minutes = String(dateStamp.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
};
