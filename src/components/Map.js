import React, { Component } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG9vbGF0ZSIsImEiOiJjamNraXM3cWMwdHJ4MnFwZ2tuOXdlM29tIn0.YCpu-_2IAVCvVJEEit8WGQ";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: props.location.lng,
      lat: props.location.lat,
      zoom: props.location.zoom
    };
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={el => (this.mapContainer = el)}
      />
    );
  }
}

const styledMap = styled(Map)`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
`;

export default styledMap;
