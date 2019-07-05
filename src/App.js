import React, { Component } from "react";

import AppLayout from "./components/AppLayout";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import { styled } from "@material-ui/styles";

const locations = {
  trondheim: {
    lng: 10.4,
    lat: 63.42,
    zoom: 12.3
  },
  oslo: {
    lng: 10.7445,
    lat: 59.9225,
    zoom: 12.12
  }
};

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
