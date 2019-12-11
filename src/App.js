import React, { Component } from "react";

import AppLayout from "./components/AppLayout";
import Sidebar from "./components/menu/Sidebar";
import Navbar from "./components/menu/Navbar";
import Map from "./components/Map";
import locations from "./data/locations.json";

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
