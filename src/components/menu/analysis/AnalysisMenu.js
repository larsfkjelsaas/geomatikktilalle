import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";
import CropIcon from "@material-ui/icons/Crop";
import LensIcon from "@material-ui/icons/Lens";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import ViewCompactOutlinedIcon from "@material-ui/icons/ViewCompactOutlined";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { analysisTriggered } from "../../../action-creators/actionCreator";
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
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`
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
          <List dense={true} component="nav" aria-label="analysis">
            <li>
              <Typography
                className={classes.dividerFullWidth}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Input: Any one layer selected
              </Typography>
            </li>
            <BufferDialog analysisTriggered={analysisTriggered}></BufferDialog>

            <Divider />
            <li>
              <Typography
                className={classes.dividerFullWidth}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Input: One polygon layer selected
              </Typography>
            </li>
            <ListItem
              button
              onClick={() => analysisTriggered({ type: "dissolve" })}
            >
              <ListItemIcon>
                <LensIcon />
              </ListItemIcon>
              <ListItemText
                primary="Dissolve"
                secondary="Merge overlapping polygons within layer"
              />
            </ListItem>
            <Divider />
            <li>
              <Typography
                className={classes.dividerFullWidth}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Input: Two polygon layers selected
              </Typography>
            </li>
            <ListItem
              button
              onClick={() => analysisTriggered({ type: "intersection" })}
            >
              <ListItemIcon>
                <CropIcon />
              </ListItemIcon>
              <ListItemText
                primary="Intersection"
                secondary="Find area that is within both layers"
              />
            </ListItem>
            <ListItem
              button
              onClick={() => analysisTriggered({ type: "difference" })}
            >
              <ListItemIcon>
                <ViewCompactOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Difference"
                secondary="Find the area within one input layer, but not the other"
              />
            </ListItem>
            <Divider /> 
            <li>
              <Typography
                className={classes.dividerFullWidth}
                color="textSecondary"
                display="block"
                variant="caption"
              >
                Input: Any number of polygon layers selected
              </Typography>
            </li>
            <ListItem
              button
              onClick={() => analysisTriggered({ type: "union" })}
            >
              <ListItemIcon>
                <ViewCompactIcon />
              </ListItemIcon>
              <ListItemText
                primary="Union"
                secondary="Find the area within all input layers"
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
