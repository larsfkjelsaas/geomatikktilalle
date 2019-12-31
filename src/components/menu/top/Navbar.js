import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  GridList,
  GridListTileBar,
  GridListTile,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "nowrap",
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

const Navbar = ({ className, triggeredAnalysis }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      {/* <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {triggeredAnalysis.map(analysis => (
            <GridListTile key={analysis}>
              <GridListTileBar
                title={analysis.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  <IconButton aria-label={`star ${analysis}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div> 
      <List  dense={true} component="nav" aria-label="log">
      {triggeredAnalysis.map(analysis => (
        <ListItem>{analysis}</ListItem>
      ))}
    </List> */}
    </div>
  );
};

const styledNavbar = styled(Navbar)`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  background-color: #4e3a4c;
`;

const select = appState => ({
  triggeredAnalysis: appState.geometry.triggeredAnalysis
});

export default connect(select)(styledNavbar);
