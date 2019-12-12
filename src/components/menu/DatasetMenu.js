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
import DataLayerPanel from "./DataLayerPanel";
import {
  geometryStartDeletion,
  selectLayer
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
  selectLayer
}) => {
  const classes = useStyles();

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
        <ExpansionPanelDetails className={classes.details}>
          <>
            {layers.map((layer, index) => (
              <div className="layer" key={layer.name}>
                <DataLayerPanel
                  name={layer.name}
                  index={index}
                  geometryStartDeletion={geometryStartDeletion}
                  selectLayer={selectLayer}
                  selectedLayer={selectedLayer}
                ></DataLayerPanel>
              </div>
            ))}
          </>
        </ExpansionPanelDetails>
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
  selectLayer: selectLayer
};

export default connect(select, actions)(DatasetMenu);
