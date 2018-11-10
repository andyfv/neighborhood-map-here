import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './styles/map.css';
import { fetchPlaces } from '../actions/searchActions';
import { mapLoadAndInit, openInfoBubble } from '../actions/mapActions';
import { MarkerGroup, addMarker } from '../utils/HereMapsAPI';

// Get data from Foursquare, Tripadvisor 
class Map extends Component {

    // @onTapEventListener - opens InfoBubble on 'tap'
    onTapEventListener = () => {
        MarkerGroup.addEventListener('tap', (evt) => {
            this.props.showInfoBubble(evt.target.getData())
        }, {passive: true});
    }

    // Initializing and fetching default results
    componentDidMount() {
        this.props.mapLoadAndInit(this.props.location)
        .then(() => this.props.fetchPlaces())
        .then(() => this.onTapEventListener())
    }

    render() {
        (this.props.results != null) && 
            this.props.results.forEach((result,index) => addMarker(result,index))
        
        return (
            <div id="map-container">
                {(!this.props.isMapLoaded) &&
                    <h1 className='loading-message'>
                        Loading...
                    </h1>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isMapLoaded: state.map.isMapLoaded,
        location: state.map.location,
        results: state.search.results
    }
}

const mapDispatchToProps = {
    fetchPlaces: fetchPlaces,
    mapLoadAndInit: mapLoadAndInit,
    showInfoBubble: openInfoBubble
}

Map.propTypes = {
    isMapLoaded: propTypes.bool.isRequired,
    location: propTypes.object.isRequired,
    results: propTypes.array.isRequired,
    fetchPlaces: propTypes.func.isRequired,
    mapLoadAndInit: propTypes.func.isRequired,
    showInfoBubble: propTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);