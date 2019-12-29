import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CardActions,
  Button,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";

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
  expandLayer,
  selectLayer,
  expandedLayer,
  layerVisibilityTrigger
}) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <ExpansionPanel
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          expanded={index === expandedLayer}
          onChange={() => expandLayer(index)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Select"
              onClick={event => {
                //Filter out the double onclick when clicking on the text
                if (event.target.type === "checkbox") {
                  selectLayer(name);
                }
                //Want to stop expansion effect, just select
                event.stopPropagation();
              }}
              onFocus={event => {
                event.stopPropagation();
              }}
              control={<Checkbox />}
              label={name}
            />
            {/* <Typography className={classes.heading}>{name}</Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CardActions className={classes.actions}>
              <Button
                size="small"
                onClick={() => alert("Renaming not yet implemented")}
              >
                Rename
              </Button>
              <Button size="small" onClick={() => layerVisibilityTrigger(name)}>
                Toggle visibility
              </Button>
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
