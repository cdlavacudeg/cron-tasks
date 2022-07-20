const ping = require('ping')
const puppeteer = require('puppeteer')
const nodeCron = require('node-cron')
const { models } = require('../libs/sequelize')

async function scrapeUrl(url) {
  try {
    // --- Scrap the header or 1000 words of the body ----- //
    // Launch puppeteeer
    const browser = await puppeteer.launch({
      args: ['--window-size=1920,1080'],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    })
    // Launch a new headless browser page
    const newPage = await browser.newPage()
    // Navigate to the url
    await newPage.goto(url, { waitUntil: 'load', timeout: 0 })
    console.log('Scraping page')
    // Select header or body
    try {
      var element = await newPage.waitForSelector('header', { timeout: 100 })
    } catch (error) {
      element = await newPage.waitForSelector('body')
    }
    // Extract the text of the selector
    var text = await newPage.evaluate((element) => element.innerText, element)
    text = text.slice(0, 1000) // Only the first 1000 characters
    await browser.close()
    const scrapedDate = new Date().toISOString()
    console.log(`Web scraped on ${scrapedDate}`)
    await models.Task.create({
      url,
      scrapedDate,
    })
    return text
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

function domain_from_url(url) {
  // Function to extract the domain of an url using regular expresions
  // Extracted from stackoverflow
  var result
  var match
  if (
    (match = url.match(
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im
    ))
  ) {
    result = match[1]
    if ((match = result.match(/^[^.]+\.(.+\..+)$/))) {
      result = match[1]
    }
  }
  return result
}

// Ping config
const config = {
  timeout: 3, // Time out in seconds for each ping request.
  extra: ['-i', '2'], // Interval of 2 seconds (ping -i 2 host)
}

async function pingUrl(url) {
  // Ping the url, to verify if it is alive
  const host = domain_from_url(url)
  const response = await ping.promise.probe(host, config)
  const msg = response.alive
    ? `host ${host} is alive, time: ${response.time} ms`
    : `host ${host} is dead`
  console.log(msg)
  return response.alive
}

async function scheduleTask(cron, url) {
  //We schedule the task only if the host is alive
  if (await pingUrl(url)) {
    nodeCron.schedule(cron, () => {
      scrapeUrl(url)
    })
  } else {
    throw new Error('The host is dead')
  }
}

module.exports = { scheduleTask }
