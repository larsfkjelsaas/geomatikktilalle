import React from "react";
import styled from "styled-components";
import DatasetMenu from "./DatasetMenu";
import AnalysisMenu from "./AnalysisMenu";
import Button from "@material-ui/core/Button";
import AnalysisPanel from "./AnalysisPanel";
import {
  analysisChoosen,
  geometryCreateNew
} from "../action-creators/actionCreator";
import { connect } from "react-redux";
import schools from "../data/videregaaende.json";

const Sidebar = ({ className, analysisChoosen, geometryCreateNew }) => {
  return (
    <div className={className}>
      <DatasetMenu></DatasetMenu>
      <AnalysisMenu></AnalysisMenu>
      <AnalysisPanel></AnalysisPanel>
      <Button onClick={() => analysisChoosen("Buffer")}>Buffer</Button>
      <Button onClick={() => geometryCreateNew(schools)}>
        Create geometry
      </Button>
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
  geometryCreateNew: geometryCreateNew
};

const connector = connect(select, actions);

export default connector(styledSidebar);
