import * as fs from 'fs';

const dataDirectory = './src/data';
const mergedDataDirectory = './src/merged-data';
const files = [];
let mergedResult = fs.readFileSync(
  `${mergedDataDirectory}/mergedData.json`,
  'utf-8',
);

fs.readdirSync(dataDirectory, 'utf-8').forEach((file) => {
  // you may want to filter these by extension, etc. to make sure they are JSON files
  files.push(`./src/data/${file}`);
});

// pass the "files" to json concat
console.log(files);
const res = files
  .map((file) => {
    const merged = JSON.parse(fs.readFileSync(file, 'utf-8'));
    return merged;
  })
  .flat();

mergedResult = JSON.stringify(res);
fs.writeFileSync(
  `${mergedDataDirectory}/mergedData.json`,
  mergedResult,
  'utf-8',
);
