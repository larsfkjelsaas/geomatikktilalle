import React from "react";
import styled from "styled-components";
import DatasetMenu from "./DatasetMenu";
import AnalysisMenu from "./AnalysisMenu";



const Sidebar = ({ className, analysisChoosen, analysisTriggered }) => {
  return (
    <div className={className}>
      <DatasetMenu>

      </DatasetMenu>
      <AnalysisMenu>
        
      </AnalysisMenu>
      
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
