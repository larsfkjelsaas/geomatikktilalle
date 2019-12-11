import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CategoryContent from "./CategoryContent";
import Card from "../Card";

const SidebarCategory = ({ title, categoryItems }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      {/* <CategoryContent categoryItems={categoryItems} /> */}
      <Card
        title="Dataset"
        name="Skoler"
        origin="Created at 14:02"
        text="This was created by a buffer. Also, this text is very, very long"
      />
      <Card
        title="Dataset"
        name="Skoler"
        origin="Created at 14:02"
        text="This was created by a buffer. Also, this text is very, very long"
      />
    </div>
  );
};

export default SidebarCategory;
