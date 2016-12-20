import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory,IndexRoute} from 'react-router'
// import 'css/book.css'
// import 'css/bookcommon.css'
import Student from './modules/Student'
import Statement from './modules/Statement'
import MistakeList from './modules/MistakeList'
import routeLink from './routeLink'
class App extends Component {
    render() {
        return (
            <div>
                <div className="wrap">
                    <div className="logo">
                        <div className="logoimg"><img src="./images/logo.png"/></div>
                    </div>
                    {/*这上面是公司LOGO*/}
                    <div className="wNav">
                        <div className="nav">
                            <Router className="navleft" history={browserHistory}>
                                <Route path="/" component={routeLink}>
                                    <IndexRoute component={Student}>首页</IndexRoute>
                                    <Route path="/Statement" component={Statement}>统计报表</Route>
                                    <Route path="/MistakeList" component={MistakeList}>我的错题本</Route>
                                </Route>
                            </Router>
                            {/*这上面是导航切换*/}
                        </div>
                    </div>
                </div>
                <div className="footer">五岳鑫科技股份有限公司</div>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>
    , document.getElementById("root"))

