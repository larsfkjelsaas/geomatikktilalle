import React from "react";
import styled from "styled-components";

const Navbar = ({ className }) => {
  return <div className={className} />;
};

const styledNavbar = styled(Navbar)`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  background-color: #4e3a4c;
`;

export default styledNavbar;
