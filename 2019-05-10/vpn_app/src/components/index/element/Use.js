import React, { Component } from "react";
import { Card } from "antd";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { get } from "../../../api";
// import { height } from "window-size";
export default class Use extends Component {
  state = {
    data: [
      {
        disk: { total: 0, free: 0 },
        memory: { total: 0, free: 0 },
        ip: "192.168.101.237",
        cpu: "0%",
        deviceNo: 1
      }
    ],
    success: true
  };
  componentDidMount() {
    var that=this;
    get(
      `/monitor/system/resources?deviceNo=${this.props.deviceNo}&ip=${
      this.props.ip
      }`
    )
      .then(data => {
        if (data.data !== undefined) {
          if (data.msg === "系统错误") {
            return
          }
          that.setState({ data: data.data });
        }
      })
      .catch(err => { });
  }
  render() {
    if (this.state.data[0] !== undefined) {
      var data = this.state.data;
      var { disk, memory, cpu } = data[0];
      cpu = Number(Number(cpu.slice(0, -1)).toFixed(2));
      var memorytotal = Number(memory.total / 1024 / 1024 / 1024).toFixed(2);
      var memoryuse = Number(
        (memory.total - memory.free) /
        1024 /
        1024 /
        1024
      ).toFixed(2);
      var mempercent = Number(
        ((memory.total - memory.free) / memory.total) *
        100
      ).toFixed(2);
      var disktotal = Number(disk.total / 1024 / 1024 / 1024).toFixed(2);
      var diskuse = Number((disk.total - disk.free) / 1024 / 1024 / 1024).toFixed(2);
      var diskpercent = Number(Number(((disk.total - disk.free) / disk.total)) * 100).toFixed(2);
    }

    // else {
    //   data = [
    //     {
    //       disk: { total: 241699667968, free: 234416611328 },
    //       memory: { total: 8141062144, free: 149819392 },
    //       ip: "192.168.101.237",
    //       cpu: "17.9138867183%",
    //       deviceNo: 1
    //     }
    //   ];
    //   var { disk, memory, cpu } = data[0];
    //   cpu = Number(cpu.slice(0, -2)).toFixed(2);
    //   var memorytotal = (memory.total / 1024 / 1024 / 1024).toFixed(2);
    //   var memoryuse = (
    //     (memory.total - memory.free) /
    //     1024 /
    //     1024 /
    //     1024
    //   ).toFixed(2);
    //   var mempercent = (
    //     ((memory.total - memory.free) / memory.total) *
    //     100
    //   ).toFixed(2);
    //   var disktotal = (disk.total / 1024 / 1024 / 1024).toFixed(2);
    //   var diskuse = ((disk.total - disk.free) / 1024 / 1024 / 1024).toFixed(2);
    //   var diskpercent = (((disk.total - disk.free) / disk.total) * 100).toFixed(
    //     2
    //   );
    // }

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
          {/* <ReactMinimalPieChart
            data={[
              {
                title: "One",
                value: 10.22,
                color: "#E38627"
              },
              {
                title: "Two",
                value: 50.61,
                color: "#C13C37"
              }
            ]}
            lineWidth={20}
            paddingAngle={13}
            rounded
            label
            labelStyle={{
              fontSize: "1rem",
              fontFamily: "sans-serif"
            }}
            labelPosition={60}
          /> */}
          {cpu < 50 ? (
            <div
              style={{
                flex: "1",
                textAlign: "center",
                width: "6rem",
                height: "6rem"
              }}
            >
              <div style={{ marginBottom: "0.5rem", color: "green" }}>剩余</div>
              <ReactMinimalPieChart
                style={{ height: "6rem" }}
                data={[
                  {
                    value: isNaN(cpu) ? 0 : cpu === 0 ? 0 : 100 - cpu,
                    color: "green"
                  }
                ]}
                totalValue={100}
                lineWidth={20}
                label
                animate={true}
                labelStyle={{
                  fontSize: "25px",
                  fontFamily: "sans-serif"
                }}
                labelPosition={0}
              />
            </div>
          ) : (
              <div style={{ flex: "1", textAlign: "center" }}>
                <div style={{ marginBottom: "0.5rem", color: "#E38627" }}>
                  已使用
              </div>
                <ReactMinimalPieChart
                  style={{ height: "6rem" }}
                  data={[
                    {
                      value: isNaN(cpu) ? 0 : cpu === 0 ? 0 : cpu,
                      color: "#E38627"
                    }
                  ]}
                  totalValue={100}
                  lineWidth={20}
                  label
                  animate={true}
                  labelStyle={{
                    fontSize: "25px",
                    fontFamily: "sans-serif"
                  }}
                  labelPosition={0}
                />
              </div>
            )}
          {diskpercent < 50 ? (
            <div style={{ flex: "1", textAlign: "center" }}>
              <div style={{ marginBottom: "0.5rem", color: "green" }}>剩余</div>
              <ReactMinimalPieChart
                style={{ height: "6rem" }}
                data={[
                  {
                    value: isNaN(diskpercent) ? 0 : 100 - diskpercent,
                    color: "green"
                  }
                ]}
                totalValue={100}
                lineWidth={20}
                label
                animate={true}
                labelStyle={{
                  fontSize: "25px",
                  fontFamily: "sans-serif"
                }}
                labelPosition={0}
              />
            </div>
          ) : (
              <div style={{ flex: "1", textAlign: "center" }}>
                <div style={{ marginBottom: "0.5rem", color: "#E38627" }}>
                  已使用
              </div>
                <ReactMinimalPieChart
                  style={{ height: "6rem" }}
                  data={[
                    {
                      value: isNaN(diskpercent) ? 0 : diskpercent,
                      color: "#E38627"
                    }
                  ]}
                  totalValue={100}
                  lineWidth={20}
                  label
                  animate={true}
                  labelStyle={{
                    fontSize: "25px",
                    fontFamily: "sans-serif"
                  }}
                  labelPosition={0}
                />
              </div>
            )}
          {mempercent < 50 ? (
            <div style={{ flex: "1", textAlign: "center" }}>
              <div style={{ marginBottom: "0.5rem", color: "green" }}>剩余</div>
              <ReactMinimalPieChart
                style={{ height: "6rem" }}
                data={[
                  {
                    value: isNaN(mempercent) ? 0 : 100 - mempercent,
                    color: "green"
                  }
                ]}
                totalValue={100}
                lineWidth={20}
                label
                animate={true}
                labelStyle={{
                  fontSize: "25px",
                  fontFamily: "sans-serif"
                }}
                labelPosition={0}
              />
            </div>
          ) : (
              <div style={{ flex: "1", textAlign: "center" }}>
                <div style={{ marginBottom: "0.5rem", color: "#E38627" }}>
                  已使用
              </div>
                <ReactMinimalPieChart
                  style={{ height: "6rem" }}
                  data={[
                    {
                      value: isNaN(mempercent) ? 0 : mempercent,
                      color: "#E38627"
                    }
                  ]}
                  totalValue={100}
                  lineWidth={20}
                  label
                  animate={true}
                  labelStyle={{
                    fontSize: "25px",
                    fontFamily: "sans-serif"
                  }}
                  labelPosition={0}
                />
              </div>
            )}
        </div>
        <div
          style={{ display: "flex", fontSize: "0.9rem", textAlign: "center" }}
        >
          <div
            style={{
              width: "6rem",
              // marginLeft: "4rem",
              marginTop: "1rem",
              flex: 1,
              display: "flex",
              flexDirection: "column"
              // fontSize: "0.8rem"
            }}
          >
            <div style={{ flex: 1, marginLeft: "-2rem" }}>
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
              marginTop: "1rem",
              flex: 1,
              display: "flex",
              flexDirection: "column"
              // fontSize: "0.8rem"
            }}
          >
            <div style={{ flex: 1 }}>
              <span>磁盘使用率：</span>
              <span style={{ fontWeight: "bold" }}>
                {isNaN(diskpercent) ? 0 : diskpercent + "%"}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <span>磁盘已使用：</span>
              <span style={{ fontWeight: "bold" }}>
                {isNaN(diskuse) ? 0 : diskuse + "GB"}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <span>磁盘总大小：</span>
              <span style={{ fontWeight: "bold" }}>
                {isNaN(disktotal) ? 0 : disktotal + "GB"}
              </span>
            </div>
          </div>
          <div
            style={{
              width: "6rem",
              // marginLeft: "4rem",
              marginTop: "1rem",
              flex: 1,
              display: "flex",
              flexDirection: "column"
              // fontSize: "0.8rem"
            }}
          >
            <div style={{ flex: 1 }}>
              <span>内存使用率：</span>
              <span style={{ fontWeight: "bold" }}>
                {isNaN(mempercent) ? 0 : mempercent + "%"}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <span>内存已使用：</span>
              <span style={{ fontWeight: "bold" }}>
                {isNaN(memoryuse) ? 0 : memoryuse + "GB"}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <span>内存总大小：</span>
              <span style={{ fontWeight: "bold" }}>
                {isNaN(memorytotal) ? 0 : memorytotal + "GB"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}
