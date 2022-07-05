const fs = require('fs');

describe('mergeData', () => {
  const files = [];

  const theDirectory = './src/data'; // or whatever directory you want to read
  fs.readdirSync(theDirectory, 'utf-8').forEach((file) => {
    // you may want to filter these by extension, etc. to make sure they are JSON files
    files.push(`./src/data/${file}`);
  });
  it('should count number of elements in merged data', () => {
    const resLengths = files
      .map((file) => {
        const lengths = JSON.parse(fs.readFileSync(file, 'utf-8')).length;
        return lengths;
      })
      .flat();
    const lengthsSum = resLengths.reduce((acc, sum) => acc + sum, 0);
    const total = Object.keys(
      JSON.parse(fs.readFileSync(`./src/merged-data/mergedData.json`, 'utf-8')),
    ).length;
    console.log(lengthsSum);
    console.log(total);

    expect(lengthsSum.length).toBe(total.length);
  });
});
