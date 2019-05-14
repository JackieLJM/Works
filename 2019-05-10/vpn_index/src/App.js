import React, { Component } from "react";
import QueueAnim from "rc-queue-anim";
import HeaderComponent from "./components/HeaderComponent";
import ContentComponent from "./components/ContentComponent";
import FooterComponent from "./components/FooterComponent";
import ContentSecComponent from "./components/ContentSecComponent";
class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent key="a" />

        <ContentComponent key="b" />

        <ContentSecComponent key="c" />
        <FooterComponent key="d" />
      </div>
    );
  }
}

export default App;
