import React, { Component } from "react";
// import QueueAnim from "rc-queue-anim";
import HeaderComponent from "./layout/HeaderComponent";
import ContentComponent from "./layout/ContentComponent";
import FooterComponent from "./layout/FooterComponent";
import ContentSecComponent from "./layout/ContentSecComponent";
class Index extends Component {
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

export default Index;
