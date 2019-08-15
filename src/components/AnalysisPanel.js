import React from "react";
import styled from "styled-components";
import SplitButton from "./SplitButton";
import { analysisChoosen, analysisTriggered } from "../action-creators/actionCreator";
import { connect } from "react-redux";
const StyledOptions = styled.div`
  display: flex;
`;

const AnalysisPanel = ({ 
  currentAnalysis, 
  analysisChoosen, 
  analysisTriggered, 
  ...props }) => {
  const operations = [
    {
      name: "Buffer",
      onButtonClick: () => onSplitButtonClick("Buffer"),
      subOperations: [
        {
          name: "Hello",
          onButtonClick: () => analysisTriggered(currentAnalysis)
        },
        {
          name: "Hei",
          onButtonClick: () => analysisTriggered(currentAnalysis)
        }
      ]
    },
    {
      name: "Intersection",
      onButtonClick: () => onSplitButtonClick("Intersection"),
      subOperations: [
        {
          name: "Hei",
          onButtonClick: () => alert("Hello intersection")
        },
        {
          name: "Hello",
          onButtonClick: () => alert("Hei intersection 2")
        }
      ]
    }
  ];
  const [activeOperation, setActiveOperation] = React.useState(operations[0]);
  const onSplitButtonClick = buttonName => {
    if (buttonName === "Buffer") {
      setActiveOperation(operations[0]);
      analysisChoosen(buttonName);
    } else if (buttonName === "Intersection") {
      setActiveOperation(operations[1]);
      analysisChoosen(buttonName);
    } else {
      alert("Not a valid button name");
    }
  };
  return (
    <StyledOptions>
      <SplitButton options={operations} />
      <SplitButton options={activeOperation.subOperations} />
    </StyledOptions>
  );
};

const select = appState => {
  return {
    currentAnalysis: appState.currentAnalysis
  };
};
const actions = {
  analysisChoosen: analysisChoosen,
  analysisTriggered: analysisTriggered
};

const connector = connect(
  select,
  actions
);

export default connector(AnalysisPanel);
