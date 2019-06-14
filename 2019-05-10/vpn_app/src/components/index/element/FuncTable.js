import React, { Component } from "react";
// import { findDOMNode } from 'react-dom';
import { Table, Popconfirm, Icon, Empty, notification } from "antd";
import "./FuncTable.css";
import { Resizable } from "react-resizable";
import CountUp from "react-countup";
import { DetailUI } from "../layout/DetailUI";
import { get } from "../../../api";
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
      {
        disk: { total: 241699667968, free: 234417324032 },
        temp: { chip_temp: [90, 90], cpu_temp: "90" },
        memory: { total: 8141062144, free: 145788928 },
        ip: "192.168.101.237",
        cpu: "0.8953345687%",
        deviceNo: 1,
        power_state: true
      },
      {
        disk: { total: 241699667968, free: 236016472064 },
        temp: { chip_temp: [90, 26], cpu_temp: "43" },
        memory: { total: 8141062144, free: 133865472 },
        ip: "192.168.101.231",
        cpu: "1.01667283139%",
        deviceNo: 2,
        power_state: false
      }
    ],
    gpudata: [
      {
        GpuStatus: [
          { deviceNo: "device-1", graphics: 1, status: 0 },
          { deviceNo: "device-1", graphics: 2, status: 1 },
          { deviceNo: "device-1", graphics: 3, status: 2 },
          { deviceNo: "device-1", graphics: 4, status: 3 }
        ],
        deviceNo: "device-1",
        status: "offline"
      },
      {
        GpuStatus: [
          { deviceNo: "device-2", graphics: 1, status: 1 },
          { deviceNo: "device-2", graphics: 2, status: 2 },
          { deviceNo: "device-2", graphics: 3, status: 1 },
          { deviceNo: "device-2", graphics: 4, status: 1 }
        ],
        deviceNo: "device-2",
        status: "online"
      }
    ]
  };
  components = {
    header: {
      cell: ResizeableTitle
    }
  };
  detailUI = (record, gpu) => {
    // console.log(record.key);
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
    // console.log(e)
    var that = this;
    get(`/monitor/core/power?flag=true&ip=${e.ip}`)
      .then(data => {
        if (data.msg === "操作成功") {
          get("/monitor/node")
            .then(data => {
              if (data.msg === "系统错误") {
                return;
              }
              notification["success"]({ message: "操作成功" });
              that.setState({ data: data.data });
            })
            .catch(err => {
              notification["error"]({ message: "发生未知错误" });
              // console.log(err);
            });
        }
      })
      .catch(err => { });
  };
  close = e => {
    // console.log(e)
    var that = this;
    get(`/monitor/core/power?flag=false&ip=${e.ip}`)
      .then(data => {
        if (data.msg === "操作成功") {
          get("/monitor/node")
            .then(data => {
              if (data.msg === "系统错误") {
                return;
              }
              notification["success"]({ message: "操作成功" });
              that.setState({ data: data.data });
            })
            .catch(err => {
              notification["error"]({ message: "发生未知错误" });
              // console.log(err);
            });
        }
      })
      .catch(err => { });
  };
  over = deviceNo => {
    // console.log(e.currentTarget)
    // console.log(deviceNo)
    // console.log(this.refs[deviceNo])
    this.refs[deviceNo].style.display = "none";
    // console.log(this.refs[`${deviceNo}-precise`])
    this.refs[`${deviceNo}-precise`].style.display = "inline-block";
    // console.log(findDOMNode('1'))
  };
  out = deviceNo => {
    // console.log(deviceNo)
    // console.log(this.refs[deviceNo])
    this.refs[deviceNo].style.display = "inline-block";
    this.refs[`${deviceNo}-precise`].style.display = "none";
    // console.log(e.currentTarget)
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
    get("/monitor/gpu")
      .then(data => {
        if (data.msg === "系统错误") {
          return;
        }
        that.setState({ gpudata: data.data });
      })
      .catch(err => {
        // console.log(err);
      });
    get("/monitor/node")
      .then(data => {
        if (data.msg === "系统错误") {
          return;
        }
        that.setState({ data: data.data });
      })
      .catch(err => {
        // console.log(err);
      });
    if (this.props.name === "gpu") {
      setInterval(function () {
        get("/monitor/gpu")
          .then(data => {
            if (data.msg === "系统错误") {
              return;
            }
            that.setState({ gpudata: data.data });
          })
          .catch(err => {
            // console.log(err);
          });
      }, 5000);
    }
    if (this.props.name === "fpga") {
      setInterval(function () {
        get("/monitor/node")
          .then(data => {
            if (data.msg === "系统错误") {
              return;
            }
            that.setState({ data: data.data });
          })
          .catch(err => {
            // console.log(err);
          });
      }, 5000);
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
  componentWillUpdate() { }
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
          var { temp, cpu, memory, disk, ip, deviceNo, power_state } = item;
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
                  <div style={{ color: "red" }}>{`${averageTemp}℃(超烫)`}</div>
                ) : averageTemp >= 50 ? (
                  <div style={{ color: "#F65121" }}>{`${averageTemp}℃(高)`}</div>
                ) : (
                      `${averageTemp}℃`
                    )}
              </div>
            ),
            cpu: (
              <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
                {Number(cpu) >= 1 ? (
                  <div
                    style={{ display: "inline-block" }}
                    onMouseOver={e => this.over.call(e, `cpu-${deviceNo}`)}
                    onMouseOut={e => this.out.call(e, `cpu-${deviceNo}`)}
                  >
                    <div
                      ref={`cpu-${deviceNo}`}
                      style={{ display: "inline-block" }}
                    >
                      <CountUp
                        delay={0.2}
                        start={0}
                        end={Number(cpu)}
                        duration={1.5}
                      />
                    </div>
                    <div
                      ref={`cpu-${deviceNo}-precise`}
                      style={{ display: "none" }}
                    >
                      {Number(cpu)}
                    </div>
                    %
                  </div>
                ) : (
                    <div style={{ display: "inline-block" }}>
                      0.
                    <CountUp
                        delay={0.2}
                        start={0}
                        end={Number(cpu.toString().substring(2, 4))}
                        duration={1.5}
                      />
                      %
                  </div>
                  )}
              </div>
            ),
            memory: (
              <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
                {Number(mempercent) >= 1 ? (
                  <div
                    onMouseOver={e => this.over.call(e, `mem-${deviceNo}`)}
                    onMouseOut={e => this.out.call(e, `mem-${deviceNo}`)}
                    style={{ display: "inline-block" }}
                  >
                    <div
                      ref={`mem-${deviceNo}`}
                      style={{ display: "inline-block" }}
                    >
                      <CountUp
                        delay={0.2}
                        start={0}
                        end={Number(mempercent)}
                        duration={1.5}
                      />
                    </div>
                    <div
                      ref={`mem-${deviceNo}-precise`}
                      style={{ display: "none" }}
                    >
                      {Number(mempercent)}
                    </div>
                    %
                  </div>
                ) : (
                    <div style={{ display: "inline-block" }}>
                      0.
                    <CountUp
                        delay={0.2}
                        start={0}
                        end={Number(mempercent.toString().substring(2, 4))}
                        duration={1.5}
                      />
                      %
                  </div>
                  )}
              </div>
            ),
            disk: (
              <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
                {Number(diskpercent) >= 1 ? (
                  <div
                    onMouseOver={e => this.over.call(e, `disk-${deviceNo}`)}
                    onMouseOut={e => this.out.call(e, `disk-${deviceNo}`)}
                    style={{ display: "inline-block" }}
                  >
                    <div
                      ref={`disk-${deviceNo}`}
                      style={{ display: "inline-block" }}
                    >
                      <CountUp
                        delay={0.2}
                        start={0}
                        end={Number(diskpercent)}
                        duration={1.5}
                      />
                    </div>
                    <div
                      ref={`disk-${deviceNo}-precise`}
                      style={{ display: "none" }}
                    >
                      {Number(diskpercent)}
                    </div>
                    %
                  </div>
                ) : (
                    <div style={{ display: "inline-block" }}>
                      0.
                    <CountUp
                        delay={0.2}
                        start={0}
                        end={Number(diskpercent.toString().substring(2, 4))}
                        duration={1.5}
                      />
                      %
                  </div>
                  )}
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
            // console.log(record.deviceNoName.props.children)
            if (status === false) {
              return (
                <Popconfirm
                  // style={{ color: 'black', background: 'black' }}
                  overlayStyle={{
                    fontSize: "5rem",
                    border: "5px solid orange",
                    borderRadius: "4px",
                    padding: "0px",
                    marginRight: "2rem"
                  }}
                  icon={
                    <Icon
                      type="info-circle"
                      style={{ fontSize: "3rem", color: "orange" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "2rem",
                        marginLeft: "3rem",
                        marginTop: "3px",
                        marginRight: "1rem"
                      }}
                    >{`确定打开 ${
                      record.deviceNoName.props.children
                      } 此设备吗?`}</div>
                  }
                  onConfirm={e => this.open.call(e, record)}
                  onCancel={e => { }}
                  placement="left"
                  okText="确定"
                  cancelText="取消打开"
                >
                  <a
                    href="#id"
                    className={"btn btn-sm green"}
                    style={{
                      border: "1px black solid",
                      color: "black",
                      padding: "0.3rem 0.8rem 0.5rem 0.8rem"
                    }}
                  // onClick={e => this.open.call(e, record)}
                  >
                    开
                  </a>
                </Popconfirm>
              );
            } else if (status === true) {
              return (
                <Popconfirm
                  // style={{ color: 'black', background: 'black' }}
                  overlayStyle={{
                    fontSize: "5rem",
                    border: "5px solid orange",
                    borderRadius: "4px",
                    padding: "0px",
                    marginRight: "2rem"
                  }}
                  icon={
                    <Icon
                      type="info-circle"
                      style={{ fontSize: "3rem", color: "orange" }}
                    />
                  }
                  title={
                    <div
                      style={{
                        fontSize: "2rem",
                        marginLeft: "3rem",
                        marginTop: "3px",
                        marginRight: "1rem"
                      }}
                    >{`确定关闭 ${
                      record.deviceNoName.props.children
                      } 此设备吗?`}</div>
                  }
                  onConfirm={e => this.close.call(e, record)}
                  onCancel={e => { }}
                  placement="left"
                  okText="确定"
                  cancelText="取消关闭"
                >
                  <a
                    href="#id"
                    className={"btn btn-sm red"}
                    style={{
                      border: "1px black solid",
                      color: "black",
                      padding: "0.3rem 0.8rem 0.5rem 0.8rem"
                    }}
                  // onClick={e => this.close.call(e, record)}
                  >
                    关
                  </a>
                </Popconfirm>
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
              href="#id"
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
              href="#id"
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
        var match = deviceNo.match(/([\S]+)-([\S]+)/);
        var ip = match[2];
        return {
          key: i,
          deviceNoName: (
            <div style={{ fontSize: "1rem", margin: "0rem" }}>
              {deviceNo.replace("device", "节点")}
            </div>
          ),
          ip: ip,
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
