const fs = require('fs');
const file = 'frontend/src/components/agents/ParliamentPageClient.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `<h3 className="text-sm font-bold text-foreground">{session.recommendation.title}</h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{session.recommendation.summary}</p>
            <div className="mt-3 space-y-2">
              {Array.isArray(session.recommendation.priorityActions) && session.recommendation.priorityActions.map((action) => (`;
const replacement = `{typeof session.recommendation === "string" ? (
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{session.recommendation}</p>
            ) : (
              <>
                <h3 className="text-sm font-bold text-foreground">{session.recommendation.title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{session.recommendation.summary}</p>
                <div className="mt-3 space-y-2">
                  {Array.isArray(session.recommendation.priorityActions) && session.recommendation.priorityActions.map((action) => (`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  // close the fragment
  const targetClose = `)}
            </div>`;
  const replacementClose = `)}
                </div>
              </>
            )}`;
  content = content.replace(targetClose, replacementClose);
  fs.writeFileSync(file, content);
  console.log("Fixed ParliamentPageClient.tsx string render");
} else {
  console.log("Target not found!");
}
