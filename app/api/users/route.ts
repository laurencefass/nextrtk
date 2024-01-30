/* Core */
import { NextResponse } from "next/server";
const fs = require('fs');

let userState = [
  { id: '1', firstName: 'John', lastName: 'Doe' },
  { id: '2', firstName: 'Jane', lastName: 'Doe' },
  { id: '3', firstName: 'Freddy', lastName: 'Kay' },
  { id: '4', firstName: 'Mark', lastName: 'Emm' },
]

const readFromFile = (filename: string) => {
  try {
    const jsonData = fs.readFileSync(filename, 'utf8');
    return JSON.parse(jsonData);
  } catch (err) {
    console.error('Error reading from file:', err);
    return null;
  }
};

const writeToFile = (filename: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData, 'utf8');
    console.log('Data written to file');
  } catch (err) {
    console.error('Error writing to file:', err);
  }
};


export async function GET(req:Request) {
  let users = readFromFile("users.json");
  console.log("GET users", users);
  if (!users)
    writeToFile("users.json", userState);
  return NextResponse.json({ 
    users: users
   });
}

export async function POST(req: Request) {
  try {
    const { users } = await req.json();
    console.log("POST users", users);
    writeToFile("users.json", users);
    userState = users;
    return NextResponse.json({ message: 'Users updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating users' });
  }
}
