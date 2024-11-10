import puppeteer, { Browser } from "puppeteer"

// Function to scrape the HTML of a webpage
export async function scrapeHtml(
	url: string,
	args: { debug?: boolean; timeout?: number } = {}
) {
	let browser: Browser | undefined
	try {
		browser = await puppeteer.launch({ headless: !args.debug })
		const page = await browser.newPage()

		// Wait until the network is idle
		await page.goto(url, { waitUntil: "networkidle0" })

		// Wait for timeout (default 10ms)
		await sleep(args.timeout ?? 10)

		// Wait again for network to be idle after timeout
		await page.waitForNetworkIdle()

		// Get the HTML content of the page
		const html = await page.content()
		return html
	} finally {
		if (browser && !args.debug) await browser.close()
	}
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
