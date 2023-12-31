const fs = require("node:fs");

const fsp = fs.promises;

// Dependencies

const dependentPath = "./statusEffects.json";
const depFile = fs.readFileSync(dependentPath);

const _statusEffects = JSON.parse(depFile);

function findStatusEffectByName(name) {
  const found = _statusEffects.find(
    (se) => se.name.toLowerCase() === name.toLowerCase(),
  );

  if (!found) {
    throw Error(`'${name}' not found!!!`);
  }

  return found;
}

// DATA MANIPULATING
const filePath = "./skills.json"; // <----- EDITING THIS

const file = fs.readFileSync(filePath);

// Formatting

const skills = JSON.parse(file);

const RESULT = skills.map((obj) => ({
  ...obj,
  statusEffects: obj.statusEffects.map((se) => ({
    ...se,
    id: findStatusEffectByName(se.name).id,
  })),
}));

// Writing to file

const newJson = JSON.stringify(RESULT, null, 2);

fsp
  .writeFile(filePath, newJson)
  .then(() => {
    console.log("Success.");
  })
  .catch((error) => {
    console.error(error);
  });
