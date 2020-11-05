const puppeteer = require("puppeteer");
const today = new Date().toISOString();

async function DownloadFile(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
//        downloadPath: `../key_ratios_csv/${today}`,
        downloadPath: `../../key_ratios_csv/`,
    });
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();
    await page.click("#financials .large_button");
    await browser.close();
}

async function run() {
    const stocks = [
        "LOW",
        "AAPL",
        "V",
        "CU",
	];
    for (let i = 0; i < stocks.length; i++) {
        const url = "https://financials.morningstar.com/ratios/r.html?t=" + stocks[i] + "&culture=en&platform=sal#tab-growth";
        console.log(`Starting ${url}...`);
        await DownloadFile(url);
        console.log(`Done! ${url}...`);
    }
}

run();
