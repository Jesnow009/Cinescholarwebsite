const fs = require('fs');

const dataPath = 'js/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const startKey = '"editor1": {';
const endKey = '"sound": {';

const startIdx = content.indexOf(startKey);
const endIdx = content.indexOf(endKey);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find editor1 or sound key in data.js');
    process.exit(1);
}

// Extract editor1 block
let editor1Block = content.substring(startIdx, endIdx);

// Modify the block for cinematographer
editor1Block = editor1Block.replace('"editor1": {', '"cinematographer": {');
editor1Block = editor1Block.replace('"id": "editor1",', '"id": "cinematographer",');
editor1Block = editor1Block.replace('"title": "EDITING 1",', '"title": "CINEMATOGRAPHY",');
editor1Block = editor1Block.replace(
    '"subtitle": "Continuity, Pacing, Montage & Structure (Duplicate)",',
    '"subtitle": "Lighting, Composition, Camera Movement & Lensing",'
);

// Update focus items
const originalFocusBlock = `"focus": [
            "Mise-en-scène: Actor blocking and compositional framing",
            "Signature Style: Visual motifs, colors, and camera movement patterns",
            "Directorial Language: Subjective staging and structural pacing"
        ],`;
const newFocusBlock = `"focus": [
            "Lensing & Composition: Selection of lens focal length, depth of field, and frame geometry",
            "Lighting & Color: Expressive use of contrast, color temperature, and shadow styling",
            "Camera Movement: Dynamic tracking shots, pans, cranes, and hand-held cameras"
        ],`;
editor1Block = editor1Block.replace(originalFocusBlock, newFocusBlock);

// Rename sub-array key "editors" to "cinematographers"
editor1Block = editor1Block.replace('"editors": [', '"cinematographers": [');

// Reconstruct and write back
const newContent = content.substring(0, startIdx) + editor1Block + content.substring(endIdx);

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Successfully renamed database structure in data.js.');
