import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Card, Divider, Button, Modal, Input } from "antd";
import CountUp from "react-countup";
import TaskPie from "./TaskPie";
import { get } from "../api";
// import { height } from "window-size";
const Search = Input.Search;
class TaskNumberPieCard extends Component {
  // createTask = () => {};
  state = { searchVisible: false, delVisible: false, number: 0 };
  // searchTask = () => {
  //   this.setState({
  //     searchVisible: true
  //   });
  // };

  // handleSearchOk = e => {
  //   console.log(e);
  //   this.setState({
  //     searchVisible: false
  //   });
  // };

  // handleSearchCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     searchVisible: false
  //   });
  // };

  // deleteTask = () => {
  //   this.setState({
  //     delVisible: true
  //   });
  // };
  // handleDelOk = e => {
  //   console.log(e);
  //   this.setState({
  //     delVisible: false
  //   });
  // };

  // handleDelCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     delVisible: false
  //   });
  // };
  componentDidMount() {
    get("/monitor/task/total").then(data => {
      this.setState({ number: data });
    });
  }
  render() {
    const { icon, color, title, number, countUp } = this.props;
    return (
      <Card
        bordered={true}
        bodyStyle={{ padding: 10 }}
        style={{ margin: "1rem" }}
        hoverable={true}
      >
        {/* <Modal
          title="查询任务"
          visible={this.state.searchVisible}
          onOk={this.handleSearchOk}
          onCancel={this.handleSearchCancel}
          okText="确定"
          cancelText="取消"
        >
          <Search
            placeholder="输入要查询的任务"
            enterButton="搜索"
            size="large"
            onSearch={value => {
              this.setState({
                searchVisible: false
              });
            }}
          />
        </Modal>
        <Modal
          title="删除任务"
          visible={this.state.delVisible}
          onOk={this.handleDelOk}
          onCancel={this.handleDelCancel}
          okText="确定"
          cancelText="取消"
        /> */}
        <div
          style={{ display: "flex", margin: "0.5rem", flexDirection: "row" }}
        >
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            {/* 任务统计 */}
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row"
              }}
            >
              {/* 任务统计-图标 */}
              <div style={{ flex: 1 }}>
                <Icon
                  style={{ color, fontSize: "6.2rem", marginTop: "-0.2rem" }}
                  type={icon}
                />
              </div>
              {/* 任务统计-文字 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  textAlign: "center"
                }}
              >
                <p style={{ fontSize: "1rem", margin: "0rem" }}>
                  {title || "No Title"}
                </p>
                <p style={{ fontSize: "2rem", margin: "0rem" }}>
                  <CountUp
                    start={0}
                    end={Number(this.state.number)}
                    duration={2.75}
                    useEasing
                    useGrouping
                    separator=","
                    {...countUp || {}}
                  />
                </p>
              </div>
            </div>
            {/* 任务按钮 */}
            <div
              style={{
                flex: 0.5,
                display: "flex",
                marginTop: "-3rem",
                marginLeft: "0.3rem",
                marginBottom: "-0.3rem"
              }}
            >
              <Button type="primary">
                <a herf="/task">查询任务</a>
              </Button>
            </div>
            {/* <div
              style={{
                flex: 1,
                display: "flex",
                marginLeft: "0.3rem",
                marginTop: "0.5rem"
              }}
            >
              
              <Button onClick={this.deleteTask}>删除任务</Button>
            </div> */}
          </div>
          {/* </div> */}
          <Divider type="vertical" style={{ flex: 0.02, height: "14rem" }} />

          <div
            style={{
              flex: 6,
              fontSize: "1rem",
              marginBottom: "-4rem",
              // marginLeft: window.innerWidth > 1400 ? "-20rem" : "-5rem",
              // marginRight: window.innerWidth > 1400 ? "12rem" : "8rem",
              textAlign: "center"
              // marginLeft: "-5rem"
            }}
          >
            <TaskPie />
          </div>
        </div>
      </Card>
    );
  }
}

TaskNumberPieCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object
};

export default TaskNumberPieCard;
