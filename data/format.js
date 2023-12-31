const fs = require("node:fs");

const fsp = fs.promises;

const filePath = "./skills.json";

const file = fs.readFileSync(filePath);

const effects = JSON.parse(file);

const newJson = JSON.stringify(Object.values(effects), null, 2);

fsp
  .writeFile(filePath, newJson)
  .then(() => {
    console.log("Success.");
  })
  .catch((error) => {
    console.error(error);
  });
