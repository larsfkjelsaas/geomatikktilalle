import React from "react";
import { SliderPicker } from "react-color";
import { selectColor } from "../../action-creators/actionCreator";
import { connect } from "react-redux";
import AlphaPicker from "./AlphaPicker";

const SliderColorPicker = ({ activeColor, selectColor }) => {
  return (
    <div>
      <SliderPicker
        color={activeColor}
        onChangeComplete={color => selectColor(color.hex)}
      />
      <AlphaPicker
        color={activeColor}
        onChange={color => selectColor(color.hex)}
      />
    </div>
  );
};

const select = appState => {
  return {
    activeColor: appState.geometry.activeColor
  };
};

const actions = {
  selectColor: selectColor
};

export default connect(select, actions)(SliderColorPicker);
