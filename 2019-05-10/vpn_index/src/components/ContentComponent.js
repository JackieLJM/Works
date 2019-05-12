import React, { Component } from "react";
import { Col, Card, Button, Tabs, Icon } from "antd";
import FuncTable from "./FuncTable.js";
import QueueAnim from "rc-queue-anim";
const TabPane = Tabs.TabPane;
class ContentComponent extends Component {
  state = {
    isFPGASimple: true,
    isFPGAComplex: false,
    isGPUSimple: true,
    isGPUComplex: false
  };
  mouseover = e => {
    e.currentTarget.style = "margin:1rem;text-align:center;";
    e.currentTarget.children[0].style =
      "background: #6fd48c;color: white;border-bottom:1px solid #6fd48c";
    // console.log(e.currentTarget.getElementById("fpga"));
  };
  // mouseout = e => {
  //   // console.log(e.currentTarget);
  //   e.currentTarget.style = "margin:1rem;text-align:center;";
  //   e.currentTarget.children[0].style =
  //     "background: white;color: black;border-bottom:1px solid #E8E8E8";
  // };
  changeFPGASimpleTable = e => {
    // console.log(e.currentTarget);
    this.setState({ isFPGASimple: true }, function() {
      this.setState({ isFPGAComplex: false });
    });
  };
  changeFPGAComplexTable = e => {
    this.setState({ isFPGAComplex: true }, function() {
      this.setState({ isFPGASimple: false });
    });
  };

  render() {
    return (
      <div>
        <p
          style={{
            margin: "1rem",
            color: "#B9B9B9",
            fontSize: "1.5rem"
          }}
        >
          <a href="#fpga" name="fpga" style={{ color: "#B9B9B9" }}>
            {" "}
            FPGA
          </a>{" "}
          和{" "}
          <a href="#gpu" style={{ color: "#B9B9B9" }}>
            GPU
          </a>
        </p>
        <Card
          title={
            this.state.isFPGAComplex ? (
              <div style={{ fontSize: "1.1rem" }}>FPGA使用情况</div>
            ) : (
              <div style={{ fontSize: "1.1rem" }}>FPGA实时状态</div>
            )
          }
          hoverable={true}
          bordered={true}
          style={{
            margin: "1rem",
            textAlign: "center",
            marginTop: "3rem"
          }}
          onMouseOver={this.mouseover}
          onMouseOut={this.mouseout}
          actions={[
            <div
              style={{ marginRight: "-7rem" }}
              onClick={this.changeFPGASimpleTable}
            >
              <Icon type="double-left" />
              &nbsp;FPGA实时状态
            </div>,
            <div
              style={{ marginLeft: "-7rem" }}
              onClick={this.changeFPGAComplexTable}
            >
              <Icon type="double-right" />
              &nbsp;FPGA使用情况
            </div>
          ]}
        >
          {this.state.isFPGASimple ? (
            <QueueAnim delay="0" duration="1200">
              <FuncTable key="a" name="fgpa" />
            </QueueAnim>
          ) : null}

          {this.state.isFPGAComplex ? (
            <QueueAnim delay="0" duration="1200">
              <FuncTable key="b" complexTable={true} name="fgpa" />
            </QueueAnim>
          ) : null}
          <a name="gpu" />
        </Card>
      </div>
    );
  }
}
export default ContentComponent;
