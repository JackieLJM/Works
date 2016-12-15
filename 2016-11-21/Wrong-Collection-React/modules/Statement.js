import React, {Component} from "react"
import {
    AreaChart,
    LineChart,
    BarChart,
    defs,
    linearGradient,
    stop,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    Line,
    Bar
} from 'recharts'

class StatementCondition extends Component {
    render() {
        const data = this.props.data;
        return (
            <div id="count_class">
                <div className="chead">
                    <div className="nav_top">
                        <img src="../images/class_img1.png"/><span>班级</span>
                    </div>
                </div>
                <ul className="class_nav">
                    <li className="hover_back">
                        <a href="#" className="hover_a">语文</a>
                        <img src="../images/sign_img6.png"/>
                    </li>
                    <li>
                        <a href="#">数学数学</a>
                        <img src="../images/sign_img6.png"/>
                    </li>
                    <li>
                        <a href="#">语文</a>
                        <img src="../images/sign_img6.png"/>
                    </li>
                    <li>
                        <a href="#">数学</a>
                        <img src="../images/sign_img6.png"/>
                    </li>
                    <li>
                        <a href="#" id="clickmore">更多</a>
                        <img src="../images/down.png"/>
                        <dl className="more">
                            <dt>高一</dt>
                            <dd><a href="#">高一考试1</a></dd>
                            <dd><a href="#">高一考试2</a></dd>
                            <dd><a href="#">高一考试3</a></dd>
                            <dt>高二</dt>
                            <dd><a href="#">高二考试1</a></dd>
                            <dd><a href="#">高二考试2</a></dd>
                            <dd><a href="#">高二考试3</a></dd>
                            <dt>高三</dt>
                            <dd><a href="#">高三考试1</a></dd>
                            <dd><a href="#">高三考试2</a></dd>
                            <dd><a href="#">高三考试3</a></dd>
                        </dl>
                    </li>
                </ul>
            </div>
        )
    }
}
class StatementContentArea extends Component {
    render() {
        const data = this.props.data;
        return (
            <AreaChart width={730} height={250} data={data}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name"/>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)"/>
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)"/>
            </AreaChart>
        )
    }
}

class StatementContentLine extends Component {
    render() {
        const data = this.props.data;
        return (
            <LineChart width={730} height={250} data={data}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8"/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
            </LineChart>        )
    }
}

class StatementContentBar extends Component {
    render() {
        const data = this.props.data;
        return (
            <BarChart width={300} height={200} data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="pv" fill="#8884d8"/>
                <Bar dataKey="uv" fill="#82ca9d"/>
            </BarChart>
        )
    }
}

class Statement extends Component {
    static defaultProps() {
        return {
            data: [
                {name: 'PageA', uv: '4000', pv: '3000'},
                {name: 'PageB', uv: '4000', pv: '3000'},
                {name: 'PageC', uv: '4000', pv: '3000'},
            ]
        }
    }

    render() {
        return (
            <div className="content">
                <StatementCondition/>
                <StatementContentArea/>
                <StatementContentLine/>
                <StatementContentBar/>
            </div>
        )
    }
}

export default Statement