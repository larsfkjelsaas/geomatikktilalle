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
    var newLayers = newProps.layers;
    var prevLayers = prevProps.layers;

    //new layer, add it
    if (newLayers.length > prevLayers.length) {
      let layer = newLayers[0];
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
    //No new layers, can compare new and old props
    else {
      if (newProps.activeColor !== prevProps.activeColor) {
        newProps.selectedLayers.forEach(selectedLayerName => {
          let selectedLayer = newProps.layers.find(
            layer => layer.name === selectedLayerName
          );
          this.setColorOfLayer(selectedLayer);
        });
      }

      //Loop over layers to check for differences
      newProps.layers.forEach(layer => {
        this.updateVisibility(layer);
      });
    }

    //Delete layers marked for deletion
    if (newProps.layersToDelete.length > 0) {
      newProps.layersToDelete.forEach(layer => this.removeMapLayer(layer));
    }

    if (newProps.layerToMove >= 0) {
      this.updateLayerOrder(newProps.layerToMove);
    }
  }

  addPointLayer(layer) {
    let newLayer = this._map.addLayer({
      id: layer.name,
      type: "circle",
      source: {
        type: "geojson",
        data: layer.geometry
      },
      paint: { "circle-color": layer.color }
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
      paint: { "fill-color": layer.color, "fill-outline-color": "#000000" }
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

  setColorOfLayer(layer) {
    let colorVariable = "";
    if (layer.type === "point") {
      colorVariable = "circle-color";
    } else if (layer.type === "polygon") {
      colorVariable = "fill-color";
    }

    this._map.setPaintProperty(layer.name, colorVariable, layer.color);
  }

  updateLayerOrder(index) {
    let layers = this.props.layers;
    let layerToUpdateId = layers[index].name;
    let layerBeforeId;
    //If moved to the top of the list, don't draw it behind anything
    if (index === 0) {
      layerBeforeId = null;
    }
    //Else, move it to the spot behind the entry above it in the list
    else {
      layerBeforeId = layers[index - 1].name;
    }
    this._map.moveLayer(layerToUpdateId, layerBeforeId);
  }

  updateVisibility(layer) {
    console.log(this._map.getLayer(layer.name));
    var layerVisibility = layer.visible ? "visible" : "none";
    var visibility = this._map.setLayoutProperty(layer.name, 'visibility', layerVisibility);
    console.log(visibility);
    console.log("logic: " + layer.visible);
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
    selectedLayers: appState.geometry.selectedLayers,
    layers: appState.geometry.layers,
    layersToDelete: appState.geometry.layersToDelete,
    layerToMove: appState.geometry.layerToMove,
    activeColor: appState.geometry.activeColor
  };
};

const actions = {
  delete_finalize: geomatryFinalizeDeletion
};

export default connect(select, actions)(StyledMap);
