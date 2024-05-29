const fs = require('fs');
const path = require('path');

function copyFiles(sourceDir, targetDir) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${sourceDir}:`, err);
      return;
    }

    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);

      // Check if the target file already exists
      if (!fs.existsSync(targetFile)) {
        fs.copyFile(sourceFile, targetFile, err => {
          if (err) {
            console.error(`Error copying file ${sourceFile} to ${targetFile}:`, err);
          } else {
            console.log(`Copied ${file} to ${targetDir}`);
          }
        });
      } else {
        console.log(`File ${file} already exists in ${targetDir}, skipping.`);
      }
    });
  });
}

const callsSourceDir = path.join(__dirname, '../../ea_con_gen/calls');
const callsTargetDir = path.join(__dirname, '../call_library');
const ticketsSourceDir = path.join(__dirname, '../../ea_con_gen/tickets');
const ticketsTargetDir = path.join(__dirname, '../chat-library');

// Ensure target directories exist
if (!fs.existsSync(callsTargetDir)) {
  fs.mkdirSync(callsTargetDir, { recursive: true });
}

if (!fs.existsSync(ticketsTargetDir)) {
  fs.mkdirSync(ticketsTargetDir, { recursive: true });
}

// Copy files from calls and tickets directories
copyFiles(callsSourceDir, callsTargetDir);
copyFiles(ticketsSourceDir, ticketsTargetDir);
