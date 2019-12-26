import { findUniqueName, addLayer } from "./reducerUtilities";
import createBuffer from "../components/analysis/buffer";
import createIntersect from "../components/analysis/intersection";

export function resolveBufferTrigger(state, action) {
  var value = action.payload.value;
  state.selectedLayers.forEach(selectedLayerName => {
    let selectedLayer = state.layers.find(
      element => element.name === selectedLayerName
    );
    let index = state.layers.indexOf(selectedLayer);
    let geom = state.layers[index].geometry;
    let bufferGeom = createBuffer(geom, value);
    let name = state.layers[index].name;
    name = findUniqueName(state, geom, name, "_buffer");
    let layer = {
      geometry: bufferGeom,
      name: name,
      type: "polygon"
    };
    state = addLayer(state, layer, "buffer");
  });

  return state;
}

export function resolveIntersectionTrigger(state, action) {
  if (state.selectedLayers.length !== 2) {
    alert("Select two layers to do an intersection");
    return state;
  }

  let selectedLayer1 = state.layers.find(
    element => element.name === state.selectedLayers[0]
  );
  let index1 = state.layers.indexOf(selectedLayer1);
  let geom1 = state.layers[index1];

  let selectedLayer2 = state.layers.find(
    element => element.name === state.selectedLayers[1]
  );
  let index2 = state.layers.indexOf(selectedLayer2);
  let geom2 = state.layers[index2];

  if (!(geom1.type === "polygon" && geom2.type === "polygon")) {
    alert("Both layers selected must be polygons");
    return state;
  }

  let intersectGeom = createIntersect(geom1, geom2);
  let name =
    state.layers[index1].name.substring(0, 5) +
    "_" +
    state.layers[index2].name.substring(0, 5);
  name = findUniqueName(state, geom1, name, "_intersect");
  let layer = {
    geometry: intersectGeom,
    name: name,
    type: "polygon" //TODO handle line and point overlap
  };

  state = addLayer(state, layer, "intersect");

  return state;
}

export function resolveDissolveTrigger(state, action) {
  alert("Dissolve not implemented");
  return state;
}
