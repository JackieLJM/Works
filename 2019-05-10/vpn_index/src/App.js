import React, { Component } from "react";
import QueueAnim from "rc-queue-anim";
import HeaderComponent from "./components/HeaderComponent";
import ContentComponent from "./components/ContentComponent";
import FooterComponent from "./components/FooterComponent";
class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent key="a" />
        <QueueAnim
          delay={300}
          animConfig={[
            { opacity: [1, 0], translateY: [0, 50] },
            { opacity: [1, 0], translateY: [0, -50] }
          ]}
          className="queue-simple"
        >
          <ContentComponent key="b" />
          <FooterComponent key="c" />
        </QueueAnim>
      </div>
    );
  }
}

export default App;
