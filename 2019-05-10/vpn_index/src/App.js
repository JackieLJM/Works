import React, { Component } from "react";
// import QueueAnim from "rc-queue-anim";
import Index from "./components/index"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <Index/>
      </div>
    );
  }
}

export default App;
