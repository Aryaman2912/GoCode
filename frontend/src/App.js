
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Drawer from './components/Drawer';
import { createBrowserHistory } from 'history';


const App = (props) => {
  // const URL = "https://media.istockphoto.com/photos/middle-age-man-portrait-picture-id1285124274?b=1&k=20&m=1285124274&s=170667a&w=0&h=tdCWjbu8NxR_vhU3Tri7mZcfUH6WdcYWS1aurF4bbKI="
  return (
    <Router history={createBrowserHistory()}>
      <Drawer />
    </Router>
  );
}

export default App;
