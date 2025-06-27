import { GetChromeHeaders } from "@/app/lib/web_api_configs";

export async function GET() {
    const publicUrlGroups =
        [
            [
                'https://gitlab.com/zhifan999/fq/-/wikis/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
                'https://github.com/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
            ],
            [
                'https://dgithub.xyz/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
                'https://fan.722462.xyz/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7/',
                'https://fgithub.xyz/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
            ],
            [
                'https://gitlab.com/zhifan999/fq/-/wikis/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
                'https://github.com/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
            ],
            [
                'https://fgithub.xyz/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
                'https://fan.194529.xyz/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
                'https://dgithub.xyz/Alvin9999/new-pac/wiki/ss%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
            ],
        ];

    const subUrls = [
        "https://raw.githubusercontent.com/aiboboxx/v2rayfree/main/v2"
    ];

    const MAX_TIMEOUT = 3000;

    const allPublicPromises: Promise<Response>[] = [];
    for (const publicUrlGroup of publicUrlGroups) {
        if (publicUrlGroup.length <= 0) {
            continue;
        }
        const randomIndex = Math.floor(Math.random() * publicUrlGroup.length);
        allPublicPromises.push(fetch(publicUrlGroup[randomIndex], { signal: AbortSignal.timeout(MAX_TIMEOUT), headers: { ...GetChromeHeaders() } }));
    }

    const allSubPromises: Promise<Response>[] = [];
    for (const subUrl of subUrls) {
        if (subUrls.length <= 0) {
            continue;
        }
        allSubPromises.push(fetch(subUrl, { signal: AbortSignal.timeout(MAX_TIMEOUT) }));
    }

    const re = /("|n|>)((vmess|vless|ssr|ss):\/\/[^"\\<]+)/g;
    let allGWFEscapeUrls: string[] = [];

    for (const onePromise of allPublicPromises) {
        try {
            const htmlResponse = await onePromise;
            if (!htmlResponse.ok) {
                continue;
            }

            const htmlText = (await htmlResponse.text()).replaceAll('\\u0026', '&').replaceAll('&amp;', '&');
            const htmlMatches = htmlText.matchAll(re);
            for (const htmlMatche of htmlMatches) {
                if (htmlMatche.length <= 2) {
                    continue;
                }
                allGWFEscapeUrls.push(htmlMatche[2]);
            }
        } catch (error) {
            console.error('Error fetching URL:', error);
        }
    }

    for (const onePromise of allSubPromises) {
        try {
            const htmlResponse = await onePromise;
            if (!htmlResponse.ok) {
                continue;
            }

            const htmlText = Buffer.from((await htmlResponse.text()), 'base64').toString('utf-8');
            allGWFEscapeUrls.push(...htmlText.split('\n'));
        } catch (error) {
            console.error('Error fetching URL:', error);
        }
    }

    allGWFEscapeUrls = Array.from(new Set(allGWFEscapeUrls));

    const responseText = Buffer.from(allGWFEscapeUrls.join("\n"), 'utf-8').toString('base64');

    return new Response(
        responseText,
        {
            status: 200,
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            }
        }
    )
}
