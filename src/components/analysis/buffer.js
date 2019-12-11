import buffer from "@turf/buffer";

const createBuffer = (geom, value, units = "meters") => {
  var buffered = buffer(geom, value, { units: units });
  return buffered;
};

export default createBuffer;
