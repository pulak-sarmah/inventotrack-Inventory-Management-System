export const shortenText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    const shortenedText = text.substring(0, maxLength).concat("...");

    return shortenedText;
  }
  return text;
};
