
import './App.css';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/navbar';
import ProblemSpace from './components/problemSpace';
import Profile from './components/Profile'
import ContestSpace from './components/contestSpace';
import Problem from './components/problem';


const App = () => {
  const URL = "https://media.istockphoto.com/photos/middle-age-man-portrait-picture-id1285124274?b=1&k=20&m=1285124274&s=170667a&w=0&h=tdCWjbu8NxR_vhU3Tri7mZcfUH6WdcYWS1aurF4bbKI="
    return (
      <Router>
        <div className="App">
          <NavBar imageURL={URL}/>
          <Switch>
          <Route exact path="/">
              {/* <ProblemSpace /> Put signin or something for home page*/}
              <Sidebar />
            </Route>

          
            <Route exact path="/problems">
              <ProblemSpace />
            </Route>

            <Route exact path='/profile'>
              <Profile />
            </Route>

            <Route exact path='/contest'>
              <ContestSpace />
            </Route>
            <Route path='/problem/:id' component={Problem} />
        </Switch>
        </div>
      </Router>
    );
}

export default App;
