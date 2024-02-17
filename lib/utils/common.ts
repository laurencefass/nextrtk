export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

type ImageData = {
  download_url: string;
};

export async function getImageUrls(length: number): Promise<Array<string>> {
  let urls: Array<string> = [];  
  for (let i=0; i < length; i++) {
    urls.push(`https://picsum.photos/seed/random=${Math.floor(Math.random() * 100).toFixed(2)}/500/400`);
  }
  // console.log("urls", urls);
  return urls;
  // const response = await fetch(`https://picsum.photos/v2/list?page=4&limit=${length}`);
  // const data = await response.json();
  // return data.map((item: ImageData) => item.download_url);
}
