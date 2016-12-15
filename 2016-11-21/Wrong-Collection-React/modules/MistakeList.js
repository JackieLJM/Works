import React, {Component} from 'react'
import {PieChart,Pie,Legend} from 'recharts'
class MistakeListHeader extends Component {
    render() {
        return (
            <div className="mTop">
                <div className="topLeft">
                    <select>
                        <option>选择科目</option>
                        <option>数学</option>
                        <option>语文</option>
                        <option>英语</option>
                    </select>
                    <select>
                        <option>选择考试</option>
                        <option>期中</option>
                        <option>模拟</option>
                        <option>期末</option>
                    </select>
                    <div><img src="images/searchbtn.png"/></div>
                </div>
                <div className="topRight">共<span>38</span>道题</div>
            </div>
        )
    }
}
class MistakeListContentTemplate extends Component {
    render() {
        return (
            <div>
                <div className="mTopic">
                    {/*<!--题-->*/}
                    <div className="subject1">
                        <div className="subject1_top">
                            <span>1</span>
                            <div><img src="images/mimg1.png"/></div>
                        </div>
                        <div className="subject1_cTop">
                            <div className="cTop1"><span>收起解析</span><img src="images/img_down2.png"/></div>
                            <div className="cTop2">
                                <span><img src="images/collect.png"/><a href="#">收藏本题</a></span>
                                <span><img src="images/del.png"/><a href="#">删除本题</a></span>
                            </div>
                        </div>
                        {/*<!--解析隐藏-->*/}
                        <div className="subject1_content">
                            {/*<!--左侧-->*/}
                            <div className="cLeft">
                                <div><p><span>我的答案</span></p><b><h2 className="fales_an">A</h2></b></div>
                                <div><p><span>标准答案</span></p><b><h2 className="right_an">B</h2></b></div>
                            </div>
                            {/*<!--右侧-->*/}
                            <div className="cRight">
                                <div>
                                    <PieChart width={730} height={250}>
                                        <Pie data={data01} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                                        <Pie data={data02} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                                    </PieChart>
                                </div>
                                <p>本题共有<span>20</span>人答对,<span>30</span>人答错</p>
                                <span>知识考点:</span>
                                <ol type="1" start="1">

                                    <li>xxxxxx</li>
                                    <li>xxxxxx</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class MistakeList extends Component {
    render() {
        return (
            <div className="content">
                <MistakeListHeader/>
                <MistakeListContentTemplate/>
            </div>
        )
    }
}

export default MistakeList