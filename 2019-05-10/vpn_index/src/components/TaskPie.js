import { Chart, Tooltip, Axis, Legend, Coord, Guide, Pie } from "viser-react";
import * as React from "react";
const DataSet = require("@antv/data-set");

const sourceData = [
  { item: "正在进行", count: 50 },
  { item: "未完成", count: 20 },
  { item: "已完成", count: 30 }
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

export default class TaskPie extends React.Component {
  render() {
    return (
      <Chart
        forceFit
        height={270}
        data={data}
        scale={scale}
        style={{ margin: "-1rem", marginLeft: "-2rem" }}
      >
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
    );
  }
}
