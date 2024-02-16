export const getPaths = (url: string): string[] => {
  if (typeof url !== "string" || !url) {
    console.error("Invalid path:", url);
    return [];
  }
  const segments = url.replace(/^\/|\/$/g, "").split("/");
  console.log(segments);
  return segments;
};
