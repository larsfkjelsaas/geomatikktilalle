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

const DatasetMenu = ({ selectedLayer, layers }) => {
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
            {layers.map(layer => (
              <div className="layer" key={layer.name}>
                <DataLayerPanel name={layer.name}></DataLayerPanel>
              </div>
            ))}
          </>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const select = appState => {
  return {
    selectedLayer: appState.geometry.selectedLayer,
    layers: appState.geometry.layers
  };
};

export default connect(select)(DatasetMenu);
