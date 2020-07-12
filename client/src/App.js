import React, { Component } from 'react';
import './App.css';
import {Sidebar} from './containers/Sidebar'
import {MessageList} from "./containers/MessageList"
import {AddMessage} from './containers/AddMessage'

class App extends Component {
  render() {
    return (
      <div id="container">
        <aside id = "sidebar"><Sidebar/></aside>
        <section id="main">
        <section id= "messages-list"><MessageList/></section>
        <section id= "new-message"><AddMessage/></section>
        </section>
      </div>
    );
  }
}

export default App;
