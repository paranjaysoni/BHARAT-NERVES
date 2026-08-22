const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto("http://localhost:3000/ai-parliament", { waitUntil: 'networkidle0' });
  const html1 = await page.content();
  console.log("HTML length:", html1.length);
  console.log(html1.substring(0, 1000));
  
  await browser.close();
})();
