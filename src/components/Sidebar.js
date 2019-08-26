import React from "react";
import styled from "styled-components";
import SidebarCategory from "./SidebarCategory";
import AnalysisPanel from "./AnalysisPanel";


const StyledOptions = styled.div`
  display: flex;
`;

const Sidebar = ({ className, analysisChoosen, analysisTriggered }) => {
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
      <AnalysisPanel />
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
