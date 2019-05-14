import React, { Component } from "react";
import chip from "../svg/chip.svg";
export default class ChipImg extends Component {
  state = { status: 0, name: "未启动" };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ status: nextProps.status, name: nextProps.name });
  }
  render() {
    var { name, status } = this.state;
    // eslint-disable-next-line default-case
    switch (status) {
      case 0:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>未启动</div>
          </div>
        );
      case 1:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>就绪</div>
          </div>
        );

      case 2:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>工作中</div>
          </div>
        );
      case 3:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>启动异常</div>
          </div>
        );
      case 4:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>启动中</div>
          </div>
        );
      case 5:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>关闭中</div>
          </div>
        );

      case 6:
        return (
          <div
            style={{
              flex: "0 1 auto",
              textAlign: "center",
              margin: window.innerWidth > 1400 ? "0 1.8rem" : "0 1.2rem"
            }}
          >
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              {name}
            </div>
            <div style={{ fontSize: "0.6rem" }}>不存在</div>
          </div>
        );
    }
  }
}
