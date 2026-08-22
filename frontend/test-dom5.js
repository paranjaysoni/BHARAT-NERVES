const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  
  const page1 = await browser.newPage();
  page1.on('console', msg => { if(msg.type() === 'error') console.log('REPORTS ERROR:', msg.text()); });
  await page1.goto("http://localhost:3000/reports", { waitUntil: 'networkidle0' });
  const text1 = await page1.evaluate(() => document.body.innerText);
  console.log("REPORTS LOADED, length:", text1.length);
  
  const page2 = await browser.newPage();
  page2.on('console', msg => { if(msg.type() === 'error') console.log('PARLIAMENT ERROR:', msg.text()); });
  await page2.goto("http://localhost:3000/ai-parliament", { waitUntil: 'networkidle0' });
  const text2 = await page2.evaluate(() => document.body.innerText);
  console.log("PARLIAMENT LOADED, length:", text2.length);
  
  await browser.close();
})();
