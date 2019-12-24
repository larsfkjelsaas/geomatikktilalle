import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {
  analysisChoosen,
  geometryCreateNew,
  analysisTriggered
} from "../../action-creators/actionCreator";
import NewFileMenu from "./NewFileMenu";
import DatasetMenu from "./DatasetMenu";
import AnalysisMenu from "./AnalysisMenu";
import ColorMenu from "./ColorMenu";
import schools from "../../data/videregaaende.json";

const Sidebar = ({
  className,
  analysisChoosen,
  geometryCreateNew,
  analysisTriggered
}) => {
  return (
    <div className={className}>
      <Button onClick={() => analysisChoosen("Buffer")}>Choose buffer</Button>
      <Button onClick={() => geometryCreateNew(schools)}>
        Create geometry
      </Button>
      <Button onClick={() => analysisTriggered(200)}>Trigger</Button>
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
`;

const select = appState => {
  return {
    currentAnalysis: appState.currentAnalysis
  };
};
const actions = {
  analysisChoosen: analysisChoosen,
  geometryCreateNew: geometryCreateNew,
  analysisTriggered: analysisTriggered
};

export default connect(select, actions)(styledSidebar);
