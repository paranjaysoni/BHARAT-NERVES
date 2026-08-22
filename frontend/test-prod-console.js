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

  console.log("Navigating...");
  await page.goto("http://localhost:3000/ai-parliament", { waitUntil: 'networkidle0' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log("TEXT length:", text.length);
  
  await browser.close();
})();
