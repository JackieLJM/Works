import React, { Component } from "react";
import { Table, Button, Icon } from "antd";
import "./FuncTable.css";
import { Resizable } from "react-resizable";

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
  state = {};

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  data = [
    {
      key: 0,
      deviceNo: "2018-02-11",
      status: (
        <div>
          <Icon type="sync" spin />
          &nbsp;启动中
        </div>
      ),
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 1,
      deviceNo: "2018-03-11",
      status: (
        <div>
          <Icon type="poweroff" style={{ color: "red" }} />
          &nbsp;已关闭
        </div>
      ),
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 2,
      deviceNo: "2018-04-11",
      status: (
        <div>
          <Icon type="bulb" style={{ color: "#FFD924", fontSize: "1.1rem" }} />
          &nbsp;设备异常
        </div>
      ),
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 3,
      deviceNo: "2018-04-11",
      status: (
        <div>
          <Icon
            type="check-circle"
            style={{ fontSize: "0.9rem" }}
            theme="twoTone"
            twoToneColor="#52c41a"
          />
          &nbsp;正在运行中{" "}
        </div>
      ),
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 4,
      deviceNo: "2018-04-11",
      status: 98,
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 5,
      deviceNo: "2018-04-11",
      status: 98,
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 6,
      deviceNo: "2018-04-11",
      status: 98,
      temp: "income",
      cpu: "transfer"
    },
    {
      key: 7,
      deviceNo: "2018-04-11",
      status: 98,
      temp: "income",
      cpu: "transfer"
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
    const columns = [
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

    if (this.props.complexTable === true) {
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
        key: "action",
        render: () => <Button size="small">查看具体情况</Button>
      });
    }
    const newColumns = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }));

    return (
      <Table
        bordered
        components={this.components}
        columns={newColumns}
        dataSource={this.data}
        pagination={false}
        size={"middle"}
        // onHeaderRow={column => {
        //   var new=column.map(item=>{})

        // }}
      />
    );
  }
}
export default FuncTable;
