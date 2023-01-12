const { LoremIpsum } = require("lorem-ipsum");
var fs = require("fs");

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

for (let i = 0; i < 10; i++) {
  console.log(`${i} iteration`);
  fs.writeFile("./messageSeed.csv", generate(), { flag: "a" }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function generate() {
  let output = "";
  for (let i = 0; i < 1000000; i++) {
    output += `${lorem.generateSentences(1)},${lorem.generateWords(1)}\n`;
  }
  return output;
}
