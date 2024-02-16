/* Core */
import { NextResponse } from "next/server";
import path from "path";
import { readFromFile, writeToFile } from "@utils/server";

let initialState = [
  { id: "1", firstName: "John", lastName: "Doe" },
  { id: "2", firstName: "Norman", lastName: "Bates" },
  { id: "3", firstName: "Freddy", lastName: "Kreuger" },
  { id: "4", firstName: "Michael", lastName: "Myers" },
  { id: "5", firstName: "Jason", lastName: "Vorhees" },
];

export async function GET(req: Request) {
  const filename = path.basename(__dirname) + ".json";
  let data = readFromFile(filename);
  if (!data) writeToFile(filename, initialState);
  return NextResponse.json({
    data: data,
  });
}

export async function POST(req: Request) {
  try {
    const filename = path.basename(__dirname) + ".json";
    const { data } = await req.json();
    if (data.length > 10) {
      return NextResponse.json({ error: "Test only. Maximum 10 items." });
    }
    writeToFile(filename, data);
    initialState = data;
    return NextResponse.json({ message: "Users updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error updating users" });
  }
}
