import React from "react";
import styled from "styled-components";

import NewFileMenu from "./new/NewFileMenu";
import DatasetMenu from "./layer/DatasetMenu";
import AnalysisMenu from "./analysis/AnalysisMenu";
import ColorMenu from "./color/ColorMenu";

const Sidebar = ({ className }) => {
  return (
    <div className={className}>
      <NewFileMenu />
      <DatasetMenu />
      <AnalysisMenu />
      <ColorMenu />
    </div>
  );
};

const styledSidebar = styled(Sidebar)`
  grid-column: 1;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: #4e3a4c;
  overflow: auto;
`;

export default styledSidebar;
