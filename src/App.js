import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>My Application</h1>
        <Link to="/styleguide">Open the Styleguide</Link>
      </div>
    );
  }
}

export default App;
