import React, { Component } from "react";
import { Modal } from "antd";
import Temp from "./Temp";
import Use from "./Use";
import Fan from "./Fan";
import Chip from "./Chip";

// import ReactSVG from "react-svg";
export const DetailUI = (deviceNo, ip) => {
  return Modal.info({
    title: "节点",
    content: (
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
    onOk() {}
  });
};
