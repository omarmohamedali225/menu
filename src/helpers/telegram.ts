// test An experience with no protection

export async function sendTelegram(text: string) {
  const res = await fetch(
    `https://api.telegram.org/bot8856319022:AAEhy3OKM_PkRqg2PFWy_OrFJNoqRgMw0nM/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 1851491678,
        text,
        parse_mode: "HTML",
      }),
    },
  );
  const data = await res.json();
  if (!data.ok) throw new Error(data.description);
  return data;
}
