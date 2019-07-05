import React, { Component } from "react";
import "./NavigationBar.css";
import Button from "@material-ui/core/Button";
import Map from "./map/Map";

//TODO Implement with Material UI

const siteName = "Geomatikk for Alle";

class NavigationBarContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 0
    };
  }

  pages = [
    <div>
      <h1>Velkommen til {siteName}</h1>
      <p>
        Denne siden vil forsøke å lære deg litt om noen standardmuligheter til å
        gjøre analyseoperasjoner i et GIS.
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.nextPage()}
      >
        Klikk her når du er klar til å gå videre
      </Button>
    </div>,

    <div>
      Velkommen til side nr 2
      <Map />
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.previousPage()}
      >
        Tilbake{" "}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.nextPage()}
      >
        Neste side
      </Button>
    </div>
  ];

  nextPage() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }
  previousPage() {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }

  render() {
    return (
      <div className="navigationBar">
        <h1>{siteName}</h1>
        {this.pages[this.state.currentPage]}
      </div>
    );
  }
}

export default NavigationBarContainer;
