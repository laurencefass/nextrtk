/* Core */
import { NextResponse } from "next/server";
import path from "path";
import { readFromFile, writeToFile } from "../utils/utils";

let initialState = [
  {
    id: "1",
    name: "Wiliam Shakespeare"
  },
  {
    id: "2",
    name: "Jane Austen"
  },
  {
    id: "3",
    name: "Leo Tolstoy"
  },
]

export async function GET(req:Request) {
  const filename = path.basename(__dirname) + ".json";
  let data = readFromFile(filename);
  console.log('authors.GET', FormData);
  if (!data)
    writeToFile(filename, initialState);
  return NextResponse.json({ 
    data: data
   });
}

export async function POST(req: Request) {
  try {
    const filename = path.basename(__dirname) + ".json";
    const { data } = await req.json();
    if (data.length > 10) {
      return NextResponse.json({ error: 'Test only. Maximum 10 items.' });
    }
    writeToFile(filename, data);
    initialState = data;
    return NextResponse.json({ message: 'Authors updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating authors' });
  }
}
