type ClampUnit = string | number;

function clamp(min: ClampUnit, preferred: ClampUnit, max: ClampUnit) {
  return `clamp(${min}, ${preferred}, ${max})`;
}

// https://www.modularscale.com/?1&em&1.2
const minorSixths = {
  0: "0.06rem",
  1: "0.095rem",
  2: "0.153rem",
  3: "0.244rem",
  4: "0.391rem",
  5: "0.625rem",
  6: "1rem",
  7: "1.6rem",
  8: "2.56rem",
  9: "4.096rem",
  10: "6.554rem",
  11: "10.486rem",
  12: "16.777rem",
  13: "26.844rem",
  14: "42.95rem",
  15: "68.719rem",
  16: "109.951rem",
  17: "175.922rem",
  18: "281.475rem",
  19: "450.36rem",
  20: "720.576rem",
  21: "1152.922rem",
  22: "1844.674rem",
};

const minorThirds = {
  0: "0.335rem",
  1: "0.402rem",
  2: "0.482rem",
  3: "0.579rem",
  4: "0.694rem",
  5: "0.833rem",
  6: "1rem",
  7: "1.2rem",
  8: "1.44rem",
  9: "1.728rem",
  10: "2.074rem",
  11: "2.488rem",
  12: "2.986rem",
  13: "3.583rem",
  14: "4.3rem",
  15: "5.16rem",
  16: "6.192rem",
  17: "7.43rem",
  18: "8.916rem",
  19: "10.699rem",
  20: "12.839rem",
  22: "15.407rem",
  23: "18.488rem",
};

// https://fluid.style/type
const fluidThirds = {
  1: clamp(minorThirds[0], "0.284rem + 0.256vw", minorThirds[2]),
  2: clamp(minorThirds[1], "0.34rem + 0.308vw", minorThirds[3]),
  3: clamp(minorThirds[2], "0.408rem + 0.369vw", minorThirds[4]),
  4: clamp(minorThirds[3], "0.491rem + 0.442vw", minorThirds[5]),
  5: clamp(minorThirds[4], "0.588rem + 0.532vw", minorThirds[6]),
  6: clamp(minorThirds[5], "0.705rem + 0.638vw", minorThirds[7]),
  7: clamp(minorThirds[6], "0.847rem + 0.765vw", minorThirds[8]),
  8: clamp(minorThirds[7], "1.016rem + 0.918vw", minorThirds[9]),
  9: clamp(minorThirds[8], "1.219rem + 1.103vw", minorThirds[10]),
  10: clamp(minorThirds[9], "1.464rem + 1.322vw", minorThirds[11]),
  11: clamp(minorThirds[10], "1.757rem + 1.586vw", minorThirds[12]),
  12: clamp(minorThirds[11], "2.107rem + 1.904vw", minorThirds[13]),
  13: clamp(minorThirds[12], "2.529rem + 2.285vw", minorThirds[14]),
  14: clamp(minorThirds[13], "3.034rem + 2.743vw", minorThirds[15]),
  15: clamp(minorThirds[14], "3.642rem + 3.29vw", minorThirds[16]),
  16: clamp(minorThirds[15], "4.37rem + 3.948vw", minorThirds[17]),
  17: clamp(minorThirds[16], "5.245rem + 4.737vw", minorThirds[18]),
  18: clamp(minorThirds[17], "6.293rem + 5.685vw", minorThirds[19]),
  19: clamp(minorThirds[18], "7.551rem + 6.823vw", minorThirds[20]),
};

const fluidThirdHalfSteps = {
  1: clamp(minorThirds[0], "0.312rem + 0.117vw", minorThirds[1]),
  2: clamp(minorThirds[1], "0.121rem + 0.158vw", minorThirds[2]),
  3: clamp(minorThirds[2], "0.448rem + 0.169vw", minorThirds[3]),
  4: clamp(minorThirds[3], "0.539rem + 0.2vw", minorThirds[4]),
  5: clamp(minorThirds[4], "0.31rem + 0.407vw", minorThirds[5]),
  6: clamp(minorThirds[5], "0.775rem + 0.29vw", minorThirds[6]),
  7: clamp(minorThirds[6], "0.93rem + 0.348vw", minorThirds[7]),
  8: clamp(minorThirds[7], "1.117rem + 0.417vw", minorThirds[8]),
  9: clamp(minorThirds[8], "1.34rem + 0.501vw", minorThirds[9]),
  10: clamp(minorThirds[9], "1.608rem + 0.602vw", minorThirds[10]),
  11: clamp(minorThirds[10], "1.93rem + 0.72vw", minorThirds[11]),
  12: clamp(minorThirds[11], "2.315rem + 0.866vw", minorThirds[12]),
};

/* eslint-disable sort-keys */
const fluidScale = {
  xxxs: fluidThirds[1],
  xxs: fluidThirds[3],
  xs: fluidThirds[5],
  sm: fluidThirds[6],
  md: fluidThirds[8],
  lg: fluidThirds[10],
  xl: fluidThirds[11],
  xxl: fluidThirds[13],
  xxxl: fluidThirds[15],

  half: {
    min: {
      xxxs: fluidThirdHalfSteps[1],
      xxs: fluidThirdHalfSteps[3],
      xs: fluidThirdHalfSteps[5],
      sm: fluidThirdHalfSteps[6],
      md: fluidThirdHalfSteps[8],
      lg: fluidThirdHalfSteps[10],
      xl: fluidThirdHalfSteps[11],
    },
    max: {
      xxxs: fluidThirdHalfSteps[2],
      xxs: fluidThirdHalfSteps[4],
      xs: fluidThirdHalfSteps[6],
      sm: fluidThirdHalfSteps[7],
      md: fluidThirdHalfSteps[9],
      lg: fluidThirdHalfSteps[11],
      xl: fluidThirdHalfSteps[12],
    },
  },
};

const staticScale = {
  xxxs: minorThirds[1],
  xxs: minorThirds[3],
  xs: minorThirds[5],
  sm: minorThirds[6],
  md: minorThirds[8],
  lg: minorThirds[10],
  xl: minorThirds[11],
};
/* eslint-enable sort-keys */

export default {
  fluid: fluidScale,
  static: staticScale,
  minorSixths,
  minorThirds,
};
