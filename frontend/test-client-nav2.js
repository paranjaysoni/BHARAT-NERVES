const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if(msg.type() === 'error') {
      console.log('PAGE CONSOLE ERROR:', msg.text());
    }
  });

  await page.goto("http://localhost:3000/control-room", { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('AI Parliament'));
    if(link) link.click();
  });
  
  await new Promise(r => setTimeout(r, 2000));
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log("TEXT START===\n" + text.substring(0, 500) + "\n===TEXT END");
  
  await browser.close();
})();
