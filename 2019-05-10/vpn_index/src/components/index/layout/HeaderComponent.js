import React, { Component } from "react";
import { Col } from "antd";
import TaskNumberPieCard from "../element/TaskNumberPieCard";
class HeaderComponent extends Component {
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
          系统任务面板
        </p>
        <Col>
          <TaskNumberPieCard
            icon={"profile"}
            color={"#01C1DE"}
            title={"任务总数"}
            number={700}
          />
        </Col>
      </div>
    );
  }
}
export default HeaderComponent;
