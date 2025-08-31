//https://ghibliapi.vercel.app

import type { ApiData } from "./types";

async function fetchData(): Promise<ApiData[]> {
  const response: Response = await fetch('https://ghibliapi.vercel.app/films');
  const data: any = await response.json();
  console.log(data);
  return data as ApiData[];
  
}

export { fetchData };
