import React, {Component} from 'react'
import {Link} from 'react-router'
import User from './User'

class routeLink extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/Statement">统计报表</Link></li>
                    <li><Link to="/MistakeList">我的错题本</Link></li>
                </ul>
                <User/>
                {this.props.children}
            </div>
        )
    }
}

export default routeLink