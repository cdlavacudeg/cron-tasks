const ping = require('ping')
const puppeteer = require('puppeteer')
const nodeCron = require('node-cron')

var hosts = [
  // 'https://stackoverflow.com/questions/18123211/checking-host-availability-by-using-ping-in-bash-scripts',
  // 'https://www.w3schools.com/js/js_errors.asp',
  'https://docs.docker.com/engine/reference/commandline/compose_convert/',
  //   'https://www.freecodecamp.org/news/schedule-a-job-in-node-with-nodecron/',
  //   'https://www.postgresqltutorial.com/postgresql-cheat-sheet/',
  //   'https://dev.to/code_jedi/web-scraping-in-nodejs-2lkf',
  //   'https://www.npmjs.com/package/ping',
  //
]

const config = {
  timeout: 10, // Time out in seconds for each ping request.
  extra: ['-i', '2'], // Interval of 2 seconds (ping -i 2 host)
}

async function scheduleTask(url) {
  try {
    // Ping the Url
    const host = domain_from_url(url)
    const response = await ping.promise.probe(host, config)
    const msg = response.alive
      ? `host ${host} is alive, time: ${response.time} ms`
      : `host ${host} is dead`
    console.log(msg)
    // Scrap the headers
    // This will help us compute the duration of the job later
    // Launch puppeteeer
    const browser = await puppeteer.launch({
      args: ['--window-size=1920,1080'],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    })
    // Change the message on the terminal as we launch
    // a new headless browser page
    // console.log('Launching headless browser page')
    // Launch a new headless browser page
    const newPage = await browser.newPage()
    // Change the message on the terminal as we navigate
    // to the URL of the page we are scraping
    // console.log('Navigating to URL')

    await newPage.goto(url, { waitUntil: 'load', timeout: 0 })
    // console.log('Scraping page')

    // var header = await newPage.waitForSelector('header')
    try {
      var element = await newPage.waitForSelector('header', { timeout: 100 })
    } catch (error) {
      element = await newPage.waitForSelector('body')
    }

    var text = await newPage.evaluate((element) => element.innerText, element)
    console.log(text.slice(0, 1000))
    await browser.close()
    console.log(`Web scraped on ${new Date().toISOString()}`)
  } catch (error) {
    console.log(error)
  }
}

function domain_from_url(url) {
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
let contador = 15
hosts.map((url) => {
  nodeCron.schedule(`*/${contador} * * * * *`, () => {
    scheduleTask(url)
  })
  // contador+=1;
})
