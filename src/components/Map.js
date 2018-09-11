import React, { Component } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import './styles/Map.css';
import { initMap } from '../utils/HereMapsAPI';

class Map extends Component {
    state = {
        isMapLoaded: false,
        center: {
            lat: 42.688730,
            lng: 23.320168
        }
    }

    componentDidMount() {
        this.isMapLoaded();
    }

    isMapLoaded() {
        if (!this.state.isMapLoaded) {
            initMap(this.state.center)
            .then(this.setState({isMapLoaded: true}));
        }
    }

    render () {
        return (
            <div id="map-container">
                <SearchBar/>
                <List/>
            </div>
        )
    }
}

export default Map;