import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DataLayerPanel from "./DataLayerPanel";

import {
  geometryStartDeletion,
  expandLayer,
  dataLayerDragEnd,
  selectLayer,
  layerVisibilityTrigger
} from "../../../action-creators/actionCreator";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  details: {
    display: "block"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const DatasetMenu = ({
  expandedLayer,
  layers,
  geometryStartDeletion,
  expandLayer,
  selectLayer,
  dataLayerDragEnd,
  layerVisibilityTrigger
}) => {
  const classes = useStyles();
  
  const onDragEnd = result => {
    const { destination, source } = result;
    //dropped outside of context or otherwise no destination
    if (!destination) {
      return;
    }
    //not moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dataLayerDragEnd(result);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Layers</Typography>
        </ExpansionPanelSummary>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Everything that is shown on the open panel, but not the closed */}
          <ExpansionPanelDetails className={classes.details}>
            <List>
              <Droppable droppableId="datasetMenu">
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    provided={provided}
                  >
                    {layers.map((layer, index) => (
                      <DataLayerPanel
                        className="layer"
                        key={layer.name}
                        name={layer.name}
                        index={index}
                        geometryStartDeletion={geometryStartDeletion}
                        expandLayer={expandLayer}
                        selectLayer={selectLayer}
                        expandedLayer={expandedLayer}
                        layerVisibilityTrigger={layerVisibilityTrigger}
                      ></DataLayerPanel>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </List>
          </ExpansionPanelDetails>
        </DragDropContext>
      </ExpansionPanel>
    </div>
  );
};

const select = appState => ({
  expandedLayer: appState.geometry.expandedLayer,
  layers: appState.geometry.layers
});

const actions = {
  geometryStartDeletion: geometryStartDeletion,
  expandLayer: expandLayer,
  selectLayer: selectLayer,
  dataLayerDragEnd: dataLayerDragEnd,
  layerVisibilityTrigger: layerVisibilityTrigger
};

export default connect(select, actions)(DatasetMenu);
