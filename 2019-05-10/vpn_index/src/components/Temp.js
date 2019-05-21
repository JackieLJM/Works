import React, { Component } from "react";
import { Card, Statistic } from "antd";
import { post, get } from "../api";
import TempImg from "./TempImg";
export default class Temp extends Component {
  state = {
    data: [
      {
        temp: { chip_temp: [0, 0], cpu_temp: "0" },
        ip: "192.168.101.237",
        deviceNo: 1
      }
    ],
    success: true
  };
  componentDidMount() {
    get(
      `/monitor/chip/temperature?deviceNo=${this.props.deviceNo}&ip=${
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
      var chip_temp = data[0].temp.chip_temp;
      var cpu_temp = data[0].temp.cpu_temp;
      var chip_temp_1 = chip_temp[0];
      var chip_temp_2 = chip_temp[1];
    }
    // else {
    //   var data = [
    //     {
    //       temp: { chip_temp: [0, 0], cpu_temp: "0" },
    //       ip: "192.168.101.237",
    //       deviceNo: 1
    //     }
    //   ];
    //   var chip_temp = data[0].temp.chip_temp;
    //   var cpu_temp = data[0].temp.cpu_temp;
    //   var chip_temp_1 = chip_temp[0];
    //   var chip_temp_2 = chip_temp[1];
    // }
    return (
      <Card
        title={<div style={{ marginTop: "-0.3rem" }}>温度详细情况</div>}
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
        <div style={{ display: "flex", marginLeft: "7rem" }}>
          <Statistic
            title="区域一温度"
            value={chip_temp_1}
            prefix={<TempImg temp={Number(chip_temp_1)} />}
            suffix="℃"
            style={{ flex: 1, margin: "0 2rem" }}
          />
          <Statistic
            title="区域二温度"
            value={chip_temp_2}
            prefix={<TempImg temp={Number(chip_temp_2)} />}
            suffix="℃"
            style={{ flex: 1, margin: "0 2rem" }}
          />
          <Statistic
            title="CPU的温度"
            value={cpu_temp}
            prefix={<TempImg temp={Number(cpu_temp)} />}
            suffix="℃"
            style={{ flex: 1, margin: "0 2rem" }}
          />
        </div>
      </Card>
    );
  }
}
