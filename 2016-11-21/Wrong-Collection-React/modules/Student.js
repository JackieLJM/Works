import React, {Component} from "react"

class StudentBanner extends Component {
    render() {
        return (
            <div className="banner-box">
                <div className="bd">
                    <ul>
                        <li style={{background:'white'}}>
                            <div className="m-width">
                                <a href="javascript:void(0);"><img src="./images/images2/student1.jpg"/></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
// 图片轮播功能实现


class StudentInfor extends Component {
    render() {
        return (
            <div className="user">
                <div className="userTop">
                    <div><img src="./images/user_img.png"/></div>
                    <div><b>name</b><p><span>雨欣学校</span><span>高三</span><span>一班</span></p></div>
                </div>
                <div className="userMiddle">
                    <p className="userTip">
                        您的语文老师王晓红又发布了5道新题，快来看看吧！
                        您的语文老师王晓红又发布了5道新题，快来看看吧！
                    </p>
                </div>
                <div className="userBottom">
                    <div><span><img src="./images/grade.png"/></span><a href="#">查看我的成绩</a></div>
                    <div><span><img src="./images/error.png"/></span><a href="mistakeList.html">查看我的错题本</a></div>
                </div>
            </div>
        )
    }
}

class StudentGrade extends Component {
    render() {
        return (
            <div className="classTab">
                <img className="yinzhang" src="./images/yinzhang1.png"/>
                <table className="transcript" cellSpacing="0">
                    <caption>
                        成绩单
                    </caption>
                    <thead>
                    <tr>
                        <td>语文</td>
                        <td>数学</td>
                        <td>英语</td>
                        <td>物理</td>
                        <td>化学</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <img className="number" src="./images/8.png"/>
                            <img className="number" src="./images/2.png"/>
                            <img className="number" src="./images/dian.png"/>
                            <img className="number" src="./images/5.png"/>
                        </td>
                        <td><img className="number" src="./images/5.png"/><img className="number" src="./images/9.png"/>
                        </td>
                        <td><img className="number" src="./images/7.png"/><img className="number" src="./images/2.png"/>
                        </td>
                        <td><img className="number" src="./images/8.png"/><img className="number" src="./images/4.png"/>
                        </td>
                        <td><img className="number" src="./images/9.png"/><img className="number" src="./images/0.png"/>
                        </td>
                    </tr>

                    </tbody>
                </table>
                <p className="numberTip">亲爱的张三同学，你本次考试排名第<span>5</span>名，比上次进步了<span>10</span>名,继续加油哦。</p>
            </div>
        )
    }
}

class Student extends Component {
    render() {
        return (
            <div className="alink">
                <StudentBanner/>
                <div className="content">
                    <StudentInfor/>
                    <StudentGrade/>
                </div>
            </div>
        )
    }
}
export default Student