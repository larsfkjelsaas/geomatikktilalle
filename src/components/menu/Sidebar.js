import React from "react";
import styled from "styled-components";
import DatasetMenu from "./DatasetMenu";
import AnalysisMenu from "./AnalysisMenu";
import Button from "@material-ui/core/Button";
import AnalysisPanel from "./AnalysisPanel";
import {
  analysisChoosen,
  geometryCreateNew,
  analysisTriggered
} from "../../action-creators/actionCreator";
import { connect } from "react-redux";
import schools from "../../data/videregaaende.json";
import ColorMenu from "./ColorMenu";

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
      <DatasetMenu></DatasetMenu>
      <AnalysisMenu></AnalysisMenu>
      <ColorMenu></ColorMenu>
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

const connector = connect(select, actions);

export default connector(styledSidebar);
