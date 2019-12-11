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
import { geometryStartDeletion } from "../../action-creators/actionCreator";
import { connect } from "react-redux";

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

const DataLayerPanel = ({ name, geometryStartDeletion }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
        onClick={() => console.log("opened or closed")}
      >
        <Typography className={classes.heading}>{name}</Typography>
        {/* <Typography className={classes.secondaryHeading}>
          {"    "} Buffer of barnehager
        </Typography> */}
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
  );
};
const select = appState => {
  return {};
};
const actions = {
  geometryStartDeletion: geometryStartDeletion
};

export default connect(select, actions)(DataLayerPanel);
