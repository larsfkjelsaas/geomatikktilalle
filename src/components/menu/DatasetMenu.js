import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CardActions,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DataLayerPanel from "./DataLayerPanel";

import {
  geometryStartDeletion,
  selectLayer,
  dataLayerDragEnd
} from "../../action-creators/actionCreator";

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
  selectedLayer,
  layers,
  geometryStartDeletion,
  selectLayer,
  dataLayerDragEnd
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
          <Typography className={classes.heading}>Datasets</Typography>
        </ExpansionPanelSummary>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Everything that is shown on the open panel, but not the closed */}
          <ExpansionPanelDetails className={classes.details}>
            <div>
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
                        selectLayer={selectLayer}
                        selectedLayer={selectedLayer}
                      ></DataLayerPanel>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </ExpansionPanelDetails>
        </DragDropContext>
      </ExpansionPanel>
    </div>
  );
};

const select = appState => ({
  selectedLayer: appState.geometry.selectedLayer,
  layers: appState.geometry.layers
});

const actions = {
  geometryStartDeletion: geometryStartDeletion,
  selectLayer: selectLayer,
  dataLayerDragEnd: dataLayerDragEnd
};

export default connect(select, actions)(DatasetMenu);
