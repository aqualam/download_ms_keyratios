const puppeteer = require("puppeteer");
const today = new Date().toISOString();

async function DownloadFile(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: `./csv/${today}`,
    });
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();
    await page.click("#financials .large_button");
    await browser.close();
}

async function run() {
    const links = [
        "https://financials.morningstar.com/ratios/r.html?t=LOW&culture=en&platform=sal#tab-growth",
	];
    for (let i = 0; i < links.length; i++) {
        const url = links[i];
        console.log(`Starting ${url}...`);
        await DownloadFile(url);
        console.log(`Done! ${url}...`);
    }
}

run();
