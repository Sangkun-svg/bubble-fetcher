const convertToURLFormat = (text: string): string => {
  return text.replace(/ /g, "%20").replace(/"/g, "%22");
};

export default convertToURLFormat;
