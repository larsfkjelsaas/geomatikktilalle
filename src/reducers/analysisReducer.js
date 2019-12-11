import createBuffer from "../components/analysis/buffer";

const initialGeometryState = {
  selectedAnalysis: "buffer",
  triggeredAnalyses: [],
  selectedLayer: -1,
  layers: []
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
      let name = "new_geometry";
      if (geometry.name) {
        name = geometry.name;
      }
      var layer = {
        geometry: geometry,
        name: name,
        type: "point"
      };
      state = addLayer(state, layer);
      break;
    case "GEOMETRY_DELETE_STARTED":
      console.log("started deletion of" + action.payload);
      break;
    case "GEOMETRY_DELETE_FINISHED":
      console.log("finished deletion");
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

  var layer = {
    geometry: bufferGeom,
    name: state.layers[state.selectedLayer].name + "_buffer",
    type: "polygon"
  };
  state = addLayer(state, layer, "buffer");

  return state;
}

function addLayer(state, layer, analysisType = "new") {
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
