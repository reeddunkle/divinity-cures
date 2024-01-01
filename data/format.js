const fs = require("node:fs");

const fsp = fs.promises;

// Dependencies

const dependentPath = "./spellSchools.json";
const depFile = fs.readFileSync(dependentPath);

const _spellSchools = JSON.parse(depFile);

function findSpellSchoolByName(name) {
  const found = _spellSchools.find(
    (school) => school.name.toLowerCase() === name.toLowerCase(),
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

const RESULT = skills.map((obj) => {
  if (obj.requirements) {
    const requirements = obj.requirements;

    const newRequirements = Object.entries(requirements).map(
      ([reqName, reqNumber]) => {
        const schoolData = findSpellSchoolByName(reqName);

        return {
          id: schoolData.id,
          name: schoolData.name,
          number: reqNumber,
        };
      },
    );

    return {
      ...obj,
      requirements: newRequirements,
    };
  }

  return obj;
});

// const ex = RESULT[0];

// console.log(ex.requirements);

// Writing to file

// const newJson = JSON.stringify(RESULT, null, 2);

// fsp
//   .writeFile(filePath, newJson)
//   .then(() => {
//     console.log("Success.");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
