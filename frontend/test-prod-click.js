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

  console.log("Navigating to root...");
  await page.goto("http://localhost:3000", { waitUntil: 'networkidle0' });
  
  console.log("Clicking AI Parliament...");
  await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const link = links.find(a => a.href.includes('/ai-parliament'));
    if (link) link.click();
  });
  
  await new Promise(r => setTimeout(r, 3000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log("TEXT length:", text.length);
  if (text.includes("This page couldn")) {
    console.log("FOUND ERROR!");
  }
  
  await browser.close();
})();
