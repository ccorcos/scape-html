#!/usr/bin/env node

import { scrapeHtml } from "./scrapeHtml"

// Parse the command-line arguments
const args = process.argv.slice(2)

if (args.length === 0 || args.includes("help") || args.includes("--help")) {
	console.log("scrape-html <url> [--debug]")
	console.log(" --debug will show the browser and leave it open.")
	process.exit(0)
}

const url = args[0]
const debug = args[1] === "--debug"

// Run the scraper
scrapeHtml(url, { debug })
	.then((html) => {
		console.log(html)
		process.exit(0)
	})
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
