import React, {Component} from 'react'

class User extends Component {
    render() {
        return (
            <div className="navRight">
                <img src="./images/user_img2.png"/>
                <span>个人中心 </span>
                <img src="./images/down.png"/>
                <ul className="unav">
                    <li><a href="#">个人资料</a></li>
                    <li><a href="#">修改密码</a></li>
                    <li><a href="#">安全退出</a></li>
                </ul>
            </div>
        )
    }
}

export default User
