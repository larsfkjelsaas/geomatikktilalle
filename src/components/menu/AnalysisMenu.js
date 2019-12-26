import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import CropIcon from "@material-ui/icons/Crop";
import DraftsIcon from "@material-ui/icons/Drafts";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { analysisTriggered } from "../../action-creators/actionCreator";
import { connect } from "react-redux";
import BufferDialog from "./BufferDialog";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  details: {
    display: "block"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const AnalysisMenu = ({ analysisTriggered }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Analysis</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <List dense={true} component="nav" aria-label="main mailbox folders">
            <BufferDialog analysisTriggered={analysisTriggered}></BufferDialog>
            <ListItem
              button
              onClick={() => analysisTriggered({ type: "intersection" })}
            >
              <ListItemIcon>
                <CropIcon />
              </ListItemIcon>
              <ListItemText
                primary="Intersection"
                secondary="Find the overlap between two polygons"
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dissolve"
                secondary="Combine polygons overlapping themselves"
              />
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

// const select = appState => {
//   return {};
// };
const actions = {
  analysisTriggered: analysisTriggered
};

export default connect(null, actions)(AnalysisMenu);
