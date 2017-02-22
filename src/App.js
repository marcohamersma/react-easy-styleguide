import React, { Component } from 'react';
import Table from './components/Table';
import Button from './components/Button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>My Application</h1>
        <Table
          caption="Hello caption"
          thead={[ 'Name', 'Job']}
          data={[
            ['Marco', 'Programmer'],
            ['Dirk', 'Detective'],
            ['Batman', 'Detective'],
            ['Luke', 'Jedi']
          ]}
        />

        <Button type="success" label="This is a button"/>
        <Button type="default" label="This is another button"/>
      </div>
    );
  }
}

export default App;
