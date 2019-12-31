import union from "@turf/union";

const createUnion = (geoms) => {
  var newGeoms = geoms;
 
  //filter out any multipolygons that union can't handle
  newGeoms.forEach(newGeom => newGeom.features = newGeom.features.filter(
    feature => feature.geometry.type === "Polygon"
  ));

  function flattenFeatures(total, geom) {
    return ([...total, ...geom.features]);
  }
  console.log(newGeoms);
  var geomFeatures = newGeoms.reduce(flattenFeatures, []);
  console.log(geomFeatures);

  var unioned = union(...geomFeatures);
  return unioned;
};

export default createUnion;
