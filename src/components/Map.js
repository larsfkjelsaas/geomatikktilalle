import React, { Component } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import schools from "../data/grunnskoler.json";
import schoolIcon from "../icons/school.svg";
import buffer from "@turf/buffer";

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
    map.on("load", () => {
      let layer = {
        id: "schools",
        data: schools,
        icon: schoolIcon
      };
      this.addPointLayer(layer);
    });
   
  }

  getLayerId(layer) {
    return layer.id;
  }
  getLayerData(layer) {
    return layer.data;
  }
  addPointLayer(layer) {
    var layerId = this.getLayerId(layer);
    var layerData = this.getLayerData(layer);

    this.state.activeLayers = [...this.state.activeLayers, this._map.addLayer({
      "id": layerId,
      "type": "symbol",
      "source": {
        type: "geojson",
        data: layerData
      },
      "layout": {
        "icon-image": "harbor-15"

      },
      "paint": {}
    })];
  }

  addPolygonLayer(layer) {
    var layerId = this.getLayerId(layer);
    var layerData = this.getLayerData(layer);
    // var iconName = layerId + "icon";
    // this._map.addImage(iconName, laye-r.icon);
    var newLayer = this._map.addLayer({
      "id": layerId,
      "type": "fill",
      "source": {
        type: "geojson",
        data: layerData
      },
      "layout": {
        "fill-color": "#00ff00",
        "fill-opacity": 0.2
      },
      "paint": {}
    });
    
    this.setState(this.state.activeLayers = {...this.state.activeLayers, newLayer});
  }

  createBuffer(layer, value) {
    var buffered = buffer(layer, value);
    console.log(buffered);
    return buffered;
  }

  onBufferButtonClick(){
    var buffered = this.createBuffer(this.state.activeLayers[0], 50);
    this.addPolygonLayer(buffered);
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

export default StyledMap;
