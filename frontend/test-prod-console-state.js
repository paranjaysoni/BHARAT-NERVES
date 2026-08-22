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

  console.log("Navigating to root to set localStorage...");
  await page.goto("http://localhost:3000", { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    const state = {
      state: {
        phase: "done",
        result: {
            scenario: { scenarioName: "Test", affectedNodeIds: [], blockedRouteIds: [] },
            dashboard: { riskLevel: "HIGH", resilienceScore: 80 }
        },
        parliament: {
          sessionId: "123",
          scenarioName: "Test Scenario",
          participants: 8,
          currentQuestion: "Test Question",
          severity: "HIGH",
          agents: [
            { agentId: "agent-infrastructure-guardian", name: "Infra Guardian", role: "Guardian", domain: "agent-infrastructure-guardian", position: "Ready", confidence: 90, conflictLevel: "low" }
          ],
          recommendation: {
            title: "Test Recommendation",
            summary: "This is a test recommendation",
            sendToCrisisCommander: false,
            priorityActions: [
              { rank: 1, label: "Test Action 1", priority: "HIGH", score: 95 }
            ]
          },
          insights: [
            { id: "1", type: "RISK", title: "Test Insight", detail: "Test Detail" }
          ],
          consensus: {
            score: 85,
            level: "HIGH",
            conflictLevel: "low",
            humanReviewRequired: false
          },
          timeline: [
            { id: "1", status: "success", label: "Test Timeline Item", timestamp: new Date().toISOString() }
          ]
        },
        playbackState: "completed",
        playbackProgress: 100
      },
      version: 0
    };
    localStorage.setItem("project-aegis-simulation-state", JSON.stringify(state));
  });

  console.log("Navigating to AI Parliament...");
  await page.goto("http://localhost:3000/ai-parliament", { waitUntil: 'networkidle0' });
  const text = await page.evaluate(() => document.body.innerText);
  console.log("TEXT length:", text.length);
  console.log(text.substring(0, 500));
  
  await browser.close();
})();
