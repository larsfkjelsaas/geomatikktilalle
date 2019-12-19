import React from "react";
import { CustomPicker, AlphaPicker } from "react-color";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  alphaDiv: {
    width: "100%",
    margin: "auto",
    position: "relative",
    marginTop: "20px"
  },
  alpha: {
    position: "relative"
  }
}));
const MyAlphaPicker = ({ color, onChange, ...props }) => {
  const classes = useStyles();

  return <AlphaPicker {...props} className={classes.alphaDiv} />;
};

export default CustomPicker(MyAlphaPicker);
