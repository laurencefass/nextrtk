const host = 'https://nextrtk.syntapse.co.uk'
// const host = 'http://localhost:3000'
// const host = 'http://127.0.0.1:3000'
const url = `${host}/api/identity-count`

export const fetchIdentityCount = async (
  amount = 1,
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
