import intersect from "@turf/intersect";

const createIntersect = (geom1, geom2) => {
  let intersects = {
    type: "FeatureCollection",
    features: []
  };
  console.log(geom1);
  geom1.geometry.features.forEach(geom1 => {
    geom2.geometry.features.forEach(geom2 => {
      let intersectGeom = intersect(geom1, geom2);
      if (intersectGeom !== null) {
        intersects.features = [...intersects.features, intersectGeom];
      }
    });
  });
  return intersects;
};

export default createIntersect;
