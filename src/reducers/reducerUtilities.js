export function updateItemInLayersId(state, itemId, updateItemCallback) {
  const updatedItems = state.layers.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(state, item);
    return updatedItem;
  });

  return updatedItems;
}

export function updateItemByNameInLayers(itemList, itemNames, updateItemCallback, ...callBackArgs) {
  const updatedItems = itemList.map(item => {
    let index = itemNames.indexOf(item.name);
    if (index < 0) {
      // Since we only want to update items in the list, preserve all others as they are now
      return item;
    }

    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item, callBackArgs);

    return updatedItem;
  });
  console.log(updatedItems);
  return updatedItems;
}

export function moveItemInArray(array, sourceIndex, destinationIndex) {
  const newArray = Array.from(array);
  const movedObject = array[sourceIndex];
  newArray.splice(sourceIndex, 1);
  newArray.splice(destinationIndex, 0, movedObject);
  return newArray;
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export function findUniqueName(state, geometry, name = "new_geometry", affix = "") {
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

export function addLayer(state, layer, analysisType = "new") {
  //Make a separate variable for display name in case we want to change it in the UI
  layer.displayName = layer.name;

  //Initialize color
  layer.color = state.activeColor;

  //Set visibility
  layer.visible = true;

  state = {
    ...state,
    layers: [layer, ...state.layers],
    triggeredAnalyses: [...state.triggeredAnalyses, analysisType]
  };
  return state;
}
