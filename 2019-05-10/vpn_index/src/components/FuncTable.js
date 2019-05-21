import React, { Component } from "react";
import {
  Table,
  Tag,
  Button,
  Icon,
  Modal,
  Card,
  message,
  error,
  Empty,
  notification
} from "antd";
import "./FuncTable.css";
import { Resizable } from "react-resizable";
import CountUp from "react-countup";
import { DetailUI } from "./DetailUI";
import { get, post } from "../api";
import IconImg from "./IconImg";
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
  state = {
    detailUI: false,
    data: [
      // {
      //   disk: { total: 241699667968, free: 234417324032 },
      //   temp: { chip_temp: [23, 23], cpu_temp: "26" },
      //   memory: { total: 8141062144, free: 145788928 },
      //   ip: "192.168.101.237",
      //   cpu: "17.8953345687%",
      //   deviceNo: 1,
      //   power_state: true
      // },
      // {
      //   disk: { total: 241699667968, free: 236016472064 },
      //   temp: { chip_temp: [30, 26], cpu_temp: "43" },
      //   memory: { total: 8141062144, free: 133865472 },
      //   ip: "192.168.101.231",
      //   cpu: "1.01667283139%",
      //   deviceNo: 2,
      //   power_state: false
      // }
    ],
    gpudata: [
      // {
      //   GpuStatus: [
      //     { deviceNo: "device-1", graphics: 1, status: 0 },
      //     { deviceNo: "device-1", graphics: 2, status: 1 },
      //     { deviceNo: "device-1", graphics: 3, status: 2 },
      //     { deviceNo: "device-1", graphics: 4, status: 3 }
      //   ],
      //   deviceNo: "device-1",
      //   status: "offline"
      // },
      // {
      //   GpuStatus: [
      //     { deviceNo: "device-2", graphics: 1, status: 1 },
      //     { deviceNo: "device-2", graphics: 2, status: 2 },
      //     { deviceNo: "device-2", graphics: 3, status: 1 },
      //     { deviceNo: "device-2", graphics: 4, status: 1 }
      //   ],
      //   deviceNo: "device-2",
      //   status: "online"
      // }
    ]
  };
  components = {
    header: {
      cell: ResizeableTitle
    }
  };
  detailUI = (record, gpu) => {
    console.log(record.key);
    DetailUI(
      record.deviceNo,
      record.ip,
      gpu,
      this.GpuStatusArr,
      record.status,
      record.key
    );
  };
  open = e => {
    var that = this;
    get(`/monitor/core/power?flag=true&ip=${e.ip}`)
      .then(data => {
        if (data.msg === "操作成功") {
          get("/monitor/node")
            .then(data => {
              notification["success"]({ message: "操作成功" });
              that.setState({ data: data.data });
            })
            .catch(err => {
              notification["error"]({ message: "发生未知错误" });
              console.log(err);
            });
        }
      })
      .catch(err => console.log(err));
  };
  close = e => {
    var that = this;
    get(`/monitor/core/power?flag=false&ip=${e.ip}`)
      .then(data => {
        if (data.msg === "操作成功") {
          get("/monitor/node")
            .then(data => {
              notification["success"]({ message: "操作成功" });
              that.setState({ data: data.data });
            })
            .catch(err => {
              notification["error"]({ message: "发生未知错误" });
              console.log(err);
            });
        }
      })
      .catch(err => console.log(err));
  };
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   // console.log(nextProps);
  //   if (nextProps.fpgadata.length !== 0) {
  //     this.setState({ data: nextProps.fpgadata });
  //   }
  // }
  componentDidMount() {
    // this.setState({ data: this.props.fpgadata });
    var that = this;
    if (this.props.name === "gpu") {
      setInterval(function() {
        get("/monitor/gpu")
          .then(data => {
            that.setState({ gpudata: data.data });
          })
          .catch(err => {
            console.log(err);
          });
      }, 3000);
    }
    if (this.props.name === "fpga") {
      setInterval(function() {
        get("/monitor/node")
          .then(data => {
            that.setState({ data: data.data });
          })
          .catch(err => {
            console.log(err);
          });
      }, 500);
    }
    // console.log(this.state.gpudata, this.state.data);
  }
  GpuStatusArr = [];

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
  componentWillUpdate() {}
  componentDidUpdate(prevProps, prevState) {
    // this.GpuStatusArr = [];
  }
  render() {
    if (this.props.name === "fpga") {
      var { data } = this.state;
      if (data.localizedMessage === "connect timed out") {
        data = [];
        notification["error"]({ message: "请求超时" });
      } else {
        // if (this.props.name !== "gpu") {
        data = data.map((item, i) => {
          var {
            temp,
            cpu,
            memory,
            disk,
            ip,
            cpu,
            deviceNo,
            power_state
          } = item;
          var { chip_temp, cpu_temp } = temp;
          var [chip_temp_1, chip_temp_2] = chip_temp;
          cpu = Number(cpu.slice(0, -2)).toFixed(2);

          var mempercent = (
            ((memory.total - memory.free) / memory.total) *
            100
          ).toFixed(2);

          var diskpercent = (
            ((disk.total - disk.free) / disk.total) *
            100
          ).toFixed(2);
          var averageTemp = (
            (Number(cpu_temp) + Number(chip_temp_1) + Number(chip_temp_2)) /
            3
          ).toFixed(2);
          return {
            key: i,
            deviceNoName: (
              <div
                style={{ fontSize: "1rem", margin: "0rem" }}
              >{`节点-${deviceNo}`}</div>
            ),
            status: <IconImg status={power_state} />,
            temp: (
              <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>
                {averageTemp >= 80 ? (
                  <div style={{ color: "red" }}>{`${80}℃(超烫)`}</div>
                ) : averageTemp >= 50 ? (
                  <div style={{ color: "#F65121" }}>{`${55}℃(高)`}</div>
                ) : (
                  `${averageTemp}℃`
                )}
              </div>
            ),
            cpu: (
              <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
                <CountUp
                  delay={0.2}
                  start={0}
                  end={Number(cpu)}
                  duration={1.5}
                />
                %
              </div>
            ),
            memory: (
              <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
                <CountUp
                  delay={0.2}
                  start={0}
                  end={Number(mempercent)}
                  duration={1.5}
                />
                %
              </div>
            ),
            disk: (
              <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
                <CountUp
                  delay={0.2}
                  start={0}
                  end={Number(diskpercent)}
                  duration={1.5}
                />
                %
              </div>
            ),
            ip: ip,
            deviceNo: deviceNo
          };
        });
      }
      // }
      var columns = [
        {
          title: "FPGA节点",
          dataIndex: "deviceNoName",
          className: "height",
          align: "center",
          width: 220
        },
        {
          title: "IP",
          dataIndex: "ip",
          className: "height",
          align: "center",
          width: 220
        },
        {
          title: "芯片状态",
          dataIndex: "status",
          className: "height",
          align: "center",
          width: 220
        },
        {
          title: "平均温度",
          dataIndex: "temp",
          align: "center",
          className: "height",
          width: 220
        },
        {
          title: "芯片操作",
          dataIndex: "op",
          className: "height",
          align: "center",
          width: 150,
          render: (text, record) => {
            // var children = record.status.props.children;
            // console.log(record.status.props.status);
            var status = record.status.props.status;
            if (status === false) {
              return (
                <a
                  // style={{
                  //   fontSize: "1rem",
                  //   border: "1px solid black",
                  //   padding: "0 8px 3px 8px",
                  //   borderRadius: "4px",
                  //   color: "black"
                  // }}
                  className={"btn btn-sm green"}
                  style={{
                    // background: "white",
                    border: "1px black solid",
                    color: "black",
                    padding: "0.3rem 0.8rem 0.5rem 0.8rem"
                  }}
                  onClick={e => this.open.call(e, record)}
                >
                  开
                </a>
              );
            } else if (status === true) {
              return (
                <a
                  className={"btn btn-sm red"}
                  // style={{
                  //   fontSize: "1rem",
                  //   border: "1px solid black",
                  //   padding: "0 8px 3px 8px",
                  //   borderRadius: "4px",
                  //   color: "black"
                  // }}
                  style={{
                    // background: "white",
                    border: "1px black solid",
                    color: "black",
                    padding: "0.3rem 0.8rem 0.5rem 0.8rem"
                  }}
                  onClick={e => this.close.call(e, record)}
                >
                  关
                </a>
              );
            }
          }
        }
      ];
    }
    if (this.props.name === "gpu") {
      var gpuColumns = [
        {
          title: "GPU节点",
          dataIndex: "deviceNoName",
          className: "height",
          align: "center",
          width: 220
        },
        {
          title: "IP",
          dataIndex: "ip",
          className: "height",
          align: "center",
          width: 220
        },
        {
          title: "GPU状态",
          dataIndex: "status",
          className: "height",
          align: "center",
          width: 220
        },
        {
          title: "详细操作",
          align: "center",
          className: "height",
          width: 160,
          key: "action",
          render: record => (
            <a
              style={{
                fontSize: "1rem",
                border: "1px solid black",
                padding: "0 8px 3px 8px",
                borderRadius: "4px"
              }}
              onClick={e => this.detailUI.call(e, record, "gpu")}
            >
              详情界面
            </a>
          )
        }
      ];
    }
    if (this.props.name === "fpga") {
      if (this.props.complexTable === true) {
        columns.pop();
        columns.pop();
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
          title: "详细操作",
          align: "center",
          className: "height",
          width: 160,
          key: "action",
          render: record => (
            <a
              style={{
                fontSize: "1rem",
                border: "1px solid black",
                padding: "0 8px 3px 8px",
                borderRadius: "4px"
              }}
              onClick={e => this.detailUI.call(this, record)}
            >
              详情界面
            </a>
          )
        });
      }
    }
    if (this.props.name === "fpga") {
      var newColumns = columns.map((col, index) => ({
        ...col,
        onHeaderCell: column => ({
          width: column.width,
          onResize: this.handleResize(index)
        })
      }));
    }
    if (this.props.name === "gpu") {
      var { gpudata } = this.state;
      var newgpuData = gpudata.map((item, i) => {
        var { deviceNo, GpuStatus, status } = item;
        if (this.GpuStatusArr.length === i) {
          this.GpuStatusArr.push(GpuStatus);
        }

        return {
          key: i,
          deviceNoName: (
            <div style={{ fontSize: "1rem", margin: "0rem" }}>
              {deviceNo.replace("device", "节点")}
            </div>
          ),
          ip: deviceNo === "device-1" ? "192.168.101.220" : "192.168.101.221",
          deviceNo: deviceNo,
          status: <div>{status === "offline" ? "离线" : "在线"}</div>
        };
      });
    }
    if (this.state.gpudata.length === 0) {
      gpuColumns = [];
    }
    if (this.props.name === "gpu") {
      return (
        <Table
          bordered
          components={this.components}
          columns={gpuColumns}
          loading={newgpuData.length === 0 ? true : false}
          dataSource={newgpuData}
          pagination={false}
          size={"middle"}
          locale={{ emptyText: <Empty description={"没有数据"} /> }}
          scroll={{ x: false }}
          style={{ marginBottom: "1rem" }}
        />
      );
    }
    if (this.state.data.length === 0) {
      newColumns = [];
    }

    return (
      <Table
        bordered
        components={this.components}
        loading={data.length === 0 ? true : false}
        columns={newColumns}
        dataSource={data}
        pagination={false}
        locale={{ emptyText: <Empty description={"没有数据"} /> }}
        size={"middle"}
      />
    );
  }
}
export default FuncTable;
