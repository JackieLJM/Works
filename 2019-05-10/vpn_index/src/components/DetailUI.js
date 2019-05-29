import React from "react";
import { Modal, Card } from "antd";
import Temp from "./Temp";
import Use from "./Use";
import Fan from "./Fan";
import Chip from "./Chip";
import gdcard from "../svg/gdcard.png";

// import ReactSVG from "react-svg";
export const DetailUI = (deviceNo, ip, gpu, GpuStatus, fanstatus, key) => {
  // console.log(deviceNo, ip, gpu, GpuStatus, fanstatus.props.children, key);
  return Modal.info({
    title: "节点",
    content:
      gpu === "gpu" ? (
        <div>
          <Fan
            deviceNo={deviceNo}
            ip={ip}
            fanstatus={fanstatus.props.children}
          />
          <Card
            title={<div style={{ marginTop: "-0.3rem" }}>该主机下显卡情况</div>}
            headStyle={{
              paddingTop: "-1rem",
              // fontSize: "1rem",
              height: "1px",
              borderRadius: "0.5rem 0.5rem 0 0",
              color: "white",
              background: "#2C84D0"
            }}
            bodyStyle={{
              display: "flex"
            }}
            style={{ marginTop: "1rem", borderRadius: "0.5rem" }}
          >
            {GpuStatus[key].map(item => {
              return (
                <div style={{ flex: "1" }}>
                  <img src={gdcard} />
                  <div style={{ marginLeft: "2rem" }}>
                    {`显卡${item.graphics}`}
                  </div>
                  <div style={{ marginLeft: "2rem" }}>
                    {item.status === 0
                      ? "该显卡未识别"
                      : item.status === 1
                        ? "等待加载"
                        : item.status === 2
                          ? "正在运行"
                          : "任务结束"}
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      ) : (
          <div>
            <Use deviceNo={deviceNo} ip={ip} />
            <Temp deviceNo={deviceNo} ip={ip} />
            <Fan deviceNo={deviceNo} ip={ip} />
            <Chip deviceNo={deviceNo} ip={ip} />
          </div>
        ),
    width: "80%",
    maskClosable: "true",
    okText: "收起",
    onOk() { }
  });
};
