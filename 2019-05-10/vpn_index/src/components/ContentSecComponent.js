import React, { Component } from "react";
import { Col, Card, Button, Tabs, Icon } from "antd";
import FuncTable from "./FuncTable.js";
import QueueAnim from "rc-queue-anim";
const TabPane = Tabs.TabPane;
class ContentSecComponent extends Component {
  state = {
    isGPUSimple: true,
    isGPUComplex: false,
    gpu: true
  };
  mouseover = e => {
    e.currentTarget.style = "margin:1rem;text-align:center;margin-top:2rem";
    e.currentTarget.children[0].style =
      "background: #6fd48c;color: white;border-bottom:1px solid #6fd48c";

    e.currentTarget.children[0].children[0].children[0].children[0].style =
      "font-size:1.1rem;color:white";

    // console.log(e.currentTarget.getElementById("fpga"));
  };
  showbody = e => {
    this.setState({ gpu: !this.state.gpu });
  };
  // mouseout = e => {
  //   // console.log(e.currentTarget);
  //   e.currentTarget.style = "margin:1rem;text-align:center;";
  //   e.currentTarget.children[0].style =
  //     "background: white;color: black;border-bottom:1px solid #E8E8E8";
  // };
  changeGPUSimpleTable = e => {
    // console.log(e.currentTarget);
    this.setState({ isGPUSimple: true }, function() {
      this.setState({ isGPUComplex: false });
    });
  };
  changeGPUComplexTable = e => {
    this.setState({ isGPUComplex: true }, function() {
      this.setState({ isGPUSimple: false });
    });
  };
  render() {
    return (
      <div style={{ marginBottom: "20rem" }}>
        {this.state.gpu ? (
          <Card
            title={
              this.state.isGPUComplex ? (
                <a
                  style={{ fontSize: "1.1rem", color: "black" }}
                  onClick={this.showbody}
                  href="#gpu"
                >
                  GPU使用情况
                </a>
              ) : (
                <a
                  style={{ fontSize: "1.1rem", color: "black" }}
                  onClick={this.showbody}
                  href="#gpu"
                >
                  GPU实时状态
                </a>
              )
            }
            hoverable={true}
            bordered={true}
            style={{
              margin: "1rem",
              textAlign: "center",
              marginTop: "2rem"
            }}
            onMouseOver={this.mouseover}
            onMouseOut={this.mouseout}
            // actions={[
            //   <div
            //     style={{ marginRight: "-7rem" }}
            //     onClick={this.changeGPUSimpleTable}
            //   >
            //     <Icon type="double-left" />
            //     &nbsp;GPU使用情况
            //   </div>,
            //   <div
            //     style={{ marginLeft: "-7rem" }}
            //     onClick={this.changeGPUComplexTable}
            //   >
            //     <Icon type="double-right" />
            //     &nbsp;GPU实时状态
            //   </div>
            // ]}
          >
            {this.state.isGPUSimple ? (
              <QueueAnim delay="0" duration="1200">
                <FuncTable key="c" name={"gpu"} />
              </QueueAnim>
            ) : null}

            {this.state.isGPUComplex ? (
              <QueueAnim delay="0" duration="1200">
                <FuncTable key="d" complexTable={true} name={"gpu"} />
              </QueueAnim>
            ) : null}
          </Card>
        ) : (
          <Card
            title={
              this.state.isGPUComplex ? (
                <a
                  style={{ fontSize: "1.1rem", color: "black" }}
                  onClick={this.showbody}
                  href="#gpu"
                >
                  GPU使用情况
                </a>
              ) : (
                <a
                  style={{ fontSize: "1.1rem", color: "black" }}
                  onClick={this.showbody}
                  href="#gpu"
                >
                  GPU实时状态
                </a>
              )
            }
            hoverable={true}
            bordered={true}
            style={{
              margin: "1rem",
              textAlign: "center",
              marginTop: "2rem"
            }}
            onMouseOver={this.mouseover}
            onMouseOut={this.mouseout}
            bodyStyle={{ display: "none" }}
          />
        )}
      </div>
    );
  }
}
export default ContentSecComponent;
