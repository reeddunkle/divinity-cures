const fs = require("node:fs");
const fsp = fs.promises;

const keyBy = (arr, getKey) => {
  return arr.reduce((acc, element) => {
    return {
      ...acc,
      [getKey(element)]: element,
    };
  }, {});
};

const compareStrings = (valueA, valueB) => {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

const dedupe = (stringArr) => {
  return Array.from(new Set(stringArr));
};

// Dependencies

const statusEffectPath = "./status-effects.json";
const statusEffectFile = fs.readFileSync(statusEffectPath);

const statusEffects = JSON.parse(statusEffectFile);

const statusEffectsById = keyBy(statusEffects, ({ id }) => id);

const skillsPath = "./skills.json";
const skillsFile = fs.readFileSync(skillsPath);

// Formatting

const skills = JSON.parse(skillsFile);

const format = (arr) => {
  return dedupe(arr.sort(compareStrings));
};

const statData = skills.map((skill) => {
  const skImmunities = skill.immunities ?? [];
  const skRemoves = skill.removes ?? [];

  const seResults = (skill.statusEffects ?? [])
    .map((se) => statusEffectsById[se.id])
    .map((se) => {
      return {
        immunities: se.immunities,
        removes: se.removes,
      };
    })
    .reduce(
      (acc, seResult) => {
        const seImmunities = seResult.immunities ?? [];
        const seRemoves = seResult.removes ?? [];

        return {
          immunities: format([...acc.immunities, ...seImmunities]),
          removes: format([...acc.removes, ...seRemoves]),
        };
      },
      { immunities: [], removes: [] },
    );

  return {
    skill: skill.name,
    direct: skRemoves,
    indirect: {
      immunities: [...skImmunities, ...seResults.immunities],
      removes: [...skRemoves, ...seResults.removes],
    },
  };
});

const stats = statData.reduce(
  (acc, skill) => {
    const hasIndirect =
      skill.indirect.immunities.length > 0 || skill.indirect.removes.length > 0;

    const isDirectRemoval = skill.direct.length > 0 && !hasIndirect;

    if (isDirectRemoval) {
      return {
        ...acc,
        directRemove: [...acc.directRemove, skill],
      };
    }

    const removes = [...skill.direct, ...skill.indirect.removes];
    const immunities = skill.indirect.immunities;

    const removesDifferentThanImmunities =
      removes.reduce((cur, removeText) => {
        return cur || !immunities.includes(removeText);
      }, false) ||
      immunities.reduce((cur, immunitiyText) => {
        return cur || !removes.includes(immunitiyText);
      }, false);

    if (removesDifferentThanImmunities) {
      return {
        ...acc,
        removesDifferentThanImmunities: [
          ...acc.removesDifferentThanImmunities,
          skill,
        ],
      };
    }

    return acc;
  },
  {
    directRemove: [],
    removesDifferentThanImmunities: [],
  },
);

console.log(JSON.stringify(stats, null, 2));

// const ex = RESULT[0];
