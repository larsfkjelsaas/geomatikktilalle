import {
  moveItemInArray,
  updateItemByNameInLayers,
  addLayer,
  findUniqueName
} from "./reducerUtilities";
import {
  resolveBufferTrigger,
  resolveIntersectionTrigger,
  resolveDissolveTrigger
} from "./geometryAnalysis";

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
  const { destination, source } = action.payload;
  const newLayers = moveItemInArray(
    state.layers,
    source.index,
    destination.index
  );

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
  const changeLayerColor = (layer, args) => {
    let color = args[0];
    let newLayer = {
      ...layer,
      color: color
    };
    return newLayer;
  };
  //Create a new layers array that is the same except for one color change to selected layer
  let newColor = action.payload;
  let newLayers = updateItemByNameInLayers(
    state.layers,
    state.selectedLayers,
    changeLayerColor,
    newColor
  );
  let newState = Array.from(state);

  newState = {
    ...state,
    layers: newLayers,
    activeColor: newColor
  };

  return newState;
};
