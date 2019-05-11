import React, { Component } from "react";
import { Card, Icon } from "antd";
import "./FooterComponent.css";
class FooterComponent extends Component {
  backtop = e => {
    // console.log(e);
    // window.scrollTo(0, 0);
    (function smoothscroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    })();
  };
  render() {
    return (
      <div>
        <Card
          style={{ margin: "1rem", textAlign: "center" }}
          onClick={this.backtop}
        >
          {/* <BackTop> */}
          <div id="backtop">
            <Icon type="caret-up" />
            &nbsp;
            <div style={{ display: "inline" }}>回到顶部</div>
          </div>
          {/* </BackTop> */}
        </Card>
      </div>
    );
  }
}
export default FooterComponent;
