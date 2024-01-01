const fs = require("node:fs");

const fsp = fs.promises;

// Dependencies

// const dependentPath = "./spellSchools.json";
// const depFile = fs.readFileSync(dependentPath);

// const _spellSchools = JSON.parse(depFile);

// function findSpellSchoolByName(name) {
//   const found = _spellSchools.find(
//     (school) => school.name.toLowerCase() === name.toLowerCase(),
//   );

//   if (!found) {
//     throw Error(`'${name}' not found!!!`);
//   }

//   return found;
// }

// DATA MANIPULATING
const filePath = "./skills.json"; // <----- EDITING THIS

const file = fs.readFileSync(filePath);

// Formatting

const skills = JSON.parse(file);

const RESULT = skills
  .map((obj) => {
    return {
      ...obj,
      schools: obj.schools.map((sch) => {
        const requirements = obj?.requirements?.find(
          (req) => req.id === sch.id,
        );

        if (!requirements) {
          return sch;
        }

        return {
          ...sch,
          requires: requirements.number,
        };
      }),
    };
  })
  .map((obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const isOmitted = key === "requirements";

      if (isOmitted) {
        console.log("Omitting: ", key);

        return acc;
      }

      return {
        ...acc,
        [key]: value,
      };
    }, {});
  });

// const ex = RESULT[0];

// console.log(ex);

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
