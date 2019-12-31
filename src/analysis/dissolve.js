import dissolve from "@turf/dissolve";

const createDissolve = geom => {
  //filter out any multipolygons that turf dissolve can't handle
  var newGeom = geom;
  newGeom.features = geom.features.filter(feature => feature.geometry.type === "Polygon");
  var dissolved = dissolve(newGeom);
  return dissolved;
};

export default createDissolve;
