import React, { Component } from "react";
import { Card } from "antd";

import { get } from "../api";
import ChipImg from "./ChipImg";

export default class Chip extends Component {
  state = {
    data: [
      {
        ip: "192.168.101.237",
        deviceNo: 1,
        status: {
          "core-1": 0,
          "core-3": 0,
          "core-2": 0,
          "core-5": 0,
          "core-4": 0,
          "core-7": 0,
          "core-12": 0,
          "core-23": 0,
          "core-6": 0,
          "core-11": 0,
          "core-22": 0,
          "core-9": 0,
          "core-10": 0,
          "core-21": 0,
          "core-8": 0,
          "core-20": 0,
          "core-19": 0,
          "core-18": 0,
          "core-17": 0,
          "core-16": 0,
          "core-15": 0,
          "core-14": 0,
          "core-13": 0,
          "core-24": 0
        }
      }
    ],
    success: true
  };

  componentDidMount() {
    get(
      `/monitor/chip/status?deviceNo=${this.props.deviceNo}&ip=${this.props.ip}`
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
  }
  render() {
    if (this.state.data[0] !== undefined) {
      var data = this.state.data;
      var status = data[0].status;
      var arr = [];
      for (let i in status) {
        let o = {};
        o[i] = status[i];
        arr.push(o);
      }
      arr.sort((a, b) => {
        var aname = Object.keys(a)[0];
        var bname = Object.keys(b)[0];
        var anum = Number(aname.substring(5));
        var bnum = Number(bname.substring(5));
        return anum - bnum;
      });
      var a = 0;
      var b = 8;
      var arr2 = [];
      for (var i = 0; i < arr.length / 8; i++) {
        arr2.push(arr.slice(a, b));
        a = a + 8;
        b = b + 8;
      }
    }
    //  else {
    //   var data = [
    //     {
    //       ip: "192.168.101.237",
    //       deviceNo: 1,
    //       status: {
    //         "core-1": 1,
    //         "core-3": 2,
    //         "core-2": 3,
    //         "core-5": 4,
    //         "core-4": 5,
    //         "core-7": 6,
    //         "core-12": 0,
    //         "core-23": 1,
    //         "core-6": 1,
    //         "core-11": 1,
    //         "core-22": 1,
    //         "core-9": 1,
    //         "core-10": 1,
    //         "core-21": 1,
    //         "core-8": 1,
    //         "core-20": 1,
    //         "core-19": 1,
    //         "core-18": 1,
    //         "core-17": 1,
    //         "core-16": 1,
    //         "core-15": 1,
    //         "core-14": 1,
    //         "core-13": 1,
    //         "core-24": 1
    //       }
    //     }
    //   ];
    //   var status = data[0].status;
    //   var arr = [];
    //   for (let i in status) {
    //     let o = {};
    //     o[i] = status[i];
    //     arr.push(o);
    //   }
    //   arr.sort((a, b) => {
    //     var aname = Object.keys(a)[0];
    //     var bname = Object.keys(b)[0];
    //     var anum = Number(aname.substring(5));
    //     var bnum = Number(bname.substring(5));
    //     return anum - bnum;
    //   });
    //   var a = 0;
    //   var b = 8;
    //   var arr2 = [];
    //   for (var i = 0; i < arr.length / 8; i++) {
    //     arr2.push(arr.slice(a, b));
    //     a = a + 8;
    //     b = b + 8;
    //   }
    // }
    return (
      <Card
        title={<div style={{ marginTop: "-0.3rem" }}>各个芯片情况</div>}
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
        {arr2.map(item => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              {item.map(data => (
                <ChipImg
                  name={Object.keys(data)[0].replace("core", "芯片")}
                  status={Object.values(data)[0]}
                />
              ))}
            </div>
          );
        })}
        {/* <div style={{ display: "flex" }}>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片一
            </div>
            <div style={{ fontSize: "0.6rem" }}>未启动</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片二
            </div>
            <div style={{ fontSize: "0.6rem" }}>就绪</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片三
            </div>
            <div style={{ fontSize: "0.6rem" }}>就绪</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片四
            </div>
            <div style={{ fontSize: "0.6rem" }}>工作中</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片五
            </div>
            <div style={{ fontSize: "0.6rem" }}>启动异常</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片六
            </div>
            <div style={{ fontSize: "0.6rem" }}>启动中</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片七
            </div>
            <div style={{ fontSize: "0.6rem" }}>关闭中</div>
          </div>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img src={chip} style={{ height: "3rem" }} />
            <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
              芯片八
            </div>
            <div style={{ fontSize: "0.6rem" }}>不存在</div>
          </div>
        </div> */}
      </Card>
    );
  }
}
