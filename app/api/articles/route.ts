/* Core */
import { NextResponse } from "next/server";
import path from "path";
import { readFromFile, writeToFile } from "../utils/utils";

let initialState = [
  {
    id: "1",
    title: "forward of skill",
    content: "health word involve town you",
    authorId: "1"
  },
  {
    id: "2",
    title: "second media meeting",
    content: "us individual interview number only",
    authorId: "2"
  },
  {
    id: "3",
    title: "after ago sit",
    content: "vote ability need power sing",
    authorId: "1"
  },
  {
    id: "4",
    title: "cell section coach",
    content: "task instead he north skin",
    authorId: "2"
  },
  {
    id: "5",
    title: "clear everybody take",
    content: "into subject himself PM hotel",
    authorId: "1"
  },
  {
    id: "5",
    title: "some thing else",
    content: "the quick red fox jumped",
    authorId: "3"
  }
]

export async function GET(req:Request) {
  const filename = path.basename(__dirname) + ".json";
  let data = readFromFile(filename);
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
    writeToFile(filename, data);
    initialState = data;
    return NextResponse.json({ message: 'Users updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating users' });
  }
}
