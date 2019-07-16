import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import Sidebar from "../components/Sidebar";
import SidebarCategory from "../components/SidebarCategory";
import CategoryContent from "../components/CategoryContent";
import SplitButton from "../components/SplitButton";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add("with new text", () => (
    <Button onClick={action("clicked")}>Hello button nr 2</Button>
  ));

const categoryItems = [
  {
    title: "Buffer",
    subtitle: "Create a buffer around a geometry",
    details: "More details on buffers to come"
  },
  {
    title: "Intersection",
    subtitle: "Find the intersection between two different geometries",
    details: "More details on intersections to come"
  }
];

const options = ["Buffer", "Intersection", "Rebase and merge"];

storiesOf("Sidebar", module)
  .add("Full sidebar", () => <Sidebar />)
  .add("Head of category", () => (
    <SidebarCategory title="Hello" categoryItems={categoryItems} />
  ))
  .add("Category content line", () => (
    <CategoryContent categoryItems={categoryItems} />
  ))
  .add("Split button", () => (
    <SplitButton
      defaultOptionIndex={0}
      options={options}
      disabledOptions={[1]}
    />
  ));

storiesOf("Navbar", module)
    .add("Text", () => <h1>Hello world</h1>);
