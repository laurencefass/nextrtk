const env = process.env.NODE_ENV === "development" ? "dev" : "prod";
const BASE_SERVER_URL = `https://next${env}.syntapse.co.uk`;
const url = `${BASE_SERVER_URL}/api/identity-count`;

export const fetchIdentityCount = async (
  amount = 1
): Promise<{ data: number }> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const result = await response.json();
  console.log("TRACE: fetchIdentityCount", result);
  return result;
};
