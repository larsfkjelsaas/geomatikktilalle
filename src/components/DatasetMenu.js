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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const DatasetMenu = () => {
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
        <ExpansionPanelDetails>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Skoler</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CardActions className={classes.actions}>
                <Button size="small">Details</Button>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2b-content"
              id="panel2b-header"
            >
              <Typography className={classes.heading}>Barnehager</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CardActions className={classes.actions}>
                <Button size="small">Details</Button>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
              </CardActions>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default DatasetMenu;
