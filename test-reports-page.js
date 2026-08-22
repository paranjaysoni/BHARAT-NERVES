const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if(msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.toString());
  });

  console.log("Navigating to /reports...");
  await page.goto("http://localhost:3000/reports", { waitUntil: 'networkidle0' });
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log("TEXT length:", text.length);
  if (text.includes("This page couldn") || text.includes("Unhandled Runtime Error")) {
    console.log("FOUND ERROR ON PAGE!");
  } else {
    console.log("PAGE LOADED OK.");
  }
  
  await browser.close();
})();
