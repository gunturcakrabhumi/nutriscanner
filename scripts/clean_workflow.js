const fs = require('fs');
const path = require('path');

const wfPath = path.join(__dirname, '..', 'workflows', 'NutriScanner_Main_Orchestrator.json');
const wf = JSON.parse(fs.readFileSync(wfPath, 'utf8'));

for (const node of wf.nodes) {
  if (node.type === 'n8n-nodes-base.code' && node.parameters?.jsCode) {
    node.parameters.jsCode = node.parameters.jsCode.replace(/\\n/g, '\n');
  }
}

fs.writeFileSync(wfPath, JSON.stringify(wf, null, 2), 'utf8');
console.log('Cleaned and formatted workflow JSON successfully.');
