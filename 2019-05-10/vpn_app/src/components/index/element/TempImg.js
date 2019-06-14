import React, { Component } from "react";
import Czero from "../../../svg/thermometer/thermometer-0.svg";
import Cone from "../../../svg/thermometer/thermometer-1.svg";
import Ctwo from "../../../svg/thermometer/thermometer-2.svg";
import Cthree from "../../../svg/thermometer/thermometer-3.svg";
import Cfull from "../../../svg/thermometer/thermometer-full.svg";

export default class TempImg extends Component {
  state = { temp: 0 };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ temp: nextProps.temp });
  }
  render() {
    var { temp } = this.state;
    // console.log(temp);
    // console.log(this.props.temp);

    if (temp === 100) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Cfull} alt=""/>
      );
    } else if (temp >= 70) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Cthree} alt=""/>
      );
    } else if (temp >= 30) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Ctwo} alt=""/>
      );
    } else if (temp > 0) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Cone} alt=""/>
      );
    } else if (temp === 0) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Czero} alt=""/>
      );
    }

    return (
      <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Czero} alt=""/>
    );
  }
}
