import React from "react";
import styled from "styled-components";
import SidebarCategory from "./SidebarCategory";
import SplitButton from "./SplitButton";
import AnalysisPanel from "./AnalysisPanel";

const StyledOptions = styled.div`
  display: flex;
`



const Sidebar = ({ className }) => {
  const operations = [
    {
      name: "Buffer",
      onButtonClick:() => onSplitButtonClick("Buffer"),
      subOperations: [
        {
          name: "Hello",
          onButtonClick:() => alert("Hello buffer")
        },
        {
          name: "Hei",
          onButtonClick:() => alert("Hei buffer 2")
        }
      ]
    }, 
    {
      name: "Intersection",
      onButtonClick:() => onSplitButtonClick("Intersection"),
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

    }];
  
  const [activeOperation, setActiveOperation] = React.useState(operations[0]);


  const onSplitButtonClick = (buttonName) => {
    if(buttonName === "Buffer"){
      setActiveOperation(operations[0]);
    }
    else if(buttonName === "Intersection"){
      setActiveOperation(operations[1]);
    }
    else {
      alert("Not a valid button name");
    }
  }
  
  
    console.log(operations);
  return (
    <div className={className}>
      <SidebarCategory
        title="Datasett"
        categoryItems={[{ title: "Oslo" }, { title: "Trondheim" }]}
      />{" "}
      <SidebarCategory
        title="Operasjoner"
        categoryItems={[
          {
            title: "Buffer",
            subtitle: "Create a buffer around a geometry",
            details: "More details on buffers to come"
          },
          {
            title: "intersection",
            subtitle: "Find the intersection between two different geometries",
            details: "More details on intersections to come"
          }
        ]}
      />{" "}
      <AnalysisPanel></AnalysisPanel>
    </div>
  );
};



const styledSidebar = styled(Sidebar)`
  grid-column: 1;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: #4e3a4c;
`;

export default styledSidebar;
