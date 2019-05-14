import React, { Component } from "react";
import { Icon } from "antd";
class IconImg extends Component {
  render() {
    var { status } = this.props;
    if (status === true) {
      return (
        <div>
          <Icon
            type="check-circle"
            style={{ fontSize: "1.3rem", verticalAlign: "middle" }}
            theme="twoTone"
            twoToneColor="#52c41a"
          />
          &nbsp;&nbsp;
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: "1rem"
            }}
          >
            已启动
          </div>
        </div>
      );
    } else if (status === false) {
      return (
        <div>
          <Icon
            type="poweroff"
            style={{
              color: "red",
              fontSize: "1.3rem",
              verticalAlign: "middle"
            }}
          />
          &nbsp;&nbsp;
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: "1rem"
            }}
          >
            已关闭
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Icon
            type="sync"
            spin
            style={{
              fontSize: "1.3rem",
              verticalAlign: "middle"
            }}
          />
          &nbsp;&nbsp;
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: "1rem"
            }}
          >
            启动中
          </div>
        </div>
      );
    }
  }
}

export default IconImg;
