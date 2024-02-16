export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

type ImageData = {
  download_url: string;
};

export async function getImageUrls(length: number): Promise<Array<string>> {
  const random = Math.floor(Math.random() * 1000);
  const response = await fetch(`https://picsum.photos/v2/list?limit=${length}`);
  const data = await response.json();
  return data.map((item: ImageData) => item.download_url);
}
