import React, {Component} from 'react'
import {render} from 'react-dom'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoidG9vbGF0ZSIsImEiOiJjamNraXM3cWMwdHJ4MnFwZ2tuOXdlM29tIn0.YCpu-_2IAVCvVJEEit8WGQ';

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

class Application extends Component {
    constructor(props) {
      super(props);
      this.state = locations.oslo;
      
    }
  
    componentDidMount() {
      const { lng, lat, zoom } = this.state;
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [lng, lat],
        zoom
      });
  
      map.on('move', () => {
        const { lng, lat } = map.getCenter();
  
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    }
  
    render() {
      const { lng, lat, zoom } = this.state;
      return (
        <div>
          <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
            <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          </div>
          <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        </div>
      );
    }
  }
  
  render(<Application />, document.getElementById('app'));
  export default Application;