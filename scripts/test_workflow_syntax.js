const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wfPath = path.join(__dirname, '..', 'workflows', 'NutriScanner_Main_Orchestrator.json');
const wf = JSON.parse(fs.readFileSync(wfPath, 'utf8'));

console.log('Testing JS syntax of all Code nodes inside function wrapper...');
for (const node of wf.nodes) {
  if (node.type === 'n8n-nodes-base.code' && node.parameters?.jsCode) {
    try {
      new vm.Script('(async function() {\n' + node.parameters.jsCode + '\n})');
      console.log(`✓ Node [${node.name}] JS syntax is VALID.`);
    } catch (e) {
      console.error(`✗ Node [${node.name}] JS syntax ERROR:`, e.message);
      process.exit(1);
    }
  }
}
console.log('All nodes passed syntax validation!');
