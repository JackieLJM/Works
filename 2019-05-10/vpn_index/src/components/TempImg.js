import React, { Component } from "react";
import Czero from "../svg/thermometer-0.svg";
import Cone from "../svg/thermometer-1.svg";
import Ctwo from "../svg/thermometer-2.svg";
import Cthree from "../svg/thermometer-3.svg";
import Cfull from "../svg/thermometer-full.svg";

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
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Cfull} />
      );
    } else if (temp >= 70) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Cthree} />
      );
    } else if (temp >= 30) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Ctwo} />
      );
    } else if (temp > 0) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Cone} />
      );
    } else if (temp === 0) {
      return (
        <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Czero} />
      );
    }

    return (
      <img style={{ width: "2rem", verticalAlign: "bottom" }} src={Czero} />
    );
  }
}
