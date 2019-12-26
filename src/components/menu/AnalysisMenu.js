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
import { analysisTriggered } from "../../action-creators/actionCreator";
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
    fontWeight: theme.typography.fontWeightRegular
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

const AnalysisMenu = ({analysisTriggered}) => {
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
          <Button
            onClick={() => analysisTriggered({ type: "buffer", value: 200 })}
          >
            Buffer
          </Button>
          <Button onClick={() => analysisTriggered({ type: "intersection" })}>
            Intersection
          </Button>
          <Button onClick={() => analysisTriggered({ type: "dissolve" })}>
            Dissolve
          </Button>
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
