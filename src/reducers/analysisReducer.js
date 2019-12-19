import createBuffer from "../components/analysis/buffer";

export const initialGeometryState = {
  selectedAnalysis: "buffer",
  triggeredAnalyses: [],
  selectedLayer: -1,
  layers: [],
  layersToDelete: [],
  activeColor: "#001eff"
};

export const geometryReducer = (state = initialGeometryState, action) => {
  switch (action.type) {
    case "ANLYSIS_CHOOSEN":
      console.log("analysis chosen");
      state = {
        ...state,
        selectedAnalysis: action.payload,
        triggeredAnalyses: [...state.triggeredAnalyses, action.payload]
      };
      break;
    case "ANALYSIS_TRIGGERED":
      state = resolveAnalysisTrigger(state, action.payload);
      break;
    case "GEOMETRY_CREATE_TRIGGERED":
      let geometry = action.payload;
      let name = findUniqueName(state, geometry);

      var layer = {
        geometry: geometry,
        name: name,
        type: "point"
      };
      state = addLayer(state, layer);
      break;
    case "GEOMETRY_DELETE_STARTED":
      const layerToDelete = state.layers.find(
        layer => layer.name === action.payload
      );
      state = {
        ...state,
        layersToDelete: [...state.layersToDelete, layerToDelete]
      };
      break;
    case "GEOMETRY_DELETE_FINALIZED":
      state = {
        ...state,
        layers: state.layers.filter(
          layer => layer.name !== state.layersToDelete[0].name
        ),
        layersToDelete: []
      };
      break;

    case "LAYER_SELECTED":
      let layerIndex = action.payload;
      //Pane is already open, close it instead
      if (state.selectedLayer === layerIndex) {
        layerIndex = -1;
      }
      state = {
        ...state,
        selectedLayer: layerIndex
      };
      break;
    case "COLOR_CHANGE":
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

      break;
    default:
      break;
  }
  return state;
};

function resolveAnalysisTrigger(state, payload) {
  switch (initialGeometryState.selectedAnalysis) {
    case "buffer":
      return resolveBufferTrigger(state, payload);
    default:
      console.log("Selected analysis is invalid");
      break;
  }
}

function resolveBufferTrigger(state, payload) {
  var { value } = payload;
  var geom = state.layers[state.selectedLayer].geometry;
  var bufferGeom = createBuffer(geom, value);

  var name = state.layers[state.selectedLayer].name;
  name = findUniqueName(state, geom, name, "_buffer");

  var layer = {
    geometry: bufferGeom,
    name: name,
    type: "polygon"
  };
  state = addLayer(state, layer, "buffer");

  return state;
}

function addLayer(state, layer, analysisType = "new") {
  //Make a separate variable for display name in case we want to change it in the UI
  layer.displayName = layer.name;

  //Initialize color
  layer.color = state.activeColor;
  //If no layer was selected previously, select this
  let selectedLayer = state.selectedLayer;
  if (selectedLayer === -1) {
    selectedLayer = 0;
  }
  state = {
    ...state,
    layers: [...state.layers, layer],
    triggeredAnalyses: [...state.triggeredAnalyses, analysisType],
    selectedLayer: selectedLayer
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
