import { Chart, Tooltip, Axis, Legend, Coord, Guide, Pie } from "viser-react";
import * as React from "react";
import { get } from "../api";
const DataSet = require("@antv/data-set");

export default class TaskPie extends React.Component {
  state = { sdata: { wait: 0, run: 0, finish: 0, pause: 0 } };
  componentDidMount() {
    get("/monitor/task/state")
      .then(data => {
        if (data.msg === "系统错误") {
          return
        }
        this.setState({ sdata: data });
      })
      .catch(err => { });
  }
  render() {
    var sourceData = [];
    var { sdata } = this.state;
    sourceData = [
      { item: "等待中数", count: sdata.wait },
      { item: "已完成数", count: sdata.finish },
      { item: "进行中数", count: sdata.run },
      { item: "未完成数", count: sdata.pause }
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
            marginRight: "-2rem"
          }}
        >
          <div style={{ fontSize: "1rem" }}>{`等待中：${sdata.wait}`}</div>
          <div style={{ fontSize: "1rem" }}>{`进行中：${sdata.run}`}</div>
          <div style={{ fontSize: "1rem" }}>{`未完成：${sdata.pause}`}</div>
          <div style={{ fontSize: "1rem" }}>{`已完成：${sdata.finish}`}</div>
        </div>
      </div>
    );
  }
}
