import createBuffer from "../components/analysis/buffer";
import { moveItemInArray } from "./reducerUtilities";

export const analysisChosen = (state, action) => {
  return {
    ...state,
    selectedAnalysis: action.payload,
    triggeredAnalyses: [...state.triggeredAnalyses, action.payload]
  };
};

export const analysisTriggered = (state, action) => {
  if (action.payload.type) {
    switch (action.payload.type.toLowerCase()) {
      case "buffer":
        return resolveBufferTrigger(state, action);
      case "intersection":
        return resolveIntersectionTrigger(state, action);
      case "dissolve":
        return resolveDissolveTrigger(state, action);
      default:
        console.log("Selected analysis is invalid");
        return state;
    }
  } else {
    return state;
  }
};

export const geometryCreateTriggered = (state, action) => {
  let geometry = action.payload;
  let name = findUniqueName(state, geometry);

  var layer = {
    geometry: geometry,
    name: name,
    type: "point"
  };
  return addLayer(state, layer);
};

export const geometryDeleteStarted = (state, action) => {
  const layerToDelete = state.layers.find(
    layer => layer.name === action.payload
  );
  return {
    ...state,
    layersToDelete: [...state.layersToDelete, layerToDelete]
  };
};

export const geometryDeleteFinalized = (state, action) => {
  return {
    ...state,
    layers: state.layers.filter(
      layer => layer.name !== state.layersToDelete[0].name
    ),
    layersToDelete: []
  };
};

export const layerExpanded = (state, action) => {
  let layerIndex = action.payload;
  //Pane is already open, close it instead
  if (state.expandedLayer === layerIndex) {
    layerIndex = -1;
  }
  return {
    ...state,
    expandedLayer: layerIndex
  };
};

export const layerSelected = (state, action) => {
  let layerName = action.payload;
  let newSelectedLayers = Array.from(state.selectedLayers);
  let index = newSelectedLayers.indexOf(layerName);

  //If found remove, else add to selected layers
  if (index >= 0) {
    newSelectedLayers.splice(index, 1);
  } else {
    newSelectedLayers = [...newSelectedLayers, layerName];
  }

  return {
    ...state,
    selectedLayers: newSelectedLayers
  };
};

export const layersRearranged = (state, action) => {
  const layers = Array.from(state.layers);
  const { destination, source } = action.payload;
  const newLayers = moveItemInArray(layers, source.index, destination.index);

  //Update reference to expanded layer
  var expandedLayer = state.expandedLayer;
  if (source.index === expandedLayer) {
    expandedLayer = destination.index;
  }

  return {
    ...state,
    layers: newLayers,
    expandedLayer: expandedLayer,
    layerToMove: destination.index
  };
};

export const layersRearrangedDone = (state, action) => {
  return {
    ...state,
    layerToMove: -1
  };
};

export const colorChange = (state, action) => {
  //Create a new layers array that is the same except for one color change to selected layer
  if (state.selectedLayer >= 0) {
    let layers = state.layers.map((layer, index) => {
      if (index !== state.selectedLayer) {
        return layer;
      } else {
        return {
          ...layer,
          color: action.payload
        };
      }
    });

    state = {
      ...state,
      activeColor: action.payload,
      layers: layers
    };
  } else {
    state = {
      ...state,
      activeColor: action.payload
    };
  }
  return state;
};

function resolveBufferTrigger(state, action) {
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

function resolveIntersectionTrigger(state, action){
  alert("Intersection not implemented");
  return state;
}

function resolveDissolveTrigger(state, action){
  alert("Dissolve not implemented");
  return state;
}

function addLayer(state, layer, analysisType = "new") {
  //Make a separate variable for display name in case we want to change it in the UI
  layer.displayName = layer.name;

  //Initialize color
  layer.color = state.activeColor;
  //If no layer was selected previously, select this
  // let selectedLayer = state.selectedLayer;
  // if (selectedLayer === -1) {
  //   selectedLayer = 0;
  // }
  state = {
    ...state,
    layers: [layer, ...state.layers],
    triggeredAnalyses: [...state.triggeredAnalyses, analysisType]
  };
  return state;
}

function findUniqueName(state, geometry, name = "new_geometry", affix = "") {
  //If no name is given and the dataset includes a name, use it
  if (geometry.name && name === "new_geometry") {
    name = geometry.name;
  }

  //append any affix, usually to signify how the layer was created (e.g _buffer)
  name = name + affix;

  //check whether name is already in use, and try appending _1, _2, _3 etc until a name not in use is found
  function isNameUnique(name, layers) {
    if (layers.find(layer => layer.name === name) === undefined) {
      return true;
    } else return false;
  }

  var originalName = name;
  var nameIsUnique = isNameUnique(name, state.layers);
  var i = 1;
  while (!nameIsUnique) {
    name = originalName + "_" + i;
    i += 1;

    nameIsUnique = isNameUnique(name, state.layers);
  }

  return name;
}
