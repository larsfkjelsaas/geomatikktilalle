import React from "react";
import { Typography, Paper } from "@material-ui/core";
import styled from "styled-components";

const StyledTypography = styled(Typography)`
  margin: 10px;
`;

const ListElement = ({ className, title, content }) => {
  return (
    <div>
      <Paper className={className}>
        <StyledTypography className={className} variant="h5" component="h3">
          {title}
        </StyledTypography>
        <Typography component="p">{content}</Typography>
      </Paper>
    </div>
  );
};

const CategoryContent = ({ categoryItems }) => {
  return (
    <div>
      {categoryItems.map(item => (
        <ListElement
          key={item.title}
          title={item.title}
          content={item.description}
        />
      ))}
    </div>
  );
};

export default CategoryContent;
