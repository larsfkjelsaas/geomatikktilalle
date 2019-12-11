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

const DataLayerPanel = ({ name }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
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
          <Button size="small">Delete</Button>
        </CardActions>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default DataLayerPanel;

// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// // const useStyles = makeStyles(theme => ({
// //   root: {
// //     width: "100%"
// //   },
// //   heading: {
// //     fontSize: theme.typography.pxToRem(15),
// //     fontWeight: theme.typography.fontWeightRegular
// //   }
// // }));

// // export default function ExpansionPanelList() {
// //   const classes = useStyles();

// //   return (
// //     <div className={classes.root}>
// //       <ExpansionPanel>
// //         <ExpansionPanelSummary
// //           expandIcon={<ExpandMoreIcon />}
// //           aria-controls="panel1a-content"
// //           id="panel1a-header"
// //         >
// //           <Typography className={classes.heading}>Expansion Panel 1</Typography>
// //         </ExpansionPanelSummary>
// //         <ExpansionPanelDetails>
// //           <Typography>
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
// //             malesuada lacus ex, sit amet blandit leo lobortis eget.
// //           </Typography>
// //         </ExpansionPanelDetails>
// //       </ExpansionPanel>
// //       <ExpansionPanel>
// //         <ExpansionPanelSummary
// //           expandIcon={<ExpandMoreIcon />}
// //           aria-controls="panel2a-content"
// //           id="panel2a-header"
// //         >
// //           <Typography className={classes.heading}>Expansion Panel 2</Typography>
// //         </ExpansionPanelSummary>
// //         <ExpansionPanelDetails>
// //           {/* <Typography>
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
// //             sit amet blandit leo lobortis eget.
// //           </Typography> */}
// //           <ExpansionPanel>
// //             <ExpansionPanelSummary
// //               expandIcon={<ExpandMoreIcon />}
// //               aria-controls="panel1a-content"
// //               id="panel1a-header"
// //             >
// //               <Typography className={classes.heading}>
// //                 Expansion Panel 1
// //               </Typography>
// //             </ExpansionPanelSummary>
// //             <ExpansionPanelDetails>
// //               <Typography>
// //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// //                 Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
// //                 eget.
// //               </Typography>
// //             </ExpansionPanelDetails>
// //           </ExpansionPanel>
// //         </ExpansionPanelDetails>
// //       </ExpansionPanel>
// //       <ExpansionPanel disabled>
// //         <ExpansionPanelSummary
// //           expandIcon={<ExpandMoreIcon />}
// //           aria-controls="panel3a-content"
// //           id="panel3a-header"
// //         >
// //           <Typography className={classes.heading}>
// //             Disabled Expansion Panel
// //           </Typography>
// //         </ExpansionPanelSummary>
// //       </ExpansionPanel>
// //     </div>
// //   );
// // }
