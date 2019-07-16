import React from "react";
import styled from "styled-components";
import SplitButton from "./SplitButton";

const StyledOptions = styled.div`
  display: flex;
`;

const AnalysisPanel = props => {
    const operations = [
        {
          name: "Buffer",
          onButtonClick: () => onSplitButtonClick("Buffer"),
          subOperations: [
            {
              name: "Hello",
              onButtonClick: () => alert("Hello buffer")
            },
            {
              name: "Hei",
              onButtonClick: () => alert("Hei buffer 2")
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
        } else if (buttonName === "Intersection") {
          setActiveOperation(operations[1]);
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

export default AnalysisPanel;
