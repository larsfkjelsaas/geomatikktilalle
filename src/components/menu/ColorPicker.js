import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SliderColorPicker from "./SliderColorPicker";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: "80%",
    margin: "auto",
    marginTop: "20px"
  }
}));

const ColorPicker = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <SliderColorPicker />
    </Paper>
  );
};

export default ColorPicker;
