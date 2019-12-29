import dissolve from "@turf/dissolve";

const createDissolve = (geom) => {
  var dissolved = dissolve(geom);
  return dissolved;
};

export default createDissolve;
