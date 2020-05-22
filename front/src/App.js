import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import MyCalendar from "./Components/Schedule/MyCalendar";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/Log-in" component={LogIn} />
          <Route path="/schedule" component={MyCalendar} />

          <Home />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
