import { serverHost } from "../common/config"

const getPostOptions = (body: Record<string, string>) => ({
    headers: {
    "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body)
});

export async function translate(texts: string, fromLanguage: string, toLanguage: string, doTranslateAll: boolean = false) {
    const url = `${serverHost}/translate${doTranslateAll ? "/all" : ""}`;
    const res = await fetch(url, getPostOptions({
        "texts": texts,
        "from_la": fromLanguage,
        "to_la": toLanguage
    }));

    const data = await res.json();
    return data;
}