import React from "react";
import { SliderPicker } from "react-color";

export default class SliderColorPicker extends React.Component {
  state = {
    background: "#001eff"
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <SliderPicker
        color={this.state.background}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}
