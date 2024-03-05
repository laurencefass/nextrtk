"use server";
import { cookies } from "next/headers";
import { httpRequest } from "./utils";

type FormResponse = {
  message: string;
};

export async function randomServerAction() {
  const response = await fetch("https://picsum.photos/v2/list?limit=6");
  const data = await response.json();
  console.log(data);
  return data;
}

export async function getCmsUrl(): Promise<string> {
  console.log("getCmsUrl", process.env.CMS_URL);
  return process.env.CMS_URL || "";
}

export async function getSessionToken() {
  let url = (await getCmsUrl()) + "/session/token";
  let error;
  try {
    console.log("getSessionToken", url);
    const requestHeaders = new Headers({
      Accept: "text/html",
    });
    let token = await httpRequest(url, requestHeaders, "GET");
    return token;
  } catch (error: any) {
    return JSON.stringify(`${url}: ${JSON.stringify(error)}`);
  }
}

export async function sendFormData(data: any): Promise<FormResponse | any> {
  let csrfToken = await getSessionToken();
  const requestHeaders = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  });

  if (data) {
    let url = (await getCmsUrl()) + "/webform_rest/submit";
    console.log("sendFormData", url);
    let body = {
      webform_id: "contact",
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    let reply = await httpRequest(
      url,
      requestHeaders,
      "POST",
      JSON.stringify(body)
    );
    console.log("http reply", reply);
    return reply;
  }
}
