import React, { Component } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import { geomatryFinalizeDeletion } from "../action-creators/actionCreator";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG9vbGF0ZSIsImEiOiJjamNraXM3cWMwdHJ4MnFwZ2tuOXdlM29tIn0.YCpu-_2IAVCvVJEEit8WGQ";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: props.location.lng,
      lat: props.location.lat,
      zoom: props.location.zoom,
      activeLayers: []
    };
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this._map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });
    var map = this._map;
    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  componentDidUpdate(prevProps) {
    var newProps = this.props;
    var layers = newProps.layers;

    if (layers.length > prevProps.layers.length) {
      let layer = layers[layers.length - 1];
      switch (layer.type) {
        case "point":
          this.addPointLayer(layer);
          break;
        case "polygon":
          this.addPolygonLayer(layer);
          break;
        default:
          console.log("invalid layer type");
          break;
      }
    }
    if (newProps.layersToDelete.length > 0) {
      newProps.layersToDelete.forEach(layer => this.removeMapLayer(layer));
    }
  }

  addPointLayer(layer) {
    let newLayer = this._map.addLayer({
      id: layer.name,
      type: "symbol",
      source: {
        type: "geojson",
        data: layer.geometry
      },
      layout: {
        "icon-image": "harbor-15"
      },
      paint: {}
    });

    this.setState({
      activeLayers: [...this.state.activeLayers, newLayer]
    });
  }

  addPolygonLayer(layer) {
    var newLayer = this._map.addLayer({
      id: layer.name,
      type: "fill",
      source: {
        type: "geojson",
        data: layer.geometry
      },
      // layout: {
      //   "fill-color": "#00ff00",
      //   "fill-opacity": 0.2
      // },
      paint: {}
    });

    this.setState({
      activeLayers: [...this.state.activeLayers, newLayer]
    });
  }

  removeMapLayer(layerToDelete) {
    //check whether delete list is stale
    if (!this._map.getSource(layerToDelete.name)) {
      return;
    }

    this._map.removeLayer(layerToDelete.name);
    this._map.removeSource(layerToDelete.name);
    this.props.delete_finalize();
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

const StyledMap = styled(Map)`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 4;
`;

const select = appState => {
  return {
    selectedLayer: appState.geometry.selectedLayer,
    layers: appState.geometry.layers,
    layersToDelete: appState.geometry.layersToDelete
  };
};

const actions = {
  delete_finalize: geomatryFinalizeDeletion
};

export default connect(select, actions)(StyledMap);
