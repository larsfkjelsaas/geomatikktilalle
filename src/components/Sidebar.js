import React from "react";
import styled from "styled-components";
import SidebarCategory from "./SidebarCategory";
import { Button } from "@material-ui/core";

const Sidebar = ({ className }) => {
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
      <Button onClick={() => alert("click")}>Do stuff</Button>
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
