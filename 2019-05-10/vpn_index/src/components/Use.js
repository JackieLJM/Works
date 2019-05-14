import React, { Component } from "react";
import { Card } from "antd";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { post, get } from "../api";
export default class Use extends Component {
  state = {
    data: [
      {
        disk: { total: 241699667968, free: 234416611328 },
        memory: { total: 8141062144, free: 149819392 },
        ip: "192.168.101.237",
        cpu: "17.9138867183%",
        deviceNo: 1
      }
    ],
    success: true
  };
  componentDidMount() {
    get(
      `/monitor/system/resources?deviceNo=${this.props.deviceNo}&ip=${
        this.props.ip
      }`
    )
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    if (this.state.data[0] !== undefined) {
      var data = this.state.data;
      var { disk, memory, cpu } = data[0];
      cpu = Number(cpu.slice(0, -2)).toFixed(2);
      var memorytotal = (memory.total / 1024 / 1024 / 1024).toFixed(2);
      var memoryuse = (
        (memory.total - memory.free) /
        1024 /
        1024 /
        1024
      ).toFixed(2);
      var mempercent = (
        ((memory.total - memory.free) / memory.total) *
        100
      ).toFixed(2);
      var disktotal = (disk.total / 1024 / 1024 / 1024).toFixed(2);
      var diskuse = ((disk.total - disk.free) / 1024 / 1024 / 1024).toFixed(2);
      var diskpercent = (((disk.total - disk.free) / disk.total) * 100).toFixed(
        2
      );
    } else {
      data = [
        {
          disk: { total: 241699667968, free: 234416611328 },
          memory: { total: 8141062144, free: 149819392 },
          ip: "192.168.101.237",
          cpu: "17.9138867183%",
          deviceNo: 1
        }
      ];
      var { disk, memory, cpu } = data[0];
      cpu = Number(cpu.slice(0, -2)).toFixed(2);
      var memorytotal = (memory.total / 1024 / 1024 / 1024).toFixed(2);
      var memoryuse = (
        (memory.total - memory.free) /
        1024 /
        1024 /
        1024
      ).toFixed(2);
      var mempercent = (
        ((memory.total - memory.free) / memory.total) *
        100
      ).toFixed(2);
      var disktotal = (disk.total / 1024 / 1024 / 1024).toFixed(2);
      var diskuse = ((disk.total - disk.free) / 1024 / 1024 / 1024).toFixed(2);
      var diskpercent = (((disk.total - disk.free) / disk.total) * 100).toFixed(
        2
      );
    }

    return (
      <Card
        title={<div style={{ marginTop: "-0.3rem" }}>使用详细情况</div>}
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
        <div style={{ display: "flex" }}>
          <ReactMinimalPieChart
            style={{ width: "6rem", height: "6rem", flex: "1" }}
            data={[
              {
                value: cpu,
                color: "#E38627"
              }
            ]}
            totalValue={100}
            lineWidth={20}
            label
            labelStyle={{
              fontSize: "25px",
              fontFamily: "sans-serif"
            }}
            labelPosition={0}
          />
          <ReactMinimalPieChart
            style={{ width: "6rem", height: "6rem", flex: "1" }}
            data={[
              {
                value: diskpercent,
                color: "#E38627"
              }
            ]}
            totalValue={100}
            lineWidth={20}
            label
            labelStyle={{
              fontSize: "25px",
              fontFamily: "sans-serif"
            }}
            labelPosition={0}
          />
          <ReactMinimalPieChart
            style={{ width: "6rem", height: "6rem", flex: "1" }}
            data={[
              {
                value: mempercent,
                color: "#E38627"
              }
            ]}
            totalValue={100}
            lineWidth={20}
            label
            labelStyle={{
              fontSize: "25px",
              fontFamily: "sans-serif"
            }}
            labelPosition={0}
          />
        </div>
        <div style={{ display: "flex", fontSize: "0.9rem" }}>
          <div
            style={{
              width: "6rem",
              marginLeft: "4rem",
              marginTop: "1rem",
              flex: 1,
              display: "flex",
              flexDirection: "column"
              // fontSize: "0.8rem"
            }}
          >
            <div style={{ flex: 1 }}>
              <span>CPU使用率：</span>
              <span style={{ marginLeft: "0.1rem", fontWeight: "bold" }}>
                {cpu + "%"}
              </span>
            </div>
            {/* <div style={{ flex: 1 }}>
                <span>CPU当前频率：</span>
                <span style={{ fontWeight: "bold" }}>3Ghz</span>
              </div>
              <div style={{ flex: 1 }}>
                <span>CPU最大频率：</span>
                <span style={{ fontWeight: "bold" }}>4Ghz</span>
              </div> */}
          </div>
          <div
            style={{
              width: "6rem",
              marginLeft: "4rem",
              marginTop: "1rem",
              flex: 1,
              display: "flex",
              flexDirection: "column"
              // fontSize: "0.8rem"
            }}
          >
            <div style={{ flex: 1 }}>
              <span>磁盘使用率：</span>
              <span style={{ fontWeight: "bold" }}>{diskpercent + "%"}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span>磁盘已使用：</span>
              <span style={{ fontWeight: "bold" }}>{diskuse + "GB"}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span>磁盘总大小：</span>
              <span style={{ fontWeight: "bold" }}>{disktotal + "GB"}</span>
            </div>
          </div>
          <div
            style={{
              width: "6rem",
              marginLeft: "4rem",
              marginTop: "1rem",
              flex: 1,
              display: "flex",
              flexDirection: "column"
              // fontSize: "0.8rem"
            }}
          >
            <div style={{ flex: 1 }}>
              <span>内存使用率：</span>
              <span style={{ fontWeight: "bold" }}>{mempercent + "%"}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span>内存已使用：</span>
              <span style={{ fontWeight: "bold" }}>{memoryuse + "GB"}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span>内存总大小：</span>
              <span style={{ fontWeight: "bold" }}>{memorytotal + "GB"}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
