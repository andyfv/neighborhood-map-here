import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './styles/errorModal.css';
import { clearError } from '../actions/errorActions';

class ErrorModal extends Component {

    componentDidUpdate() {
        // Focus on the modal-box if there is an error
        (this.props.error !== null) && (document.getElementById('modal-box').focus());
    }

    closeModal = () => {
        this.props.closeModal();
    }

    render() {
        return (
            (this.props.error !== null && (
                <div id = "modal">
                    <div id = "modal-box"
                        role = "dialog"
                        aria-labelledby = "error-message"
                        aria-modal = "true"
                        tabIndex = "1">
                        <button id = "close-modal"
                            tabIndex = "0"
                            onClick={this.closeModal}></button>
                        <div id = "modal-message-box" tabIndex="5">
                            <p id = "error-message">{this.props.error}</p>
                        </div>
                    </div>
                </div>
            ))
        )
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
}

const mapDispatchToProps = {
    closeModal: clearError
}

// Custom validator for null
ErrorModal.propTypes = {
    error: function (props, propName, componentName) {
        const propValue = props[propName]
        if (propValue === null) return 
        if(typeof propValue === 'string') return
        return new Error(`${componentName} only accepts null or string`)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorModal)