#!/usr/bin/env node

import { scrapeHtml } from "./scrapeHtml"

// Parse the command-line arguments
const args = process.argv.slice(2)

if (args.length === 0 || args.includes("help") || args.includes("--help")) {
	console.log("scrape-html <url> [--debug] [--timeout <ms>]")
	console.log(" --debug will show the browser and leave it open.")
	console.log(" --timeout sets the wait time in milliseconds (default: 10)")
	process.exit(0)
}

const url = args[0]
const debug = args.includes("--debug")
const timeoutIndex = args.indexOf("--timeout")
const timeout =
	timeoutIndex !== -1 ? parseInt(args[timeoutIndex + 1]) : undefined

// Run the scraper
scrapeHtml(url, { debug, timeout })
	.then((html) => {
		console.log(html)
		process.exit(0)
	})
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
