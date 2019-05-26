import React, { Component } from "react";
import { Modal, Card, Statistic, Icon } from "antd";
import "./Fan.css";
import fan from "../svg/fan.svg";
import { post, get } from "../api";
export default class Fan extends Component {
  state = {
    data: [{ fan: [0, 0, 0, 0], ip: "192.168.101.237", deviceNo: 1 }],
    success: true
  };
  componentDidMount() {
    if (this.props.fanstatus === undefined) {
      get(
        `/monitor/fan/status?deviceNo=${this.props.deviceNo}&ip=${
        this.props.ip
        }`
      )
        .then(data => {
          if (data.data !== undefined) {
            if (data.msg === "系统错误") {
              return
            }
            this.setState({ data: data.data });
          }
        })
        .catch(err => { });
    } else {
      // console.log(this.props.fanstatus);
      if (this.props.fanstatus === "在线") {
        this.setState({ data: [{ fan: [1, 1, 1, 1] }] });
      } else if (this.props.fanstatus === "离线") {
        this.setState({ data: [{ fan: [0, 0, 0, 0] }] });
      }
    }
  }
  render() {
    if (this.state.data[0] !== undefined) {
      var data = this.state.data;
      var fanarr = data[0].fan;
    } else {
      data = [{ fan: [1, 0, 1, 0], ip: "192.168.101.237", deviceNo: 1 }];
      fanarr = data[0].fan;
    }
    return (
      <Card
        title={<div style={{ marginTop: "-0.3rem" }}>风扇具体情况</div>}
        headStyle={{
          paddingTop: "-1rem",
          // fontSize: "1rem",
          height: "1px",
          borderRadius: "0.5rem 0.5rem 0 0",
          color: "white",
          background: "#2C84D0"
        }}
        style={{ marginTop: "1rem", borderRadius: "0.5rem" }}
      >
        <div style={{ display: "flex", margin: "0 3rem" }}>
          <div style={{ flex: "1", textAlign: "center" }}>
            {fanarr[0] === 1 ? (
              <img src={fan} className="fan-logo" style={{ height: "4rem" }} />
            ) : (
                <img src={fan} style={{ height: "4rem" }} />
              )}
            <div style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
              风扇一
            </div>
            {fanarr[0] === 1 ? (
              <div style={{ fontSize: "0.85rem" }}>转速正常</div>
            ) : (
                <div style={{ fontSize: "0.85rem" }}>停止运转</div>
              )}
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            {fanarr[1] === 1 ? (
              <img src={fan} className="fan-logo" style={{ height: "4rem" }} />
            ) : (
                <img src={fan} style={{ height: "4rem" }} />
              )}
            <div style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
              风扇二
            </div>
            {fanarr[1] === 1 ? (
              <div style={{ fontSize: "0.85rem" }}>转速正常</div>
            ) : (
                <div style={{ fontSize: "0.85rem" }}>停止运转</div>
              )}
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            {fanarr[2] === 1 ? (
              <img src={fan} className="fan-logo" style={{ height: "4rem" }} />
            ) : (
                <img src={fan} style={{ height: "4rem" }} />
              )}
            <div style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
              风扇三
            </div>
            {fanarr[2] === 1 ? (
              <div style={{ fontSize: "0.85rem" }}>转速正常</div>
            ) : (
                <div style={{ fontSize: "0.85rem" }}>停止运转</div>
              )}
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            {fanarr[3] === 1 ? (
              <img src={fan} className="fan-logo" style={{ height: "4rem" }} />
            ) : (
                <img src={fan} style={{ height: "4rem" }} />
              )}
            <div style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
              风扇四
            </div>
            {fanarr[3] === 1 ? (
              <div style={{ fontSize: "0.85rem" }}>转速正常</div>
            ) : (
                <div style={{ fontSize: "0.85rem" }}>停止运转</div>
              )}
          </div>
        </div>
      </Card>
    );
  }
}
