const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:3000/", { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.localStorage.clear());

  await page.goto("http://localhost:3000/ai-parliament", { waitUntil: 'networkidle0' });
  const html1 = await page.content();
  if (html1.includes("This page couldn")) {
    console.log("AI Parliament crashed!");
  } else {
    console.log("AI Parliament OK.");
  }

  await page.goto("http://localhost:3000/reports", { waitUntil: 'networkidle0' });
  const html2 = await page.content();
  if (html2.includes("This page couldn")) {
    console.log("Reports crashed!");
  } else {
    console.log("Reports OK.");
  }
  
  await browser.close();
})();
