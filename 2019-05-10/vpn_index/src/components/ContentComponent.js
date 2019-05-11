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
      <div>
        <p
          style={{
            margin: "1rem",
            color: "#B9B9B9",
            fontSize: "1.5rem"
          }}
        >
          FPGA 和 GPU
        </p>
        <Card
          title={
            this.state.isFPGAComplex ? (
              <div style={{ fontSize: "1.1rem" }}>FPGA详细参数</div>
            ) : (
              <div style={{ fontSize: "1.1rem" }}>FPGA概况</div>
            )
          }
          id="card"
          hoverable={true}
          bordered={true}
          style={{ margin: "1rem", textAlign: "center", marginTop: "3rem" }}
          onMouseOver={this.mouseover}
          onMouseOut={this.mouseout}
          actions={[
            <div
              style={{ marginLeft: "20rem" }}
              onClick={this.changeFPGASimpleTable}
            >
              <Icon type="double-left" />
              &nbsp;FPGA概况
            </div>,
            <div
              style={{ marginRight: "20rem" }}
              onClick={this.changeFPGAComplexTable}
            >
              <Icon type="double-right" />
              &nbsp;FPGA详细参数
            </div>
          ]}
        >
          {this.state.isFPGASimple ? (
            <QueueAnim delay="0" duration="1200">
              <FuncTable key="a" />
            </QueueAnim>
          ) : null}

          {this.state.isFPGAComplex ? (
            <QueueAnim delay="0" duration="1200">
              <FuncTable key="b" complexTable={true} />
            </QueueAnim>
          ) : null}
        </Card>
        <Card
          title={<div style={{ fontSize: "1.1rem" }}>GPU概况</div>}
          hoverable={true}
          bordered={true}
          style={{ margin: "1rem", textAlign: "center", marginTop: "3rem" }}
          onMouseOver={this.mouseover}
          onMouseOut={this.mouseout}
          actions={[
            <div
              style={{ marginLeft: "20rem" }}
              onClick={this.changeGPUSimpleTable}
            >
              <Icon type="double-left" />
              &nbsp;GPU概况
            </div>,
            <div
              style={{ marginRight: "20rem" }}
              onClick={this.changeGPUComplexTable}
            >
              <Icon type="double-right" />
              &nbsp;GPU详细参数
            </div>
          ]}
        >
          {this.state.isGPUSimple ? (
            <QueueAnim delay="0" duration="1200">
              <FuncTable key="a" />
            </QueueAnim>
          ) : null}

          {this.state.isGPUComplex ? (
            <QueueAnim delay="0" duration="1200">
              <FuncTable key="b" complexTable={true} />
            </QueueAnim>
          ) : null}
        </Card>
      </div>
    );
  }
}
export default ContentComponent;
