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
import { Draggable } from "react-beautiful-dnd";

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

const DataLayerPanel = ({
  name,
  index,
  geometryStartDeletion,
  selectLayer,
  selectedLayer
}) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <ExpansionPanel
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          expanded={index === selectedLayer}
          onChange={() => selectLayer(index)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>{name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CardActions className={classes.actions}>
              <Button size="small">Details</Button>
              <Button size="small">Edit</Button>
              <Button size="small" onClick={() => geometryStartDeletion(name)}>
                Delete
              </Button>
            </CardActions>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </Draggable>
  );
};

export default DataLayerPanel;
