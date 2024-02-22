"use server";

import { sleep } from "@/lib/utils/common";

export async function action() {
  return process.env.NODE_ENV;
}

export async function mockFetchData() {
  console.log("executing a button click on the server");
  await sleep(2000);
  return {
    key: "some value",
  };
}
