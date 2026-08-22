const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  try {
    await page.goto("http://localhost:3000/scenario-simulator", { waitUntil: 'networkidle0' });
    
    await page.evaluate(() => {
      window.localStorage.setItem("project-aegis-simulation-state", JSON.stringify({
        phase: "done",
        result: {
            scenario: { scenarioName: "Test", affectedNodeIds: [], blockedRouteIds: [] },
            dashboard: { riskLevel: "HIGH", resilienceScore: 80 }
        },
        playbackState: "completed",
        playbackProgress: 100
      }));
    });
    
    await page.goto("http://localhost:3000/ai-parliament", { waitUntil: 'networkidle0' });
    console.log("AI Parliament loaded with state!");
    
    await page.goto("http://localhost:3000/reports", { waitUntil: 'networkidle0' });
    console.log("Reports loaded with state!");
    
  } catch(e) {
    console.log("Navigation error:", e);
  }
  
  await browser.close();
})();
