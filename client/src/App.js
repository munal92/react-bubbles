import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BubblePage from "./components/BubblePage"
import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <PrivateRoute path="/bubblespage" component={BubblePage}/>  
        <Route exact path="/" component={Login} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
       </Switch>
      </div>
     
    </Router>
  );
}

export default App;
