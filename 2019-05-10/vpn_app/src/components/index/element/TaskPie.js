import { Chart, Axis, Legend, Coord, Pie } from "viser-react";
import * as React from "react";

import { get } from "../../../api";
import { Tooltip } from 'antd';

const DataSet = require("@antv/data-set");

export default class TaskPie extends React.Component {
  state = { sdata: { wait: 0, run: 0, finish: 0, pause: 0 } };
  componentDidMount() {

    var that = this;

    get("/monitor/task/state")
      .then(data => {
        if (data.msg === "系统错误") {
          return;
        }
        that.setState({ sdata: data });
      })
      .catch(err => { });
    setInterval(function () {
      get("/monitor/task/state")
        .then(data => {
          if (data.msg === "系统错误") {
            return;
          }
          that.setState({ sdata: data });
        })
        .catch(err => { });
    }, 5000);
  }
  render() {
    var sourceData = [];
    var { sdata } = this.state;
    sourceData = [
      { item: "等待中", count: sdata.wait },
      { item: "进行中", count: sdata.run },
      { item: "已完成", count: sdata.finish },
      { item: "暂停中", count: sdata.pause }
    ];
    const scale = [
      {
        dataKey: "percent",
        min: 0,
        formatter: ".0%"
      }
    ];

    const dv = new DataSet.View().source(sourceData);
    dv.transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const data = dv.rows;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2, fontSize: "1rem" }}>任务完成百分比统计：</div>

        <div style={{ flex: 4 }}>
          <Chart forceFit height={270} data={data} scale={scale} style={{}}>
            <Tooltip showTitle={false} />
            <Axis />
            <Legend dataKey="item" />
            <Coord type="theta" radius={0.75} innerRadius={0.6} />
            <Pie
              position="percent"
              color="item"
              style={{ stroke: "#fff", lineWidth: 1 }}
              label={[
                "percent",
                {
                  formatter: (val, item) => {
                    return item.point.item + ": " + val;
                  }
                }
              ]}
            />
          </Chart>
        </div>
        <div
          style={{
            flex: 2,
            marginTop: "2rem",
            marginRight: "-2rem",
            display: "flex"
          }}
        >
          <div style={{ display: "flex", flex: "1", flexDirection: "column" }}>
            <div
              style={{ fontSize: "1rem", color: "#62B1FF" }}
            >{`等待中数：`}</div>
            <div
              style={{ fontSize: "1rem", color: "#3ECACB" }}
            >{`进行中数：`}</div>
            <div
              style={{ fontSize: "1rem", color: "#51CB73" }}
            >{`已完成数：`}</div>
            <Tooltip placement="bottom" title="被手工暂停或实质已出结果">
              <div
                style={{ fontSize: "1rem", color: "#F2C41D" }}
              >{`暂停中数：`}</div>
            </Tooltip>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              marginLeft: "-5rem"
            }}
          >
            <div style={{ fontSize: "1rem" }}>{`${sdata.wait}`}</div>
            <div style={{ fontSize: "1rem" }}>{`${sdata.run}`}</div>
            <div style={{ fontSize: "1rem" }}>{`${sdata.finish}`}</div>
            <div style={{ fontSize: "1rem" }}>{`${sdata.pause}`}</div>
          </div>
        </div>
      </div>
    );
  }
}
