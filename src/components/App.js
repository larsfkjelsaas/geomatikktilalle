import React, { Component } from "react";

import AppLayout from "./AppLayout";
import Sidebar from "./menu/Sidebar";
import Navbar from "./menu/top/Navbar";
import Map from "./Map";
import locations from "../data/locations.json";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppLayout>
          <Navbar />
          <Sidebar />
          <Map location={locations.oslo} />
        </AppLayout>
      </div>
    );
  }
}

export default App;
