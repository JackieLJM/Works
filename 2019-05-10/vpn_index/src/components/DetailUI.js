import React, { Component } from "react";
import { Modal, Card, Statistic, Icon } from "antd";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import Czero from "../svg/thermometer-0.svg";
import Cone from "../svg/thermometer-1.svg";
import Ctwo from "../svg/thermometer-2.svg";
import Cthree from "../svg/thermometer-3.svg";
import Cfull from "../svg/thermometer-full.svg";
export const DetailUI = () => {
  return Modal.info({
    title: "节点",
    content: (
      <div>
        <Card
          title={<div style={{ marginTop: "-0.3rem" }}>使用详细情况</div>}
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
          <div style={{ display: "flex" }}>
            <ReactMinimalPieChart
              style={{ width: "6rem", height: "6rem", flex: "1" }}
              data={[
                {
                  value: 82,
                  color: "#E38627"
                }
              ]}
              totalValue={100}
              lineWidth={20}
              label
              labelStyle={{
                fontSize: "25px",
                fontFamily: "sans-serif"
              }}
              labelPosition={0}
            />
            <ReactMinimalPieChart
              style={{ width: "6rem", height: "6rem", flex: "1" }}
              data={[
                {
                  value: 82,
                  color: "#E38627"
                }
              ]}
              totalValue={100}
              lineWidth={20}
              label
              labelStyle={{
                fontSize: "25px",
                fontFamily: "sans-serif"
              }}
              labelPosition={0}
            />
            <ReactMinimalPieChart
              style={{ width: "6rem", height: "6rem", flex: "1" }}
              data={[
                {
                  value: 82,
                  color: "#E38627"
                }
              ]}
              totalValue={100}
              lineWidth={20}
              label
              labelStyle={{
                fontSize: "25px",
                fontFamily: "sans-serif"
              }}
              labelPosition={0}
            />
          </div>
          <div style={{ display: "flex", fontSize: "0.9rem" }}>
            <div
              style={{
                width: "6rem",
                marginLeft: "4rem",
                marginTop: "1rem",
                flex: 1,
                display: "flex",
                flexDirection: "column"
                // fontSize: "0.8rem"
              }}
            >
              <div style={{ flex: 1 }}>
                <span>CPU使用率：</span>
                <span style={{ marginLeft: "0.9rem", fontWeight: "bold" }}>
                  82%
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <span>CPU当前频率：</span>
                <span style={{ fontWeight: "bold" }}>3Ghz</span>
              </div>
              <div style={{ flex: 1 }}>
                <span>CPU最大频率：</span>
                <span style={{ fontWeight: "bold" }}>4Ghz</span>
              </div>
            </div>
            <div
              style={{
                width: "6rem",
                marginLeft: "4rem",
                marginTop: "1rem",
                flex: 1,
                display: "flex",
                flexDirection: "column"
                // fontSize: "0.8rem"
              }}
            >
              <div style={{ flex: 1 }}>
                <span>磁盘使用率：</span>
                <span style={{ fontWeight: "bold" }}>82%</span>
              </div>
              <div style={{ flex: 1 }}>
                <span>磁盘已使用：</span>
                <span style={{ fontWeight: "bold" }}>12GB</span>
              </div>
              <div style={{ flex: 1 }}>
                <span>磁盘总大小：</span>
                <span style={{ fontWeight: "bold" }}>100GB</span>
              </div>
            </div>
            <div
              style={{
                width: "6rem",
                marginLeft: "4rem",
                marginTop: "1rem",
                flex: 1,
                display: "flex",
                flexDirection: "column"
                // fontSize: "0.8rem"
              }}
            >
              <div style={{ flex: 1 }}>
                <span>内存使用率：</span>
                <span style={{ fontWeight: "bold" }}>82%</span>
              </div>
              <div style={{ flex: 1 }}>
                <span>内存已使用：</span>
                <span style={{ fontWeight: "bold" }}>12GB</span>
              </div>
              <div style={{ flex: 1 }}>
                <span>内存总大小：</span>
                <span style={{ fontWeight: "bold" }}>128GB</span>
              </div>
            </div>
          </div>
        </Card>
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
          <Statistic
            title="区域一温度"
            value={0}
            prefix={<Icon component={Czero} />}
            suffix="℃"
          />
          <Statistic
            title="区域二温度"
            value={12}
            prefix={<Icon component={Cone} style={{ color: "green" }} />}
            suffix="℃"
          />
          <Statistic
            title="CPU的温度"
            value={100}
            prefix={<Icon component={Cfull} />}
            suffix="℃"
          />
        </Card>
        <Card
          title={<div style={{ marginTop: "-0.3rem" }}>风扇具体情况</div>}
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
          some messages...some messages...
        </Card>
        <Card
          title={<div style={{ marginTop: "-0.3rem" }}>各个芯片情况</div>}
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
          some messages...some messages...
        </Card>
      </div>
    ),
    width: "80%",
    onOk() {}
  });
};
