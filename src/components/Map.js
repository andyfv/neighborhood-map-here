import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/map.css';
import { mapLoadAndInit } from '../actions/mapActions';

class Map extends Component {

    componentDidMount() {
        mapLoadAndInit(this.props.location);
    }

    render() {
        return (
            <div id="map-container">
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        location: state.map.location,
        state: state
    }
}

const mapDispatchToProps = {
    //mapLoadAndInit
}

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Map);