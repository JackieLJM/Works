import React, { Component } from "react";
import { Table, Button, Icon, Modal, Card } from "antd";
import "./FuncTable.css";
import { Resizable } from "react-resizable";
import CountUp from "react-countup";
import { DetailUI } from "./DetailUI";
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};
class FuncTable extends Component {
  state = { detailUI: false };

  components = {
    header: {
      cell: ResizeableTitle
    }
  };
  detailUI = () => {
    DetailUI();
  };
  data = [
    {
      key: 0,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
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
      ),
      temp: (
        <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>
          {50 >= 80 ? (
            <div style={{ color: "red" }}>{`${80}℃(超烫)`}</div>
          ) : 55 >= 50 ? (
            <div style={{ color: "#F65121" }}>{`${55}℃(高)`}</div>
          ) : (
            `${55}℃`
          )}
        </div>
      ),
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 1,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
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
      ),
      temp: (
        <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>
          {80 >= 80 ? (
            <div style={{ color: "red" }}>{`${80}℃(超烫)`}</div>
          ) : 55 >= 50 ? (
            <div style={{ color: "#F65121" }}>{`${55}℃(高)`}</div>
          ) : (
            `${55}℃`
          )}
        </div>
      ),
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 2,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
        <div style={{ marginLeft: "1.8rem" }}>
          <Icon
            type="bulb"
            style={{
              color: "#FFD924",
              fontSize: "1.5rem",
              verticalAlign: "top"
            }}
          />
          &nbsp;&nbsp;
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              fontSize: "1rem",
              marginLeft: "-0.1rem"
            }}
          >
            故障或异常
          </div>
        </div>
      ),
      temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 3,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
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
      ),
      temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 4,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
        <div>
          <Icon
            type="check-circle"
            style={{
              fontSize: "1.3rem",
              verticalAlign: "middle"
            }}
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
      ),
      temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 5,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
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
      ),
      temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 6,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
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
      ),
      temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    },
    {
      key: 7,
      deviceNo: (
        <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
      ),
      status: (
        <div>
          <Icon
            type="sync"
            spin
            style={{
              fontSize: "1.3rem",
              verticalAlign: "middle"
            }}
          />
          &nbsp;{" "}
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
      ),
      temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
      cpu: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      memory: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      ),
      disk: (
        <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
          <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
        </div>
      )
    }
  ];

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  render() {
    var columns = [
      {
        title: "FPGA节点",
        dataIndex: "deviceNo",
        className: "height",
        align: "center",
        width: 150
      },
      {
        title: "芯片状态",
        dataIndex: "status",
        className: "height",
        align: "center",
        width: 150
      },
      {
        title: "温度",
        dataIndex: "temp",
        align: "center",
        className: "height",
        width: 150
      }
    ];
    if (this.props.name === "gpu") {
      columns = [
        {
          title: "GPU节点",
          dataIndex: "deviceNo",
          className: "height",
          align: "center",
          width: 150
        },
        {
          title: "芯片状态",
          dataIndex: "status",
          className: "height",
          align: "center",
          width: 150
        },
        {
          title: "温度",
          dataIndex: "temp",
          align: "center",
          className: "height",
          width: 150
        }
      ];
    }

    if (this.props.complexTable === true) {
      columns.pop();
      columns.pop();
      columns.push(
        {
          title: "CPU使用率",
          dataIndex: "cpu",
          className: "height",
          align: "center",
          width: 150
        },
        {
          title: "内存使用率",
          dataIndex: "memory",
          className: "height",
          align: "center",
          width: 150
        },
        {
          title: "硬盘使用率",
          dataIndex: "disk",
          className: "height",
          align: "center",
          width: 150
        }
      );
      columns.push({
        title: "操作",
        align: "center",
        className: "height",
        width: 160,
        key: "action",
        render: () => (
          <a
            style={{
              fontSize: "1rem",
              border: "1px solid black",
              padding: "0 8px 3px 8px",
              borderRadius: "4px"
            }}
            onClick={this.detailUI}
          >
            详情界面
          </a>
        )
      });
    }
    var newColumns = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    return (
      // <div>
      <Table
        bordered
        components={this.components}
        columns={newColumns}
        dataSource={this.data}
        pagination={false}
        size={"middle"}
      />

      // </div>
    );
  }
}
export default FuncTable;
