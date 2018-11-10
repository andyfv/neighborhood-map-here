import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/SearchBar.css';
import { fetchPlaces } from '../actions/searchActions';
import { _debounce } from '../utils/debounce';

class SearchBar extends Component {
    state = {
        query: this.props.defaultQuery
    }
    handleQueryChange = (query) => {
        this.props.searchPlaces(query);
    }

    clearInput = () => {
        this.setState({query: ''})
    }

    render() {
        let debounce = _debounce((query) => {this.handleQueryChange(query)}, 300);
        return ( 
            <form className = "search-bar" role = "search" onSubmit={(e) => e.preventDefault()}>
                <svg id = "search-icon" / >
                <div className = "search-input-wrapper" >
                    <input 
                        className = "search-input"
                        type = "text"
                        aria-label = "search field"
                        placeholder = "Search"
                        value = {this.props.query}
                        onChange = {(e) => debounce(e.target.value)}
                    />
                    <button id = "delete-button"
                        aria-label = "clear search field"
                        onClick = {this.clearInput}>
                    </button>
                </div>
            </form>
        )
    }
}

SearchBar.propTypes = {
    defaultQuery: PropTypes.string.isRequired,
    searchPlaces: PropTypes.func.isRequired
} 

const mapStateToProps = (state) => {
    return {
        defaultQuery: state.search.defaultQuery
    }
}

const mapDispatchToProps = {
    searchPlaces: fetchPlaces
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);