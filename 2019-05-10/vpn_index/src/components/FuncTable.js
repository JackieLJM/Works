import React, { Component } from "react";
import { Table, Button, Icon, Modal, Card } from "antd";
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
      {
        disk: { total: 241699667968, free: 234417324032 },
        temp: { chip_temp: [23, 23], cpu_temp: "26" },
        memory: { total: 8141062144, free: 145788928 },
        ip: "192.168.101.237",
        cpu: "17.8953345687%",
        deviceNo: 1,
        power_state: true
      },
      {
        disk: { total: 241699667968, free: 236016472064 },
        temp: { chip_temp: [30, 26], cpu_temp: "43" },
        memory: { total: 8141062144, free: 133865472 },
        ip: "192.168.101.231",
        cpu: "1.01667283139%",
        deviceNo: 2,
        power_state: false
      }
    ]
  };

  components = {
    header: {
      cell: ResizeableTitle
    }
  };
  detailUI = e => {
    // console.log(e.deviceNo);
    // e.currentTarget.parentNode.parentNode.children[0].children[1].innerText
    // console.log(this);
    DetailUI(e.deviceNo, e.ip);
  };
  open = e => {
    var that = this;
    get(`/monitor/core/power?flag=true&ip=${e.ip}`)
      .then(data => {
        if (data.msg === "操作成功") {
          get("/monitor/node")
            .then(data => {
              that.setState({ data: data.data });
            })
            .catch(err => {
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
              that.setState({ data: data.data });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => console.log(err));
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.fpgadata });
  }
  componentDidMount() {
    get("/monitor/node")
      .then(data => {
        this.setState({ data: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  // data = [
  //   {
  //     key: 0,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="sync"
  //           spin
  //           style={{
  //             fontSize: "1.3rem",
  //             verticalAlign: "middle"
  //           }}
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           启动中
  //         </div>
  //       </div>
  //     ),
  //     temp: (
  //       <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>
  //         {50 >= 80 ? (
  //           <div style={{ color: "red" }}>{`${80}℃(超烫)`}</div>
  //         ) : 55 >= 50 ? (
  //           <div style={{ color: "#F65121" }}>{`${55}℃(高)`}</div>
  //         ) : (
  //           `${55}℃`
  //         )}
  //       </div>
  //     ),
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 1,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="poweroff"
  //           style={{
  //             color: "red",
  //             fontSize: "1.3rem",
  //             verticalAlign: "middle"
  //           }}
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           已关闭
  //         </div>
  //       </div>
  //     ),
  //     temp: (
  //       <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>
  //         {80 >= 80 ? (
  //           <div style={{ color: "red" }}>{`${80}℃(超烫)`}</div>
  //         ) : 55 >= 50 ? (
  //           <div style={{ color: "#F65121" }}>{`${55}℃(高)`}</div>
  //         ) : (
  //           `${55}℃`
  //         )}
  //       </div>
  //     ),
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 2,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div style={{ marginLeft: "1.8rem" }}>
  //         <Icon
  //           type="bulb"
  //           style={{
  //             color: "#FFD924",
  //             fontSize: "1.5rem",
  //             verticalAlign: "top"
  //           }}
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem",
  //             marginLeft: "-0.1rem"
  //           }}
  //         >
  //           故障或异常
  //         </div>
  //       </div>
  //     ),
  //     temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 3,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="check-circle"
  //           style={{ fontSize: "1.3rem", verticalAlign: "middle" }}
  //           theme="twoTone"
  //           twoToneColor="#52c41a"
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           已启动
  //         </div>
  //       </div>
  //     ),
  //     temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 4,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="check-circle"
  //           style={{
  //             fontSize: "1.3rem",
  //             verticalAlign: "middle"
  //           }}
  //           theme="twoTone"
  //           twoToneColor="#52c41a"
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           已启动
  //         </div>
  //       </div>
  //     ),
  //     temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 5,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="sync"
  //           spin
  //           style={{
  //             fontSize: "1.3rem",
  //             verticalAlign: "middle"
  //           }}
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           启动中
  //         </div>
  //       </div>
  //     ),
  //     temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 6,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="sync"
  //           spin
  //           style={{
  //             fontSize: "1.3rem",
  //             verticalAlign: "middle"
  //           }}
  //         />
  //         &nbsp;&nbsp;
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           启动中
  //         </div>
  //       </div>
  //     ),
  //     temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   },
  //   {
  //     key: 7,
  //     deviceNoName: (
  //       <div style={{ fontSize: "1rem", margin: "0rem" }}>{"节点"}</div>
  //     ),
  //     status: (
  //       <div>
  //         <Icon
  //           type="sync"
  //           spin
  //           style={{
  //             fontSize: "1.3rem",
  //             verticalAlign: "middle"
  //           }}
  //         />
  //         &nbsp;{" "}
  //         <div
  //           style={{
  //             display: "inline-block",
  //             verticalAlign: "middle",
  //             fontSize: "1rem"
  //           }}
  //         >
  //           启动中
  //         </div>
  //       </div>
  //     ),
  //     temp: <div style={{ fontSize: "1.2rem", margin: "-1rem" }}>{`44℃`}</div>,
  //     cpu: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     memory: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     ),
  //     disk: (
  //       <div style={{ fontSize: "1.3rem", margin: "-1rem" }}>
  //         <CountUp delay={0.2} start={0} end={12} duration={1.5} />%
  //       </div>
  //     )
  //   }
  // ];

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
    var { data } = this.state;
    // if (this.props.name !== "gpu") {
    data = data.map((item, i) => {
      var { temp, cpu, memory, disk, ip, cpu, deviceNo, power_state } = item;
      var { chip_temp, cpu_temp } = temp;
      var [chip_temp_1, chip_temp_2] = chip_temp;
      cpu = Number(cpu.slice(0, -2)).toFixed(2);

      var mempercent = (
        ((memory.total - memory.free) / memory.total) *
        100
      ).toFixed(2);

      var diskpercent = (((disk.total - disk.free) / disk.total) * 100).toFixed(
        2
      );
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
            <CountUp delay={0.2} start={0} end={Number(cpu)} duration={1.5} />%
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
                style={{
                  fontSize: "1rem",
                  border: "1px solid black",
                  padding: "0 8px 3px 8px",
                  borderRadius: "4px",
                  color: "black"
                }}
                onClick={e => this.open.call(e, record)}
              >
                开
              </a>
            );
          } else if (status === true) {
            return (
              <a
                style={{
                  fontSize: "1rem",
                  border: "1px solid black",
                  padding: "0 8px 3px 8px",
                  borderRadius: "4px",
                  color: "black"
                }}
                onClick={e => this.close.call(e, record)}
              >
                关
              </a>
            );
          }
          // if (children[children.length - 1] !== undefined) {
          //   if (children[children.length - 1].props.children === "已关闭") {
          //     return (
          //       <a
          //         style={{
          //           fontSize: "1rem",
          //           border: "1px solid black",
          //           padding: "0 8px 3px 8px",
          //           borderRadius: "4px",
          //           color: "black"
          //         }}
          //         onClick={e => this.open.call(e, record)}
          //       >
          //         开
          //       </a>
          //     );
          //   } else if (
          //     children[children.length - 1].props.children === "故障或异常"
          //   ) {
          //     return (
          //       <a
          //         style={{
          //           fontSize: "1rem",
          //           padding: "0 8px 3px 8px",
          //           borderRadius: "4px",
          //           color: "black"
          //         }}
          //       >
          //         提示：请查看设备情况
          //       </a>
          //     );
          //   }
          // }
          // return (
          //   <a
          //     style={{
          //       fontSize: "1rem",
          //       border: "1px solid black",
          //       padding: "0 8px 3px 8px",
          //       borderRadius: "4px",
          //       color: "black"
          //     }}
          //     onClick={e => this.close.call(e, record)}
          //   >
          //     关
          //   </a>
          // );
        }
      }
    ];
    if (this.props.name === "gpu") {
      columns = [
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
            var status = record.status.props.status;
            if (status === false) {
              return (
                <a
                  style={{
                    fontSize: "1rem",
                    border: "1px solid black",
                    padding: "0 8px 3px 8px",
                    borderRadius: "4px",
                    color: "black"
                  }}
                  onClick={e => this.open.call(e, record)}
                >
                  开
                </a>
              );
            } else if (status === true) {
              return (
                <a
                  style={{
                    fontSize: "1rem",
                    border: "1px solid black",
                    padding: "0 8px 3px 8px",
                    borderRadius: "4px",
                    color: "black"
                  }}
                  onClick={e => this.close.call(e, record)}
                >
                  关
                </a>
              );
            }
            // var children = record.status.props.children;
            // if (children[children.length - 1] !== undefined) {
            //   if (children[children.length - 1].props.children === "已关闭") {
            //     return (
            //       <a
            //         style={{
            //           fontSize: "1rem",
            //           border: "1px solid black",
            //           padding: "0 8px 3px 8px",
            //           borderRadius: "4px",
            //           color: "black"
            //         }}
            //         onClick={e => this.open.call(e, record)}
            //       >
            //         开
            //       </a>
            //     );
            //   } else if (
            //     children[children.length - 1].props.children === "故障或异常"
            //   ) {
            //     return (
            //       <a
            //         style={{
            //           fontSize: "1rem",
            //           padding: "0 8px 3px 8px",
            //           borderRadius: "4px",
            //           color: "black"
            //         }}
            //       >
            //         提示：请查看设备情况
            //       </a>
            //     );
            //   }
            // }
            // return (
            //   <a
            //     style={{
            //       fontSize: "1rem",
            //       border: "1px solid black",
            //       padding: "0 8px 3px 8px",
            //       borderRadius: "4px",
            //       color: "black"
            //     }}
            //     onClick={e => this.close.call(e, record)}
            //   >
            //     关
            //   </a>
            // );
          }
        }
      ];
    }

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
            onClick={e => this.detailUI.call(e, record)}
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

    if (this.props.name === "gpu") {
      return (
        <Table
          bordered
          components={this.components}
          // columns={newColumns}
          dataSource={[]}
          pagination={false}
          size={"middle"}
          scroll={{ x: false }}
        />
      );
    }
    return (
      <Table
        bordered
        components={this.components}
        columns={newColumns}
        dataSource={data}
        pagination={false}
        size={"middle"}
      />
    );
  }
}
export default FuncTable;
