import React, { Component } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import './styles/Map.css';
import { loadMap } from '../HereAPI/HereMapsAPI';
import { APP_ID, APP_CODE } from '../data/credentials';

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
            loadMap()
            .then(this.initMap.bind(this, this.state.center))
            .then(this.setState({isMapLoaded: true}));
        }
    }

    initMap() {
        let platform = new window.H.service.Platform({
            'app_id': APP_ID,
            'app_code': APP_CODE
        });

        let mapTypes = platform.createDefaultLayers();
        
        let map = new window.H.Map(
            document.getElementById('map-container'),
            mapTypes.normal.map, {
                zoom: 14,
                center: this.state.center
            }
        );

        let mapEvents = new window.H.mapevents.MapEvents(map);
        let behavior = new window.H.mapevents.Behavior(mapEvents);

        window.addEventListener('resize', () => map.getViewPort().resize());
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