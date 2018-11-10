import React, { Component } from 'react';
import Map from '../containers/Map';
import List from '../containers/List';
import SearchBar from '../containers/SearchBar';
import ErrorModal from '../containers/ErrorModal';

class App extends Component {

  render() {
    return (
      <div className="App">
        <ErrorModal/>
        <Map/>
        <SearchBar/>
        <List/>
      </div>
    );
  }
}

export default App;