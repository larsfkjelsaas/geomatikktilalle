import React from "react";
import DataLayerPanel from "./DataLayerPanel";
import { Droppable, Draggable } from "react-beautiful-dnd";
const DatasetList = (
  {selectLayer,
  selectedLayer,
  layers,
  geometryStartDeletion
  }) => {
  return(
    layers.map((layer, index) => (
      <Draggable>
        <div className="layer" key={layer.name}>
          <DataLayerPanel
            name={layer.name}
            index={index}
            geometryStartDeletion={geometryStartDeletion}
            selectLayer={selectLayer}
            selectedLayer={selectedLayer}
          ></DataLayerPanel>
        </div>
      </Draggable>
    ))
  )
};
export default DatasetList;
