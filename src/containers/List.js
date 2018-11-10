import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './styles/List.css';
import { openInfoBubble } from '../actions/mapActions';

class List extends Component {
    elements = {
        list: null,
        showListButton: null
    }

    componentDidMount() {
        this.elements = {
            list: document.getElementsByClassName('list-wrapper')[0],
            showListButton: document.getElementsByClassName('toggle-list-open')[0]
        }
    }

    toggleList = () => {
        this.elements.list.classList.toggle('list-close');
    }

    toggleShowButton = () => {
        this.elements.showListButton.classList.toggle('list-close');
    }
        
    hideList = () => {
        this.toggleList();
        this.toggleShowButton();
        this.elements.list.tabIndex = -1;
        this.elements.showListButton.tabIndex = 0;
    }

    showList = () => {
        this.toggleShowButton();
        this.toggleList();
        this.elements.showListButton.tabIndex = -1;
        this.elements.list.tabIndex = 0;
    }

    // Invoke showInfoBubble(arrayIndex) to open InfoBubble
    showOnMap(evt) {
        this.props.showInfoBubble(evt.target.getAttribute('storeindex'));
        this.hideList();
    }

    render() {
        return (
            <React.Fragment>
                <button 
                    className="toggle-list-open list-close" 
                    tabIndex="-1"
                    aria-label="Show List"
                    onClick={this.showList}>
                    <p>Show Results</p>
                    {/* <svg className="show-icon" alt="Chevron Icon"></svg> */}
                </button>
                <aside className="list-wrapper">
                    <button 
                        id="toggle-list-close"
                        aria-label="hide list" 
                        onClick={this.hideList}>
                        {/* <svg className="collapse-icon" alt="Chevron Icon"></svg> */}
                        <p>Hide Results</p>
                    </button>
                    <div className="list-border">
                        <ul className="list" onClick={(e) => this.showOnMap(e)}>
                        {this.props.results.map((result, index) => 
                            (<li className="list-item" 
                                storeindex={index}
                                key={result.id}
                                tabIndex="0"
                                >{result.title}
                            </li>)   
                        )}
                        </ul>
                    </div>
                </aside>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        results: state.search.results,
        isListVisible: state.list.isListVisible
    }
}

const mapDispatchToProps = {
    showInfoBubble: openInfoBubble
}

List.propTypes = {
    results: propTypes.array.isRequired,
    showInfoBubble: propTypes.func.isRequired
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);