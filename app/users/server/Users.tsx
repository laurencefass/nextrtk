import { readFromFile, writeToFile } from "@utils/server";

export const Users = async () => {
    let users = await readFromFile("users.json");
    return <>
        <pre>
            {JSON.stringify(users, null, 2)}
        </pre>
    </>
}