import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import MyCalendar from "./Components/Schedule/MyCalendar";
import Notes from "./Components/Notes/Notes";

function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/Log-in" component={LogIn} />
          <Route path="/schedule" component={MyCalendar} />
          <Route path="/notes" component={Notes} />

          <Home />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
