import { findUniqueName, addLayer } from "./reducerUtilities";
import createBuffer from "../analysis/buffer";
import createIntersect from "../analysis/intersection";
import createDissolve from "../analysis/dissolve";
import createUnion from "../analysis/union";

export function resolveBufferTrigger(state, action) {
  var value = action.payload.value;
  if (state.selectedLayers.length === 0) {
    alert("Please select a feature first");
    return state;
  }
  state.selectedLayers.forEach(selectedLayerName => {
    let selectedLayer = state.layers.find(
      element => element.name === selectedLayerName
    );
    let index = state.layers.indexOf(selectedLayer);
    let geom = state.layers[index].geometry;
    let bufferGeom = createBuffer(geom, value);
    let name = state.layers[index].name.substring(0, 8);
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
  if (state.selectedLayers.length !== 1) {
    alert("Please choose exactly one layer to dissolve");
    return state;
  }

  let selectedLayer = state.layers.find(
    element => element.name === state.selectedLayers[0]
  );
  let index = state.layers.indexOf(selectedLayer);

  let geom = selectedLayer.geometry;
  console.log(geom.type);
  if (geom.type !== "FeatureCollection") {
    alert("Dissolve requires a FeatureCollection layer to be selected");
    return state;
  }

  let dissolveGeom = createDissolve(geom);

  let name = state.layers[index].name.substring(0, 8);
  name = findUniqueName(state, geom, name, "_dissolve");
  let layer = {
    geometry: dissolveGeom,
    name: name,
    type: "polygon"
  };

  state = addLayer(state, layer, "dissolve");

  return state;
}

export function resolveUnionTrigger(state, action) {
  if (state.selectedLayers.length < 2) {
    alert("Select at least two layers to do an union");
    return state;
  }

  let selectedLayers = findSelectedLayers(state);
  selectedLayers.forEach(selectedLayer => {
    if(selectedLayer.layer.type === "polygon"){
      alert("All layers selected must be polygon layers");
      return state;
    }
  });
    
  let geometries = selectedLayers.map(currentLayer => {
    return currentLayer.layer.geometry
  });

  let unionGeom = createUnion(geometries);


  let name = "union";
  name = findUniqueName(state, selectedLayers[0].layer, name);
  let layer = {
    geometry: unionGeom,
    name: name,
    type: "polygon"
  };

  state = addLayer(state, layer, "union");

  return state;
}

export function resolveDifferenceTrigger(state, action) {
  if (state.selectedLayers.length !== 2) {
    alert("Select two layers to do a difference");
    return state;
  }
  let selectedLayers = findSelectedLayers(state);

  return state;
}

function findSelectedLayers(state) {
  let selectedLayers = [];
  state.selectedLayers.forEach(selectedLayerName => {
    let layer = state.layers.find(
      element => element.name === selectedLayerName
    );
    let index = state.layers.indexOf(layer);
    let selectedLayer = {
      layer: layer,
      index: index
    };
    selectedLayers = [...selectedLayers, selectedLayer];
  });
  return selectedLayers;
}
